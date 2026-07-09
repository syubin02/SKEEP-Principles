"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import styles from "./LeaveNothing.module.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function clampedProgress(start: number, end: number, value: number) {
  if (end === start) return value >= end ? 1 : 0;
  return Math.min(Math.max((value - start) / (end - start), 0), 1);
}

export function LeaveNothing() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [bgOpacity, setBgOpacity] = useState(1);
  const [rockOpacity, setRockOpacity] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setBgOpacity(1 - clampedProgress(0.1, 0.5, value));
    setRockOpacity(clampedProgress(0.5, 0.9, value));
  });

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.section}>
        <img
          className={styles.bgPhoto}
          src={`${BASE_PATH}/service2/leave-nothing-bg.jpg`}
          alt=""
          style={{ opacity: bgOpacity }}
        />
        <div className={styles.card}>
          <p className={styles.leave}>LEAVE</p>
          <div className={styles.blobWrap}>
            <img
              className={styles.blobImage}
              src={`${BASE_PATH}/service2/leave-nothing-photo-blob.png`}
              alt=""
              style={{ opacity: 1 - rockOpacity }}
            />
            <img
              className={styles.blobImage}
              src={`${BASE_PATH}/service2/leave-nothing-rock-blob.png`}
              alt=""
              style={{ opacity: rockOpacity }}
            />
          </div>
          <p className={styles.nothing}>NOTHING.</p>
          <p className={styles.body}>
            환경은 특정 순간에만 사용자를 알게 됩니다.
            <br />
            상호작용이 끝나면 패킷은 회수되어 환경은 사용자에 대한 정보를 잊게 되죠.
          </p>
        </div>
      </div>
    </div>
  );
}
