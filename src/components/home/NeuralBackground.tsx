"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let rafId = 0;
    const isDark = () => document.documentElement.classList.contains("dark");

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * window.devicePixelRatio;
      canvas!.height = height * window.devicePixelRatio;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);

      const count = Math.round((width * height) / 26000);
      nodes = Array.from({ length: Math.min(count, 70) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const dark = isDark();
      const dotColor = dark ? "rgba(242,243,245,0.55)" : "rgba(11,12,14,0.45)";

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const max = 130;
          if (dist < max) {
            const opacity = (1 - dist / max) * (dark ? 0.16 : 0.1);
            ctx!.strokeStyle = dark
              ? `rgba(124,92,255,${opacity})`
              : `rgba(52,87,255,${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx!.fillStyle = dotColor;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!prefersReduced) rafId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}
