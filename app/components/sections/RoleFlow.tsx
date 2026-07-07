import { Reveal } from "../ui/Reveal";
import styles from "./RoleFlow.module.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function RoleFlow() {
  return (
    <section className={styles.section}>
      <Reveal
        className={styles.box}
        style={{ backgroundImage: `url(${BASE_PATH}/roleflow/bg.jpg)` }}
      >
        <div className={styles.textLayer}>
          <p className={styles.heading}>
            각자의 역할을 모아
            <br />
            하나의 흐름으로
          </p>
          <p className={styles.body}>
            SKEEP은 연결된 환경의 능력을 읽고,
            <br />각 환경이 가장 잘할 수 있는 일을
            <br />
            선별해 맡깁니다.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
