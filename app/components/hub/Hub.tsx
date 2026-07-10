"use client";

import Link from "next/link";
import { motion, type PanInfo } from "framer-motion";
import { useRef, useState } from "react";
import styles from "./Hub.module.css";

const DRAG_OFFSET_THRESHOLD = 80;
const DRAG_VELOCITY_THRESHOLD = 400;

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Thumbnail =
  | { kind: "video"; src: string; heading: string[] }
  | { kind: "image"; src: string; heading: string[] }
  | { kind: "color"; color: string; heading: string[] };

type Slide = {
  href?: string;
  thumbnail?: Thumbnail;
};

// Each thumbnail mirrors that page's first section, so the slide preview
// is the real hero/statement content rather than a flat placeholder.
// Slots 0-3 have real destinations today; the rest are reserved
// placeholders for pages that haven't been built yet.
const SLIDES: Slide[] = [
  {
    href: "/principles",
    thumbnail: { kind: "video", src: `${BASE_PATH}/hero/focus.mp4`, heading: ["When you need", "Focus"] },
  },
  {
    href: "/service2",
    thumbnail: {
      kind: "image",
      src: `${BASE_PATH}/service2/statement-bg.jpg`,
      heading: ["기기에는 흔적 없이", "내 맥락은 끊김 없이"],
    },
  },
  {
    href: "/service3",
    thumbnail: { kind: "color", color: "#e7eaf0", heading: ["당신다운 경험의 시작"] },
  },
  {
    href: "/negotiation",
    thumbnail: { kind: "color", color: "#e7eaf0", heading: ["당신이 원하는 그대로", "가장 자연스럽게"] },
  },
  {},
  {},
  {},
  {},
];

function SlideThumbnail({ thumbnail }: { thumbnail?: Thumbnail }) {
  if (!thumbnail) return null;
  const isDark = thumbnail.kind !== "color";
  return (
    <div className={styles.thumbnail}>
      {thumbnail.kind === "video" && (
        <video className={styles.thumbnailMedia} src={thumbnail.src} autoPlay muted loop playsInline />
      )}
      {thumbnail.kind === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.thumbnailMedia} src={thumbnail.src} alt="" />
      )}
      {thumbnail.kind === "color" && (
        <div className={styles.thumbnailMedia} style={{ background: thumbnail.color }} />
      )}
      {isDark && <div className={styles.thumbnailScrim} />}
      <p className={isDark ? styles.thumbnailHeading : `${styles.thumbnailHeading} ${styles.thumbnailHeadingDark}`}>
        {thumbnail.heading.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </div>
  );
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DisplayIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Hub() {
  const [active, setActive] = useState(0);
  const total = SLIDES.length;
  const prevIndex = mod(active - 1, total);
  const nextIndex = mod(active + 1, total);
  const current = SLIDES[active];
  const prev = SLIDES[prevIndex];
  const next = SLIDES[nextIndex];

  // Tracks whether the pointer actually dragged (vs. a plain click/tap), so
  // a swipe doesn't also fire the card underneath it as a click.
  const wasDragging = useRef(false);

  function handleDragStart() {
    wasDragging.current = true;
  }

  function handleDragEnd(_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    if (info.offset.x < -DRAG_OFFSET_THRESHOLD || info.velocity.x < -DRAG_VELOCITY_THRESHOLD) {
      setActive((a) => mod(a + 1, total));
    } else if (info.offset.x > DRAG_OFFSET_THRESHOLD || info.velocity.x > DRAG_VELOCITY_THRESHOLD) {
      setActive((a) => mod(a - 1, total));
    }
    // Let the click handlers see the flag first, then clear it for the next gesture.
    setTimeout(() => {
      wasDragging.current = false;
    }, 0);
  }

  function guardClick(handler: () => void) {
    return () => {
      if (wasDragging.current) return;
      handler();
    };
  }

  function handleCenterClick(e: React.MouseEvent) {
    if (wasDragging.current) e.preventDefault();
  }

  return (
    <div className={styles.hub}>
      <header className={styles.header}>
        <span className={styles.logo}>Skeep</span>
        <div className={styles.controls}>
          <button type="button" className={styles.langPill}>
            English
          </button>
          <button type="button" className={styles.iconButton} aria-label="디스플레이 설정">
            <DisplayIcon />
          </button>
        </div>
      </header>

      <motion.div
        className={styles.stage}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <button
          type="button"
          className={`${styles.card} ${styles.cardSide}`}
          onClick={guardClick(() => setActive(prevIndex))}
          aria-label="이전 슬라이드"
        >
          <SlideThumbnail thumbnail={prev.thumbnail} />
        </button>

        {current.href ? (
          <Link
            href={current.href}
            className={`${styles.card} ${styles.cardCenter}`}
            onClick={handleCenterClick}
            draggable={false}
          >
            <SlideThumbnail thumbnail={current.thumbnail} />
            <span className={styles.enterButton}>
              <ArrowRightIcon />
            </span>
          </Link>
        ) : (
          <div className={`${styles.card} ${styles.cardCenter}`}>
            <SlideThumbnail thumbnail={current.thumbnail} />
            <span className={`${styles.enterButton} ${styles.enterButtonDisabled}`} aria-hidden="true">
              <ArrowRightIcon />
            </span>
          </div>
        )}

        <button
          type="button"
          className={`${styles.card} ${styles.cardSide}`}
          onClick={guardClick(() => setActive(nextIndex))}
          aria-label="다음 슬라이드"
        >
          <SlideThumbnail thumbnail={next.thumbnail} />
        </button>
      </motion.div>

      <div className={styles.pagination}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
            onClick={() => setActive(i)}
            aria-label={`${i + 1}번 슬라이드로 이동`}
            aria-current={i === active}
          />
        ))}
      </div>
    </div>
  );
}
