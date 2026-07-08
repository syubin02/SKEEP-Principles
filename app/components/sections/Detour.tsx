import { Compass } from "./Compass";
import { Reveal } from "../ui/Reveal";
import styles from "./Detour.module.css";

export function Detour() {
  return (
    <section className={styles.section}>
      <Compass />
      <Reveal className={styles.textBlock} y={24}>
        <h2 className={styles.heading}>
          우회하는 것 또한
          <br />
          여정의 일부
        </h2>
        <p className={styles.body}>
          목적을 향한 길은 언제나 열려 있습니다. SKEEP은 변화하는 환경 속에서도,
          <br />
          당신의 의도를 끝까지 완수할 대안을 제시합니다.
        </p>
      </Reveal>
    </section>
  );
}
