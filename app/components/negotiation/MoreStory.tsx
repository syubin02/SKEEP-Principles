import { Reveal } from "../ui/Reveal";
import styles from "./MoreStory.module.css";

export function MoreStory() {
  return (
    <section className={styles.section}>
      <Reveal>
        <a href="#negotiation-diagram" className={styles.pill}>
          협상에 대한 더 자세한 이야기
        </a>
      </Reveal>
    </section>
  );
}
