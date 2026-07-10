"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CursorTrail.module.css";

const CARD_COUNT = 10;
const SAMPLE_GAP = 3;
const EASE = 0.22;
const HISTORY_CAPACITY = (CARD_COUNT - 1) * SAMPLE_GAP + 1;

const WORDS = ["서비스 이름", "제품 이름", "공간 이름"];

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#ea580c",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
  "#ca8a04",
  "#db2777",
];

// Per-card tilt, largest/front card first, tail last.
const ROTATIONS = [-6, 8, -9, 5, -7, 9, -5, 7, -8, 4];

// Card width as a percentage of the container, front (largest) to tail (smallest).
const SIZES = [34, 30, 27, 24, 21, 18, 15, 12, 9, 7];

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

// Resting layout shown before the user has moved the cursor: an evenly
// spaced straight diagonal from bottom-right to top-left.
const IDLE_POINTS = Array.from({ length: CARD_COUNT }, (_, i) => {
  const t = i / (CARD_COUNT - 1);
  return { x: lerp(88, 10, t), y: lerp(88, 12, t) };
});

export function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const historyRef = useRef<{ x: number; y: number }[]>([]);
  const targetRef = useRef<{ x: number; y: number }>(IDLE_POINTS[0]);
  const activeRef = useRef(false);
  const positionsRef = useRef(IDLE_POINTS.map((p) => ({ ...p })));
  const [hovered, setHovered] = useState(false);

  // Randomized client-side only (after mount) so the server-rendered HTML
  // and the first client render match, avoiding a hydration mismatch.
  useEffect(() => {
    for (let i = 0; i < CARD_COUNT; i++) {
      const card = cardRefs.current[i];
      const label = labelRefs.current[i];
      if (!card || !label) continue;
      card.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      label.textContent = WORDS[Math.floor(Math.random() * WORDS.length)];
    }
  }, []);

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
          <span
            ref={(node) => {
              labelRefs.current[i] = node;
            }}
            className={styles.label}
          />
        </div>
      ))}
    </div>
  );
}
