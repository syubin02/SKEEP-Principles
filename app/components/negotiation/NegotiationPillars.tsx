import { Reveal } from "../ui/Reveal";
import styles from "./NegotiationPillars.module.css";

const PILLARS = [
  {
    title: ["본질만 남긴 채", "SKIP"],
    body: [
      "사용자의 SKEEP은 목적을 이루는 데",
      "필요한 조건만 전달합니다. 사적인 이유나",
      "불필요한 정보는 환경에 남기지 않죠.",
    ],
  },
  {
    title: ["경계를 존중하는", "SKEEP"],
    body: [
      "환경 운영 규칙과 물리적 한계,",
      "사용자가 정한 비용과 정보 공유 범위는",
      "협상하지 않고, 그 안에서 방법을 찾습니다.",
    ],
  },
  {
    title: ["모두의 흐름은", "KEEP"],
    body: [
      "SKEEP은 서로의 조건을 조율해,",
      "공간 안의 사람과 자원, 시간을 살피며",
      "모두의 목적이 이어질 방법을 찾습니다.",
    ],
  },
];

export function NegotiationPillars() {
  return (
    <>
      {PILLARS.map((pillar, i) => (
        <section key={pillar.title.join(" ")} className={styles.section}>
          <Reveal delay={i * 0.05} className={styles.box}>
            <div className={styles.textBlock}>
              <h2 className={styles.heading}>
                {pillar.title.map((line, j) => (
                  <span key={j}>{line}</span>
                ))}
              </h2>
              <p className={styles.body}>
                {pillar.body.map((line, j) => (
                  <span key={j}>{line}</span>
                ))}
              </p>
            </div>
          </Reveal>
        </section>
      ))}
    </>
  );
}
