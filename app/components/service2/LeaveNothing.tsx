"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import styles from "./LeaveNothing.module.css";

function clampedProgress(start: number, end: number, value: number) {
  if (end === start) return value >= end ? 1 : 0;
  return Math.min(Math.max((value - start) / (end - start), 0), 1);
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

export function LeaveNothing() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [fullBleedScale, setFullBleedScale] = useState(1.35);
  const [expandProgress, setExpandProgress] = useState(0);
  const [textProgress, setTextProgress] = useState(0);

  useEffect(() => {
    const measure = () => {
      const box = boxRef.current;
      if (!box || box.offsetWidth === 0 || box.offsetHeight === 0) return;
      const scaleX = window.innerWidth / box.offsetWidth;
      const scaleY = window.innerHeight / box.offsetHeight;
      setFullBleedScale(Math.max(scaleX, scaleY));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setTextProgress(clampedProgress(0, 0.3, value));
    setExpandProgress(clampedProgress(0.15, 0.7, value));
  });

  const scale = lerp(1, fullBleedScale, expandProgress);
  const borderRadius = lerp(32, 0, expandProgress);
  const textOpacity = 1 - textProgress;
  const textY = lerp(0, -40, textProgress);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.section}>
        <div
          ref={boxRef}
          className={styles.box}
          style={{ transform: `scale(${scale})`, borderRadius }}
        >
          <div
            className={styles.textLayer}
            style={{ opacity: textOpacity, transform: `translateY(${textY}px)` }}
          >
            <p className={styles.heading}>Leave Nothing</p>
            <p className={styles.body}>
              환경은 특정 순간에만 사용자를 알게 됩니다.
              <br />
              상호작용이 끝나면 패킷은 회수되어
              <br />
              환경은 사용자에 대한 정보를 잊게 되죠.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
