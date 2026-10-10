"use client";

import { useEffect, useRef } from "react";

type Vec3 = { x: number; y: number; z: number };

/**
 * An interactive "evidence core": a projected 3D sphere of nodes with live
 * connections, a radar sweep, and depth + cursor highlighting. Pure canvas —
 * no WebGL, no libraries — so it stays fast and reliable everywhere.
 */
export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    // Nodes distributed over a sphere (Fibonacci sphere).
    const count = width < 640 ? 90 : 150;
    const nodes: Vec3[] = [];
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * 2.399963229728653;
      nodes.push({ x: Math.cos(theta) * ring, y, z: Math.sin(theta) * ring });
    }

    const projected = Array.from({ length: count }, () => ({
      x: 0,
      y: 0,
      s: 0,
    }));

    const mouse = { x: 0, y: 0, tx: 0, ty: 0, cx: -999, cy: -999 };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      mouse.cx = event.clientX - rect.left;
      mouse.cy = event.clientY - rect.top;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    let time = 0;

    const draw = () => {
      time += reduce ? 0 : 0.0029;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      const angleY = time * 0.7 + mouse.x * 0.9;
      const angleX = Math.sin(time * 0.5) * 0.22 + mouse.y * 0.5;
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.37;
      const fov = 3;

      for (let i = 0; i < count; i++) {
        const p = nodes[i];
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const scale = fov / (fov + z2);
        projected[i].x = cx + x1 * radius * scale;
        projected[i].y = cy + y2 * radius * scale;
        projected[i].s = scale;
      }

      ctx.clearRect(0, 0, width, height);

      const limit = radius * 0.46;
      const limit2 = limit * limit;

      // Connections
      ctx.lineWidth = 1;
      for (let i = 0; i < count; i++) {
        const a = projected[i];
        for (let j = i + 1; j < count; j++) {
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > limit2) continue;
          const depth = Math.min(1, Math.max(0, ((a.s + b.s) / 2 - 0.72) / 0.75));
          const alpha = (1 - Math.sqrt(d2) / limit) * 0.5 * depth;
          if (alpha <= 0.012) continue;
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Nodes
      for (let i = 0; i < count; i++) {
        const p = projected[i];
        const depth = Math.max(0, (p.s - 0.7) / 0.9);
        const dx = p.x - mouse.cx;
        const dy = p.y - mouse.cy;
        const near = 1 - Math.min(1, Math.sqrt(dx * dx + dy * dy) / 140);
        const r = 0.6 + depth * 1.9 + Math.max(0, near) * 1.7;
        const alpha = Math.min(1, 0.22 + depth * 0.6 + Math.max(0, near) * 0.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle =
          near > 0.12
            ? `rgba(186, 248, 255, ${alpha})`
            : `rgba(34, 211, 238, ${alpha})`;
        ctx.fill();
      }

      // Radar sweep
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.9);
      const sweep = ctx.createLinearGradient(0, 0, radius * 1.2, 0);
      sweep.addColorStop(0, "rgba(34, 211, 238, 0)");
      sweep.addColorStop(1, "rgba(34, 211, 238, 0.22)");
      ctx.strokeStyle = sweep;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius * 1.2, 0);
      ctx.stroke();
      ctx.restore();

      // Central core glow
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.55);
      core.addColorStop(0, "rgba(34, 211, 238, 0.14)");
      core.addColorStop(0.5, "rgba(129, 140, 248, 0.06)");
      core.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.55, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ pointerEvents: "none" }}
    />
  );
}
