import { Reveal } from "../ui/Reveal";
import styles from "./TodayStandard.module.css";

export function TodayStandard() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.textBlock}>
        <h2 className={styles.heading}>
          오늘의 경험이
          <br />
          내일의 기준으로
        </h2>
        <p className={styles.body}>
          사용자가 환경과 나누는 모든 상호작용은 사용자를 더 깊이 이해하기
          위한 언어가 됩니다. 이를 통해 사용자의 다음 경험을 더 완벽히
          완성하죠.
        </p>
      </Reveal>
      <Reveal delay={0.1} className={styles.box} />
    </section>
  );
}
