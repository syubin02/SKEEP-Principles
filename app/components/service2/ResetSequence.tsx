"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import styles from "./ResetSequence.module.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Stage = {
  heading: string;
};

const STAGES: Stage[] = [
  { heading: "아무 일도 없었던 것처럼\n완벽한 리셋." },
  { heading: "패킷 회수 중..." },
  { heading: "패킷 회수 중..." },
  { heading: "패킷 회수 중..." },
  { heading: "다시, 처음처럼" },
];

// Browsers composite <video> on its own hardware layer, which mix-blend-mode
// can't blend against directly. Drawing the current frame onto a canvas each
// time we seek gives the blend mode a normal paintable surface to work with.
function drawVideoFrame(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx || !video.videoWidth || !video.videoHeight) return;

  const cw = canvas.width;
  const ch = canvas.height;
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  const canvasRatio = cw / ch;
  const videoRatio = vw / vh;

  let sx = 0;
  let sy = 0;
  let sw = vw;
  let sh = vh;
  if (videoRatio > canvasRatio) {
    sw = vh * canvasRatio;
    sx = (vw - sw) / 2;
  } else {
    sh = vw / canvasRatio;
    sy = (vh - sh) / 2;
  }
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
}

export function ResetSequence() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawVideoFrame(video, canvas);
    };

    const applyProgress = (value: number) => {
      if (!video.duration) return;
      video.currentTime = value * video.duration;
    };

    const onSeeked = () => drawVideoFrame(video, canvas);
    const onLoadedMetadata = () => {
      resize();
      applyProgress(scrollYProgress.get());
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("resize", resize);
    if (video.readyState >= 1) onLoadedMetadata();

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActiveStage(Math.min(STAGES.length - 1, Math.floor(value * STAGES.length)));

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
          className={styles.hiddenVideo}
          src={`${BASE_PATH}/service2/reset-recall.mp4`}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <canvas ref={canvasRef} className={styles.video} />
        {STAGES.map((stage, i) => (
          <div
            key={i}
            className={styles.textLayer}
            style={{ opacity: i === activeStage ? 1 : 0 }}
          >
            <p className={styles.heading}>
              {stage.heading.split("\n").map((line, j) => (
                <span key={j}>{line}</span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
