"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./SkeepExperience.module.css";

const SNAP_IDLE_DELAY = 140;
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
  return (
    <video
      className={styles.intentVideo}
      src={`${BASE_PATH}/service3/intent-bg.mp4`}
      autoPlay
      muted
      loop
      playsInline
    />
  );
}

function BeyondVisual() {
  return (
    <video
      className={styles.beyondVideo}
      src={`${BASE_PATH}/service3/beyond-bg.mp4`}
      autoPlay
      muted
      loop
      playsInline
    />
  );
}

function SeamlessVisual() {
  return (
    <video
      className={styles.seamlessVideo}
      src={`${BASE_PATH}/service3/seamless-bg.mp4`}
      autoPlay
      muted
      loop
      playsInline
    />
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

  // Once the scroll comes to rest while a stage is only partway crossfaded,
  // gently pull it the rest of the way to the nearest stage instead of
  // leaving the transition stuck in between.
  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const scrollRange = wrapper.offsetHeight - window.innerHeight;
        if (scrollRange <= 0) return;
        const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
        const current = window.scrollY;
        if (current < wrapperTop || current > wrapperTop + scrollRange) return;

        const progress = (current - wrapperTop) / scrollRange;
        const nearestStage = Math.round(progress * (STAGES.length - 1));
        const targetY = wrapperTop + (nearestStage / (STAGES.length - 1)) * scrollRange;
        if (Math.abs(current - targetY) > 1) {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }, SNAP_IDLE_DELAY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <section className={styles.section}>
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>Skeep Experience</p>
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
          <div className={styles.captionStack}>
            {STAGES.map((s, i) => {
              const weight = Math.max(0, 1 - Math.abs(stage - i));
              return (
                <div key={s.key} className={styles.caption} style={{ opacity: weight }}>
                  {s.caption.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.box}>
          {STAGES.map((s, i) => {
            const weight = Math.max(0, 1 - Math.abs(stage - i));
            const Visual = VISUALS[s.key];
            return (
              <div key={s.key} className={styles.visualLayer} style={{ opacity: weight }}>
                <Visual />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
