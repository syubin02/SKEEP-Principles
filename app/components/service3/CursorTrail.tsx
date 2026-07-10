"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CursorTrail.module.css";

const CARD_COUNT = 10;
const SAMPLE_GAP = 3;
const EASE = 0.22;
const HISTORY_CAPACITY = (CARD_COUNT - 1) * SAMPLE_GAP + 1;

// Per-card tilt, largest/front card first, tail last.
const ROTATIONS = [-6, 8, -9, 5, -7, 9, -5, 7, -8, 4];

// Card width as a percentage of the container, front (largest) to tail (smallest).
const SIZES = [34, 30, 27, 24, 21, 18, 15, 12, 9, 7];

// Resting arc shown before the user has moved the cursor: sweeps from the
// bottom-right up and around to the left, mirroring the reference layout.
const IDLE_POINTS = [
  { x: 58, y: 90 },
  { x: 70, y: 74 },
  { x: 82, y: 60 },
  { x: 90, y: 44 },
  { x: 84, y: 28 },
  { x: 68, y: 15 },
  { x: 47, y: 10 },
  { x: 28, y: 16 },
  { x: 15, y: 27 },
  { x: 8, y: 39 },
];

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

export function CursorTrail({ images = [] }: { images?: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const historyRef = useRef<{ x: number; y: number }[]>([]);
  const targetRef = useRef<{ x: number; y: number }>(IDLE_POINTS[0]);
  const activeRef = useRef(false);
  const positionsRef = useRef(IDLE_POINTS.map((p) => ({ ...p })));
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let frame: number;

    const tick = () => {
      const active = activeRef.current;
      historyRef.current.unshift(active ? targetRef.current : IDLE_POINTS[0]);
      if (historyRef.current.length > HISTORY_CAPACITY) {
        historyRef.current.length = HISTORY_CAPACITY;
      }

      for (let i = 0; i < CARD_COUNT; i++) {
        const desired = active
          ? historyRef.current[Math.min(i * SAMPLE_GAP, historyRef.current.length - 1)] ??
            IDLE_POINTS[i]
          : IDLE_POINTS[i];

        const current = positionsRef.current[i];
        current.x = lerp(current.x, desired.x, EASE);
        current.y = lerp(current.y, desired.y, EASE);

        const node = cardRefs.current[i];
        if (node) {
          node.style.left = `${current.x}%`;
          node.style.top = `${current.y}%`;
          node.style.transform = `translate(-50%, -50%) rotate(${ROTATIONS[i]}deg)`;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
    activeRef.current = true;
    if (!hovered) setHovered(true);
  };

  const handleMouseLeave = () => {
    activeRef.current = false;
    setHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <p className={`${styles.hint} ${hovered ? styles.hintHidden : ""}`}>Move your cursor</p>
      {Array.from({ length: CARD_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(node) => {
            cardRefs.current[i] = node;
          }}
          className={styles.card}
          style={{
            width: `${SIZES[i]}%`,
            zIndex: CARD_COUNT - i,
          }}
        >
          {images[i % images.length] ? (
            <img className={styles.image} src={images[i % images.length]} alt="" />
          ) : (
            <div className={styles.placeholder} data-tone={i % 3} />
          )}
        </div>
      ))}
    </div>
  );
}
