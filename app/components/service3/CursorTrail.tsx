"use client";

import { useLayoutEffect, useRef, type MouseEventHandler } from "react";
import styles from "./CursorTrail.module.css";

const STRIPE_COUNT = 11;
const EASE = 0.16;
// The anchor stays near the box's bottom-right corner so the stripes always
// fill the frame; the mouse only nudges it within a limited window instead
// of pinning it to the raw cursor position (which would collapse the bands
// into a sliver whenever the cursor nears an edge).
const BASE_RATIO = { x: 0.9, y: 0.9 };
const SHIFT_RATIO = 0.14;

// SKEEP's Red brand ramp (5 -> 90), darkest to lightest, so the concentric
// bands read as the site's own color chip rather than a generic rainbow.
const STRIPE_COLORS = [
  "#70002d",
  "#94003b",
  "#b80049",
  "#e0005a",
  "#ff0a6c",
  "#ff428e",
  "#ff7aaf",
  "#ffa3c8",
  "#ffcce0",
  "#ffe0ed",
  "#fff0f6",
];

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// Maps a 0-1 position along one axis to an anchor ratio that stays close
// to BASE_RATIO, only nudged toward the mouse within SHIFT_RATIO.
function anchorRatio(base: number, mouseRatio: number) {
  return clamp(base + (mouseRatio - 0.5) * 2 * SHIFT_RATIO, base - SHIFT_RATIO, base + SHIFT_RATIO);
}

// Each stripe is a square anchored by its bottom-right corner to the same
// point (the cursor), with its opposite corner rounded into a quarter
// circle. Stacking them largest-to-smallest exposes each layer as an
// L-shaped band, so the whole stack reads as concentric ribbons bending
// around a vanishing point that follows the mouse.
export function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimsRef = useRef({ width: 0, height: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const applySizes = () => {
      const { offsetWidth: width, offsetHeight: height } = el;
      dimsRef.current = { width, height };
      const diag = Math.hypot(width, height);
      stripeRefs.current.forEach((node, i) => {
        if (!node) return;
        const size = diag * (1 - i / STRIPE_COUNT);
        node.style.width = `${size}px`;
        node.style.height = `${size}px`;
        node.style.borderTopLeftRadius = `${size}px`;
      });
      const idle = { x: width * BASE_RATIO.x, y: height * BASE_RATIO.y };
      currentRef.current = idle;
      targetRef.current = idle;
    };

    applySizes();
    const observer = new ResizeObserver(applySizes);
    observer.observe(el);

    let frame: number;
    const tick = () => {
      const current = currentRef.current;
      current.x = lerp(current.x, targetRef.current.x, EASE);
      current.y = lerp(current.y, targetRef.current.y, EASE);

      const { width, height } = dimsRef.current;
      stripeRefs.current.forEach((node) => {
        if (!node) return;
        node.style.right = `${width - current.x}px`;
        node.style.bottom = `${height - current.y}px`;
      });

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseXRatio = (e.clientX - rect.left) / rect.width;
    const mouseYRatio = (e.clientY - rect.top) / rect.height;
    targetRef.current = {
      x: rect.width * anchorRatio(BASE_RATIO.x, mouseXRatio),
      y: rect.height * anchorRatio(BASE_RATIO.y, mouseYRatio),
    };
  };

  const handleMouseLeave = () => {
    const { width, height } = dimsRef.current;
    targetRef.current = { x: width * BASE_RATIO.x, y: height * BASE_RATIO.y };
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.base} />
      {STRIPE_COLORS.map((color, i) => (
        <div
          key={color}
          ref={(node) => {
            stripeRefs.current[i] = node;
          }}
          className={styles.stripe}
          style={{ background: color, zIndex: i + 1 }}
        />
      ))}
    </div>
  );
}
