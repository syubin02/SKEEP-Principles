import { Reveal } from "../ui/Reveal";
import styles from "./ImageTextCard.module.css";

export function ImageTextCard() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.box}>
        <div className={styles.textLayer}>
          <p className={styles.heading}>
            작별은 곧
            <br />
            완벽한 다음의 시작
          </p>
          <p className={styles.body}>
            사용자의 맥락은 SKEEP 클라우드에
            <br />
            안전히 보관되어, 다음 환경을 만나는
            <br />
            즉시 매끄럽게 이어집니다.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
