import { Reveal } from "../ui/Reveal";
import styles from "./SkeepExperience.module.css";

const LINES = [
  "사용자의 의도를 앞서 읽고",
  "기기의 경계를 넘어",
  "모든 순간을 매끄럽게 연결하는",
];

function IntentVisual() {
  return (
    <>
      <span className={styles.watermark}>Intent</span>
      <div className={styles.caption}>
        <p>사용자의 목적을 정교하게 추론하여,</p>
        <p>늘 준비된 경험을 보장합니다.</p>
      </div>
    </>
  );
}

function BeyondVisual() {
  return (
    <>
      <span className={`${styles.rect} ${styles.rectA}`} />
      <span className={`${styles.rect} ${styles.rectB}`} />
      <span className={`${styles.rect} ${styles.rectC}`} />
      <div className={styles.caption}>
        <p>하드웨어와 상관없이,</p>
        <p>사용자만을 위한 SKEEP 경험을 제공합니다.</p>
      </div>
    </>
  );
}

function SeamlessVisual() {
  return (
    <>
      <svg
        className={styles.arches}
        viewBox="0 0 400 220"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
      >
        <path
          d="M20 200 C20 100, 110 100, 110 200 C110 100, 200 100, 200 200 C200 100, 290 100, 290 200 C290 100, 380 100, 380 200"
          fill="none"
          stroke="url(#archGradient)"
          strokeWidth="26"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="archGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9aa0ab" />
            <stop offset="50%" stopColor="#d9dce1" />
            <stop offset="100%" stopColor="#7d838d" />
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.caption}>
        <p>매 순간의 경험이 겹쳐져</p>
        <p>다음 사용을 더욱 매끄럽게 연결합니다.</p>
      </div>
    </>
  );
}

const VISUALS = {
  intent: IntentVisual,
  beyond: BeyondVisual,
  seamless: SeamlessVisual,
};

export function SkeepExperience({
  highlightIndex,
  visual,
}: {
  highlightIndex: 0 | 1 | 2;
  visual: keyof typeof VISUALS;
}) {
  const Visual = VISUALS[visual];
  return (
    <section className={styles.section}>
      <Reveal className={styles.textBlock}>
        <p className={styles.eyebrow}>
          Skeep
          <br />
          Experience
        </p>
        <h2 className={styles.heading}>
          {LINES.map((line, i) => (
            <span
              key={line}
              className={i === highlightIndex ? styles.lineActive : styles.lineMuted}
            >
              {line}
            </span>
          ))}
        </h2>
      </Reveal>
      <Reveal delay={0.1} className={styles.box}>
        <Visual />
      </Reveal>
    </section>
  );
}
