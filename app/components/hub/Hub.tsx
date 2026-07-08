"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Hub.module.css";

type Slide = {
  href?: string;
};

// Slots 0-1 have real destinations today; the rest are reserved
// placeholders for pages that haven't been built yet.
const SLIDES: Slide[] = [
  { href: "/principles" },
  { href: "/service2" },
  {},
  {},
  {},
  {},
  {},
  {},
];

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

      <div className={styles.stage}>
        <button
          type="button"
          className={`${styles.card} ${styles.cardSide}`}
          onClick={() => setActive(prevIndex)}
          aria-label="이전 슬라이드"
        />

        {current.href ? (
          <Link href={current.href} className={`${styles.card} ${styles.cardCenter}`}>
            <span className={styles.enterButton}>
              <ArrowRightIcon />
            </span>
          </Link>
        ) : (
          <div className={`${styles.card} ${styles.cardCenter}`}>
            <span className={`${styles.enterButton} ${styles.enterButtonDisabled}`} aria-hidden="true">
              <ArrowRightIcon />
            </span>
          </div>
        )}

        <button
          type="button"
          className={`${styles.card} ${styles.cardSide}`}
          onClick={() => setActive(nextIndex)}
          aria-label="다음 슬라이드"
        />
      </div>

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
