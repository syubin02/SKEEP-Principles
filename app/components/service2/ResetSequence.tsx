"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import styles from "./ResetSequence.module.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Stage = {
  heading: string;
  body?: string[];
};

const STAGES: Stage[] = [
  { heading: "아무 일도 없었던 것처럼\n완벽한 리셋." },
  {
    heading: "패킷 회수 중... (3개)",
    body: ["상호작용이 끝나면, SKEEP은 맥락 패킷을 회수하고", "환경은 원래 상태로 돌아갑니다."],
  },
  {
    heading: "패킷 회수 중... (2개)",
    body: ["상호작용이 끝나면 SKEEP은 맥락 패킷을 회수하고", "환경은 원래 상태로 돌아갑니다."],
  },
  {
    heading: "패킷 회수 중... (1개)",
    body: ["상호작용이 끝나면 SKEEP은 맥락 패킷을 회수하고", "환경은 원래 상태로 돌아갑니다."],
  },
  { heading: "다시, 처음처럼" },
];

const HALF_WIDTH = 0.13;

function triangleOpacity(value: number, center: number, halfWidth: number) {
  const d = Math.abs(value - center);
  return Math.max(0, 1 - d / halfWidth);
}

export function ResetSequence() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacities, setOpacities] = useState<number[]>(() => STAGES.map(() => 0));

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applyProgress = (value: number) => {
      if (!video.duration) return;
      video.currentTime = value * video.duration;
    };

    const onLoadedMetadata = () => applyProgress(scrollYProgress.get());
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    if (video.readyState >= 1) applyProgress(scrollYProgress.get());

    return () => video.removeEventListener("loadedmetadata", onLoadedMetadata);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setOpacities(
      STAGES.map((_, i) => triangleOpacity(value, (i + 0.5) / STAGES.length, HALF_WIDTH))
    );

    const video = videoRef.current;
    if (video && video.duration) {
      video.currentTime = value * video.duration;
    }
  });

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.section}>
        <video
          ref={videoRef}
          className={styles.video}
          src={`${BASE_PATH}/service2/reset-recall.mp4`}
          muted
          playsInline
          preload="auto"
        />
        <div className={styles.dimOverlay} />
        {STAGES.map((stage, i) => (
          <div
            key={i}
            className={styles.textLayer}
            style={{
              opacity: opacities[i],
              transform: `translateY(${(1 - opacities[i]) * 20}px)`,
            }}
          >
            <p className={styles.heading}>
              {stage.heading.split("\n").map((line, j) => (
                <span key={j}>{line}</span>
              ))}
            </p>
            {stage.body && (
              <p className={styles.body}>
                {stage.body.map((line, j) => (
                  <span key={j}>{line}</span>
                ))}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
