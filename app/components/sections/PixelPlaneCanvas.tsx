"use client";

import { useEffect, useRef } from "react";
import styles from "./Detour.module.css";

const PLANE_PATH = "M2 21 L23 12 L2 3 L2 10 L17 12 L2 14 Z";
const SAMPLE_SIZE = 240;
const GRID_SPACING = 7;
const PLANE_WIDTH = 440;
const ROTATION = -0.38; // radians, tilts the plane's nose up-and-right
const DOT_COLOR = "255, 7, 106";

const T_ASSEMBLE = 1500;
const T_HOLD = 950;
const T_FLY = 950;
const T_TOTAL = T_ASSEMBLE + T_HOLD + T_FLY;
const FLY_VECTOR = { x: 260, y: -300 };

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number) {
  return t * t * t;
}

function samplePlanePoints() {
  const off = document.createElement("canvas");
  off.width = SAMPLE_SIZE;
  off.height = SAMPLE_SIZE;
  const ctx = off.getContext("2d");
  if (!ctx) return [] as { x: number; y: number }[];

  ctx.save();
  ctx.scale(SAMPLE_SIZE / 24, SAMPLE_SIZE / 24);
  ctx.fillStyle = "#fff";
  ctx.fill(new Path2D(PLANE_PATH));
  ctx.restore();

  const { data } = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  const points: { x: number; y: number }[] = [];
  for (let y = 0; y < SAMPLE_SIZE; y += GRID_SPACING) {
    for (let x = 0; x < SAMPLE_SIZE; x += GRID_SPACING) {
      const alpha = data[(y * SAMPLE_SIZE + x) * 4 + 3];
      if (alpha > 128) points.push({ x, y });
    }
  }
  return points;
}

interface Particle {
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  delay: number;
  size: number;
  alpha: number;
}

export function PixelPlaneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const containerEl = containerRef.current;
    const contextEl = canvasEl?.getContext("2d");
    if (!canvasEl || !containerEl || !contextEl) return;
    const canvas = canvasEl;
    const container = containerEl;
    const ctx = contextEl;

    const scaleFactor = PLANE_WIDTH / SAMPLE_SIZE;
    const cos = Math.cos(ROTATION);
    const sin = Math.sin(ROTATION);
    const rawPoints = samplePlanePoints().map((p) => {
      const cx = (p.x - SAMPLE_SIZE / 2) * scaleFactor;
      const cy = (p.y - SAMPLE_SIZE / 2) * scaleFactor;
      return { x: cx * cos - cy * sin, y: cx * sin + cy * cos };
    });
    const bounds = rawPoints.reduce(
      (acc, p) => ({
        minX: Math.min(acc.minX, p.x),
        maxX: Math.max(acc.maxX, p.x),
        minY: Math.min(acc.minY, p.y),
        maxY: Math.max(acc.maxY, p.y),
      }),
      { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity },
    );
    const planeW = bounds.maxX - bounds.minX;
    const planeH = bounds.maxY - bounds.minY;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function randomScatterStart(targetX: number, targetY: number) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.max(width, height) * (0.55 + Math.random() * 0.5);
      return {
        x: targetX + Math.cos(angle) * radius,
        y: targetY + Math.sin(angle) * radius,
      };
    }

    function initParticles() {
      const originX = width * 0.74 - (bounds.minX + planeW / 2);
      const originY = height * 0.86 - (bounds.minY + planeH / 2);
      particles = rawPoints.map((p) => {
        const targetX = p.x + originX;
        const targetY = p.y + originY;
        const start = randomScatterStart(targetX, targetY);
        return {
          targetX,
          targetY,
          startX: start.x,
          startY: start.y,
          delay: Math.random() * 0.55,
          size: 1.7 * (0.7 + Math.random() * 0.6),
          alpha: 0.55 + Math.random() * 0.45,
        };
      });
    }

    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let visible = false;
    let cycleStart = performance.now();
    let rafId = 0;

    function frame(now: number) {
      rafId = requestAnimationFrame(frame);
      if (!visible) return;
      const elapsed = (now - cycleStart) % T_TOTAL;

      ctx.clearRect(0, 0, width, height);

      let flyProgress = 0;
      let flyAlpha = 1;
      if (elapsed > T_ASSEMBLE + T_HOLD) {
        const ft = (elapsed - T_ASSEMBLE - T_HOLD) / T_FLY;
        flyProgress = easeInCubic(Math.min(ft, 1));
        flyAlpha = 1 - flyProgress;
      }

      for (const particle of particles) {
        let x: number;
        let y: number;
        let alphaMul = 1;

        if (elapsed <= T_ASSEMBLE) {
          const localT = Math.min(
            Math.max((elapsed / T_ASSEMBLE - particle.delay) / (1 - particle.delay), 0),
            1,
          );
          const eased = easeOutCubic(localT);
          x = particle.startX + (particle.targetX - particle.startX) * eased;
          y = particle.startY + (particle.targetY - particle.startY) * eased;
        } else {
          x = particle.targetX + FLY_VECTOR.x * flyProgress;
          y = particle.targetY + FLY_VECTOR.y * flyProgress;
          alphaMul = flyAlpha;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(${DOT_COLOR}, ${particle.alpha * alphaMul})`;
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    rafId = requestAnimationFrame(frame);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) cycleStart = performance.now();
      },
      { threshold: 0.2 },
    );
    io.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.canvasLayer}>
      <canvas ref={canvasRef} />
    </div>
  );
}
