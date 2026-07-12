import { Reveal } from "../ui/Reveal";
import styles from "./GrowthCycle.module.css";

const CARDS = [
  {
    title: "Learning",
    body: ["사용자의 취향과 맥락을 기록하며", "더 깊이 알아갑니다."],
    variant: "learning",
  },
  {
    title: "Syncing",
    body: ["상호작용 속에서 사용자의 맥락은", "스스로 최적화됩니다."],
    variant: "syncing",
  },
  {
    title: "Refining",
    body: ["피드백은 바로 반영되어", "다음 만남부터 기준이 우선 적용됩니다."],
    variant: "refining",
  },
] as const;

// Deterministic PRNG so the generated patterns below are identical between
// server and client render (avoids a hydration mismatch from Math.random).
function mulberry32(seed: number) {
  let state = seed;
  return function random() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function LearningVisual() {
  const rand = mulberry32(7);
  const rows = Array.from({ length: 12 }, () => {
    const segmentCount = rand() > 0.35 ? 1 : 2;
    return Array.from({ length: segmentCount }, () => ({
      width: 24 + rand() * 26,
      alignRight: rand() > 0.5,
    }));
  });
  return (
    <div className={styles.learningVisual}>
      {rows.map((segments, i) => (
        <div key={i} className={styles.barRow}>
          {segments.map((seg, j) => (
            <span
              key={j}
              className={styles.bar}
              style={{ width: `${seg.width}%`, [seg.alignRight ? "right" : "left"]: 0 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function SyncingVisual() {
  return <div className={styles.syncingVisual} />;
}

function RefiningVisual() {
  const rand = mulberry32(21);
  const bars = Array.from({ length: 26 }, () => ({
    color: rand() < 0.14 ? "#ff3385" : "#69c9ff",
    height: 35 + rand() * 60,
  }));
  return (
    <div className={styles.refiningVisual}>
      {bars.map((bar, i) => (
        <span key={i} className={styles.eqBar} style={{ height: `${bar.height}%`, background: bar.color }} />
      ))}
    </div>
  );
}

const VISUALS = {
  learning: LearningVisual,
  syncing: SyncingVisual,
  refining: RefiningVisual,
};

export function GrowthCycle() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.header}>
        <h2 className={styles.heading}>
          설명하지 않아도
          <br />
          알아서 척척.
        </h2>
        <p className={styles.body}>
          사용자와 SKEEP이 함께한 시간만큼 서로가 익숙해집니다.
          <br />
          복잡한 설명 없이도, 내 맥락을 이해하고 매끄럽게 준비된 환경을
          마주해보세요!
        </p>
      </Reveal>
      <div className={styles.cards}>
        {CARDS.map((card, i) => {
          const Visual = VISUALS[card.variant];
          return (
            <Reveal key={card.title} delay={i * 0.1} className={styles.card}>
              <div className={styles.visual}>
                <Visual />
              </div>
              <div className={styles.cardText}>
                <p className={styles.cardTitle}>{card.title}</p>
                <p className={styles.cardBody}>
                  {card.body.map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < card.body.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
