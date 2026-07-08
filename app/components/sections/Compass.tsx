"use client";

import { motion } from "framer-motion";
import styles from "./Compass.module.css";

const TICK_COUNT = 40;
const MAJOR_STEP = TICK_COUNT / 4;

const TICKS = Array.from({ length: TICK_COUNT }, (_, i) => ({
  angle: (360 / TICK_COUNT) * i,
  isMajor: i % MAJOR_STEP === 0,
  isMid: i % 5 === 0,
}));

export function Compass() {
  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 200 200" className={styles.svg} aria-hidden="true">
        <line x1="100" y1="16" x2="100" y2="184" className={styles.crosshair} />
        <line x1="16" y1="100" x2="184" y2="100" className={styles.crosshair} />

        <motion.g
          style={{ transformOrigin: "100px 100px" }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
        >
          <circle cx="100" cy="100" r="86" className={styles.ring} />
          {TICKS.filter((t) => !t.isMajor).map((t, i) => (
            <line
              key={i}
              x1="100"
              y1="14"
              x2="100"
              y2={t.isMid ? "26" : "21"}
              className={styles.tick}
              transform={`rotate(${t.angle} 100 100)`}
            />
          ))}
          <text x="100" y="38" textAnchor="middle" className={styles.labelMajor}>
            N
          </text>
          <text x="162" y="106" textAnchor="middle" className={styles.label}>
            E
          </text>
          <text x="100" y="170" textAnchor="middle" className={styles.label}>
            S
          </text>
          <text x="38" y="106" textAnchor="middle" className={styles.label}>
            W
          </text>
        </motion.g>

        <line x1="100" y1="18" x2="100" y2="62" className={styles.needle} />
        <polygon points="108,28 128,35 110,40" className={styles.needleFlag} />

        <circle cx="100" cy="100" r="18" className={styles.centerDot} />
      </svg>
      <p className={styles.locating}>Locating…</p>
    </div>
  );
}
