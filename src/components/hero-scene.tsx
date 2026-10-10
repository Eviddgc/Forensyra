"use client";

import { useEffect, useRef } from "react";

/**
 * True WebGL "evidence core" hero, built directly on three.js (loaded lazily on
 * the client so it never touches the server bundle). A glowing point-cloud
 * sphere wrapped in a wireframe shell, orbiting rings and satellites, a pulsing
 * core, and a starfield — all reacting to the pointer.
 *
 * If WebGL is unavailable the component quietly renders nothing; the CSS grid,
 * radial glow and 3D emblem card still carry the hero.
 */
export function HeroScene({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
      } catch {
        return;
      }

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
      camera.position.set(0, 0, 7.2);

      const group = new THREE.Group();
      scene.add(group);

      const cyan = new THREE.Color("#22d3ee");
      const indigo = new THREE.Color("#818cf8");

      // Soft round sprite for glowing points.
      const dot = (() => {
        const size = 64;
        const c = document.createElement("canvas");
        c.width = size;
        c.height = size;
        const ctx = c.getContext("2d");
        if (ctx) {
          const g = ctx.createRadialGradient(
            size / 2,
            size / 2,
            0,
            size / 2,
            size / 2,
            size / 2,
          );
          g.addColorStop(0, "rgba(255,255,255,1)");
          g.addColorStop(0.28, "rgba(200,250,255,0.85)");
          g.addColorStop(1, "rgba(34,211,238,0)");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, size, size);
        }
        const texture = new THREE.CanvasTexture(c);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
      })();

      // 1 — point-cloud sphere (Fibonacci distribution).
      const count = 1700;
      const radius = 2.45;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const ring = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = i * 2.399963229728653;
        positions[i * 3] = Math.cos(theta) * ring * radius;
        positions[i * 3 + 1] = y * radius;
        positions[i * 3 + 2] = Math.sin(theta) * ring * radius;
      }
      const cloudGeo = new THREE.BufferGeometry();
      cloudGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const cloudMat = new THREE.PointsMaterial({
        color: cyan,
        size: 0.085,
        map: dot,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const cloud = new THREE.Points(cloudGeo, cloudMat);
      group.add(cloud);

      // 2 — wireframe shell.
      const shellGeo = new THREE.IcosahedronGeometry(2.62, 2);
      const shellMat = new THREE.MeshBasicMaterial({
        color: cyan,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });
      const shell = new THREE.Mesh(shellGeo, shellMat);
      group.add(shell);

      // 3 — pulsing core + halo.
      const coreGeo = new THREE.SphereGeometry(1.02, 32, 32);
      const coreMat = new THREE.MeshBasicMaterial({
        color: cyan,
        transparent: true,
        opacity: 0.14,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      const haloGeo = new THREE.SphereGeometry(1.45, 32, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: cyan,
        transparent: true,
        opacity: 0.06,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.Mesh(haloGeo, haloMat));

      // 4 — orbit rings.
      const rings: import("three").Mesh[] = [];
      const ringSpecs = [
        { r: 3.15, tube: 0.006, tilt: 0.5, color: indigo, opacity: 0.55, spin: 0.16 },
        { r: 3.55, tube: 0.004, tilt: -0.7, color: cyan, opacity: 0.4, spin: -0.11 },
        { r: 3.95, tube: 0.003, tilt: 0.28, color: indigo, opacity: 0.28, spin: 0.08 },
      ];
      for (const spec of ringSpecs) {
        const g = new THREE.TorusGeometry(spec.r, spec.tube, 8, 128);
        const m = new THREE.MeshBasicMaterial({
          color: spec.color,
          transparent: true,
          opacity: spec.opacity,
        });
        const ring = new THREE.Mesh(g, m);
        ring.rotation.x = Math.PI / 2 + spec.tilt;
        ring.rotation.y = spec.r;
        ring.userData.spin = spec.spin;
        rings.push(ring);
        group.add(ring);
      }

      // 5 — orbiting satellites.
      const sats: import("three").Mesh[] = [];
      const satGeo = new THREE.SphereGeometry(0.05, 12, 12);
      for (let i = 0; i < 6; i++) {
        const m = new THREE.MeshBasicMaterial({
          color: i % 2 ? indigo : cyan,
        });
        const s = new THREE.Mesh(satGeo, m);
        s.userData.a = (i / 6) * Math.PI * 2;
        s.userData.r = 3 + (i % 3) * 0.36;
        s.userData.y = (i - 2.5) * 0.36;
        s.userData.speed = 0.24 + (i % 3) * 0.12;
        sats.push(s);
        group.add(s);
      }

      // 6 — background starfield.
      const starCount = 700;
      const starPos = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        const r = 9 + Math.random() * 14;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        starPos[i * 3 + 1] = r * Math.cos(phi);
        starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({
        color: cyan,
        size: 0.06,
        map: dot,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      // Pointer parallax.
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (event: PointerEvent) => {
        pointer.tx = (event.clientX / window.innerWidth - 0.5) * 2;
        pointer.ty = (event.clientY / window.innerHeight - 0.5) * 2;
      };
      if (!reduce) {
        window.addEventListener("pointermove", onMove, { passive: true });
      }

      const resize = () => {
        const rect = mount.getBoundingClientRect();
        const w = Math.max(1, rect.width);
        const h = Math.max(1, rect.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);

      const canvas = renderer.domElement;
      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      mount.appendChild(canvas);

      let raf = 0;
      let t = 0;
      let last = performance.now();

      const frame = () => {
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        t += dt;
        pointer.x += (pointer.tx - pointer.x) * 0.05;
        pointer.y += (pointer.ty - pointer.y) * 0.05;

        group.rotation.y = t * 0.18 + pointer.x * 0.55;
        group.rotation.x = Math.sin(t * 0.25) * 0.08 + pointer.y * 0.3;

        shell.rotation.y -= dt * 0.06;
        shell.rotation.x += dt * 0.02;
        core.rotation.y += dt * 0.12;
        stars.rotation.y += dt * 0.01;

        shellMat.opacity = 0.1 + Math.sin(t * 1.4) * 0.04;
        coreMat.opacity = 0.1 + Math.sin(t * 1.8) * 0.06;
        haloMat.opacity = 0.05 + Math.sin(t * 1.8) * 0.03;

        for (const ring of rings) {
          ring.rotation.z += (ring.userData.spin as number) * dt;
        }
        for (const sat of sats) {
          const a = (sat.userData.a as number) + dt * (sat.userData.speed as number);
          sat.userData.a = a;
          sat.position.set(
            Math.cos(a) * (sat.userData.r as number),
            (sat.userData.y as number) + Math.sin(t + a) * 0.16,
            Math.sin(a) * (sat.userData.r as number),
          );
        }

        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      };

      if (reduce) {
        group.rotation.set(-0.15, 0.4, 0);
        renderer.render(scene, camera);
      } else {
        frame();
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        resizeObserver.disconnect();
        if (canvas.parentNode === mount) mount.removeChild(canvas);

        cloudGeo.dispose();
        cloudMat.dispose();
        shellGeo.dispose();
        shellMat.dispose();
        coreGeo.dispose();
        coreMat.dispose();
        haloGeo.dispose();
        haloMat.dispose();
        satGeo.dispose();
        starGeo.dispose();
        starMat.dispose();
        dot.dispose();
        for (const ring of rings) {
          ring.geometry.dispose();
          (ring.material as import("three").Material).dispose();
        }
        for (const sat of sats) {
          (sat.material as import("three").Material).dispose();
        }
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className={className} />;
}
