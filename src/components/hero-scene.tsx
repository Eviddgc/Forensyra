"use client";

import { useEffect, useRef } from "react";

type RGB = { r: number; g: number; b: number };

/** Gold stops mapped across the sphere's latitude (y from -1 to 1). */
const STOPS: Array<[number, RGB]> = [
  [-1, { r: 0.722, g: 0.537, b: 0.184 }], // deep gold
  [-0.5, { r: 0.788, g: 0.604, b: 0.278 }], // antique gold
  [0, { r: 0.902, g: 0.757, b: 0.478 }], // champagne
  [0.5, { r: 0.961, g: 0.922, b: 0.867 }], // ivory
  [1, { r: 0.976, g: 0.894, b: 0.69 }], // light champagne
];

function pastelAt(y: number): RGB {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [y0, c0] = STOPS[i];
    const [y1, c1] = STOPS[i + 1];
    if (y >= y0 && y <= y1) {
      const t = (y - y0) / (y1 - y0);
      return {
        r: c0.r + (c1.r - c0.r) * t,
        g: c0.g + (c1.g - c0.g) * t,
        b: c0.b + (c1.b - c0.b) * t,
      };
    }
  }
  return STOPS[STOPS.length - 1][1];
}

/**
 * True WebGL "evidence core" hero, built directly on three.js (loaded lazily on
 * the client so it never touches the server bundle). A pastel rainbow point-cloud
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
      const { RoomEnvironment } = await import(
        "three/examples/jsm/environments/RoomEnvironment.js"
      );

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

      // Image-based lighting so the gold reads as real metal.
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envMap;

      const key = new THREE.DirectionalLight(0xfff2d0, 1.6);
      key.position.set(5, 6, 6);
      scene.add(key);
      const rim = new THREE.PointLight(0xc99a47, 1.1, 30);
      rim.position.set(-5, -3, 5);
      scene.add(rim);

      const group = new THREE.Group();
      scene.add(group);

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
          g.addColorStop(0.3, "rgba(255,255,255,0.85)");
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, size, size);
        }
        const texture = new THREE.CanvasTexture(c);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
      })();

      // 1 — pastel rainbow point-cloud sphere (Fibonacci distribution).
      const count = 1700;
      const radius = 2.45;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const ring = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = i * 2.399963229728653;
        positions[i * 3] = Math.cos(theta) * ring * radius;
        positions[i * 3 + 1] = y * radius;
        positions[i * 3 + 2] = Math.sin(theta) * ring * radius;
        const c = pastelAt(y);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      const cloudGeo = new THREE.BufferGeometry();
      cloudGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      cloudGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const cloudMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.09,
        map: dot,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        sizeAttenuation: true,
        vertexColors: true,
      });
      const cloud = new THREE.Points(cloudGeo, cloudMat);
      group.add(cloud);

      // 2 — wireframe shell.
      const shellGeo = new THREE.IcosahedronGeometry(2.62, 2);
      const shellMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#2f5a8a"),
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const shell = new THREE.Mesh(shellGeo, shellMat);
      group.add(shell);

      // 3 — pulsing core + halo.
      const coreGeo = new THREE.SphereGeometry(1.02, 32, 32);
      const coreMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c99a47"),
        metalness: 1,
        roughness: 0.22,
        envMapIntensity: 1.35,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      const haloGeo = new THREE.SphereGeometry(1.45, 32, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#c99a47"),
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
      });
      group.add(new THREE.Mesh(haloGeo, haloMat));

      // 4 — orbit rings.
      const rings: import("three").Mesh[] = [];
      const ringSpecs = [
        { r: 3.15, tube: 0.006, tilt: 0.5, color: "#e6c17a", opacity: 0.8, spin: 0.16 },
        { r: 3.55, tube: 0.004, tilt: -0.7, color: "#c99a47", opacity: 0.65, spin: -0.11 },
        { r: 3.95, tube: 0.003, tilt: 0.28, color: "#7fa8d0", opacity: 0.45, spin: 0.08 },
      ];
      for (const spec of ringSpecs) {
        const g = new THREE.TorusGeometry(spec.r, spec.tube, 8, 128);
        const m = new THREE.MeshBasicMaterial({
          color: new THREE.Color(spec.color),
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
      const satColors = ["#e6c17a", "#c99a47", "#f5ebdd", "#7fa8d0", "#e6c17a", "#c99a47"];
      for (let i = 0; i < 6; i++) {
        const m = new THREE.MeshBasicMaterial({
          color: new THREE.Color(satColors[i % satColors.length]),
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
        color: new THREE.Color("#b9c4d8"),
        size: 0.06,
        map: dot,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
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

        shellMat.opacity = 0.2 + Math.sin(t * 1.4) * 0.05;
        coreMat.envMapIntensity = 1.2 + Math.sin(t * 1.8) * 0.4;
        haloMat.opacity = 0.12 + Math.sin(t * 1.8) * 0.04;

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
        envMap.dispose();
        pmrem.dispose();
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
