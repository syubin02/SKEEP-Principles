"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import styles from "./NegotiationPillars.module.css";

const PILLARS = [
  {
    key: "skip",
    color: "#e7eaf0",
    title: ["본질만 남긴 채", "SKIP"],
    body: [
      "사용자의 SKEEP은 목적을 이루는 데",
      "필요한 조건만 전달합니다. 사적인 이유나",
      "불필요한 정보는 환경에 남기지 않죠.",
    ],
  },
  {
    key: "skeep",
    color: "#f2f4f7",
    title: ["경계를 존중하는", "SKEEP"],
    body: [
      "환경 운영 규칙과 물리적 한계,",
      "사용자가 정한 비용과 정보 공유 범위는",
      "협상하지 않고, 그 안에서 방법을 찾습니다.",
    ],
  },
  {
    key: "keep",
    color: "#d4d8e0",
    title: ["모두의 흐름은", "KEEP"],
    body: [
      "SKEEP은 서로의 조건을 조율해,",
      "공간 안의 사람과 자원, 시간을 살피며",
      "모두의 목적이 이어질 방법을 찾습니다.",
    ],
  },
] as const;

function clampedProgress(start: number, end: number, value: number) {
  if (end === start) return value >= end ? 1 : 0;
  return Math.min(Math.max((value - start) / (end - start), 0), 1);
}

export function NegotiationPillars() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setStage(clampedProgress(0, 1, value) * (PILLARS.length - 1));
  });

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <section className={styles.section}>
        <div className={styles.box}>
          {PILLARS.map((pillar, i) => {
            const weight = Math.max(0, 1 - Math.abs(stage - i));
            return (
              <div key={pillar.key} className={styles.card} style={{ opacity: weight }}>
                <div className={styles.visual} style={{ background: pillar.color }} />
                <div className={styles.textBlock}>
                  <h2 className={styles.heading}>
                    {pillar.title.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h2>
                  <p className={styles.body}>
                    {pillar.body.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
