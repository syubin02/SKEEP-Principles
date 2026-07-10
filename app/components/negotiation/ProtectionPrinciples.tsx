import { Reveal } from "../ui/Reveal";
import styles from "./ProtectionPrinciples.module.css";

const CARDS = [
  {
    title: "Continuity",
    body: "사용자가 불가피하게 공간을 이동하거나, 시간을 조정하거나, 자원을 양보한 경우에는 그 다음 조정으로부터 일정 기간 보호받습니다.",
  },
  {
    title: "Exception",
    body: "안전, 접근성, 시설 장애와 같은 예외적 긴급 상황에서는 보호 원칙이 재검토될 수 있습니다.",
  },
  {
    title: "Escalation",
    body: "다른 대안이 모두 실패한 경우 최소한의 범위에서 재협상을 진행하며, 재협상도 실패하면 사용자에게 상황을 알리고 선택권을 넘깁니다.",
  },
];

export function ProtectionPrinciples() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.header}>
        <h2 className={styles.heading}>경험이 멈추지 않도록</h2>
        <p className={styles.body}>
          SKEEP은 사용자가 이미 시작한 목적 경험을 보호합니다. 만약
          불가피하게 환경을 조정했다면, 다음 협상에서는 그 경험이 다시
          흔들리지 않도록 일정 기간 흐름을 보호하죠.
        </p>
      </Reveal>
      <div className={styles.cards}>
        {CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.08} className={styles.card}>
            <div className={styles.cardImage} />
            <div className={styles.cardText}>
              <p className={styles.cardTitle}>{card.title}</p>
              <p className={styles.cardBody}>{card.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
