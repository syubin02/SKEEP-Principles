"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import styles from "./SkeepExperience.module.css";

const LINES = [
  "사용자의 의도를 앞서 읽고",
  "기기의 경계를 넘어",
  "모든 순간을 매끄럽게 연결하는",
];

const STAGES = [
  {
    key: "intent",
    caption: ["사용자의 목적을 정교하게 추론하여,", "늘 준비된 경험을 보장합니다."],
  },
  {
    key: "beyond",
    caption: ["하드웨어와 상관없이,", "사용자만을 위한 SKEEP 경험을 제공합니다."],
  },
  {
    key: "seamless",
    caption: ["매 순간의 경험이 겹쳐져", "다음 사용을 더욱 매끄럽게 연결합니다."],
  },
] as const;

function clampedProgress(start: number, end: number, value: number) {
  if (end === start) return value >= end ? 1 : 0;
  return Math.min(Math.max((value - start) / (end - start), 0), 1);
}

function IntentVisual() {
  return <span className={styles.watermark}>Intent</span>;
}

function BeyondVisual() {
  return (
    <>
      <span className={`${styles.rect} ${styles.rectA}`} />
      <span className={`${styles.rect} ${styles.rectB}`} />
      <span className={`${styles.rect} ${styles.rectC}`} />
    </>
  );
}

function SeamlessVisual() {
  return (
    <svg
      className={styles.arches}
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <path
        d="M20 200 C20 100, 110 100, 110 200 C110 100, 200 100, 200 200 C200 100, 290 100, 290 200 C290 100, 380 100, 380 200"
        fill="none"
        stroke="url(#archGradient)"
        strokeWidth="26"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="archGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9aa0ab" />
          <stop offset="50%" stopColor="#d9dce1" />
          <stop offset="100%" stopColor="#7d838d" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const VISUALS = {
  intent: IntentVisual,
  beyond: BeyondVisual,
  seamless: SeamlessVisual,
};

export function SkeepExperience() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setStage(clampedProgress(0, 1, value) * (STAGES.length - 1));
  });

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <section className={styles.section}>
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>
            Skeep
            <br />
            Experience
          </p>
          <h2 className={styles.heading}>
            {LINES.map((line, i) => {
              const weight = Math.max(0, 1 - Math.abs(stage - i));
              return (
                <span key={line} style={{ color: `rgba(14, 24, 37, ${0.2 + 0.8 * weight})` }}>
                  {line}
                </span>
              );
            })}
          </h2>
        </div>
        <div className={styles.box}>
          {STAGES.map((s, i) => {
            const weight = Math.max(0, 1 - Math.abs(stage - i));
            const Visual = VISUALS[s.key];
            return (
              <div key={s.key} className={styles.visualLayer} style={{ opacity: weight }}>
                <Visual />
                <div className={styles.caption}>
                  {s.caption.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
