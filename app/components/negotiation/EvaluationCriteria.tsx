import { Reveal } from "../ui/Reveal";
import styles from "./EvaluationCriteria.module.css";

const CRITERIA = [
  { index: "01", en: "Urgency", ko: "긴급도" },
  { index: "02", en: "Impact", ko: "영향 범위" },
  { index: "03", en: "Duration", ko: "사용 시간" },
  { index: "04", en: "Options", ko: "대체 가능성" },
];

export function EvaluationCriteria() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.textBlock}>
        <h2 className={styles.heading}>
          더 나은 조율을 위한
          <br />
          4가지 섬세한 시선
        </h2>
        <p className={styles.body}>
          SKEEP은 사용자의 사적인 이유나 목적의 가치를 판단하지 않습니다.
          대신 목적을 이어가기 위해 필요한 시간과 자원, 대체 수단만 살펴
          서로의 조건을 조율하죠.
        </p>
        <p className={styles.note}>
          긴급도는 조정 여부에 따라 사용자의 목적 경험이 얼마나 빨리
          실패하는가를 측정하는 기준입니다. 단, 환경 소유자의 환경 규제나
          원칙에 따라 긴급도 평가 요건이 달라질 수 있습니다.
        </p>
      </div>
      <div className={styles.visualColumn}>
        {CRITERIA.map((c, i) => (
          <Reveal key={c.en} delay={i * 0.08} className={styles.card}>
            <span className={styles.cardIndex}>{c.index}</span>
            <p className={styles.cardName}>
              {c.en}
              <span className={styles.cardKo}>{c.ko}</span>
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
