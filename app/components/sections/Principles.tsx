"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./Principles.module.css";

const PRINCIPLES = [
  {
    title: "필요한 순간, 가장 적합하게",
    body: "환경의 제약 없이, 지금 당신에게 필요한 AI 피쳐를 즉시 불러옵니다.",
  },
  {
    title: "새로운 도구를 찾을 필요 없이",
    body: "물리적인 하드웨어를 더하지 않아도, 현재의 환경 안에서 최적화된 능력을 실행합니다.",
  },
  {
    title: "사용이 끝나면, 흔적 없이",
    body: "다운로드 후 사용이 종료되면, 목적을 다한 능력은 깔끔하게 정리됩니다.",
  },
];

function clampedRatio(value: number, start: number, end: number) {
  return Math.min(Math.max((value - start) / (end - start), 0), 1);
}

function useStepOpacity(
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"],
  index: number,
  total: number
) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  const margin = step * 0.12;

  return useTransform(scrollYProgress, (p) => {
    const fadeIn = index === 0 ? 1 : clampedRatio(p, start, start + margin);
    const fadeOut = index === total - 1 ? 1 : 1 - clampedRatio(p, end - margin, end);
    return Math.min(fadeIn, fadeOut);
  });
}

export function Principles() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const opacity0 = useStepOpacity(scrollYProgress, 0, PRINCIPLES.length);
  const opacity1 = useStepOpacity(scrollYProgress, 1, PRINCIPLES.length);
  const opacity2 = useStepOpacity(scrollYProgress, 2, PRINCIPLES.length);
  const opacities = [opacity0, opacity1, opacity2];

  const dotColor0 = useTransform(opacity0, (v) => (v > 0.5 ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.15)"));
  const dotColor1 = useTransform(opacity1, (v) => (v > 0.5 ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.15)"));
  const dotColor2 = useTransform(opacity2, (v) => (v > 0.5 ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.15)"));
  const dotColors = [dotColor0, dotColor1, dotColor2];

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.section}>
        <div className={styles.textBlock}>
          <h2 className={styles.heading}>
            사용자의 환경이
            <br />
            완전해지는 순간까지
          </h2>
          <p className={styles.body}>
            현재 환경에 없는 AI 기능도, SKEEP은 필요한 순간 필요한 기능을
            다운로드해 사용할 수 있습니다. 사용이 끝나면, 권한과 함께 바로
            사라지죠.
          </p>
        </div>
        <div className={styles.visualColumn}>
          <div className={styles.visual}>
            {PRINCIPLES.map((p, i) => (
              <motion.div key={p.title} className={styles.card} style={{ opacity: opacities[i] }}>
                <span className={styles.eyebrow}>Principle 0{i + 1}</span>
                <p className={styles.cardTitle}>{p.title}</p>
                <p className={styles.cardBody}>{p.body}</p>
              </motion.div>
            ))}
          </div>
          <div className={styles.progress}>
            {PRINCIPLES.map((p, i) => (
              <motion.span
                key={p.title}
                className={styles.dot}
                style={{ backgroundColor: dotColors[i] }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
