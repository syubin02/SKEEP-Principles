import { Reveal } from "../ui/Reveal";
import styles from "./StatementBlock.module.css";

export function StatementBlock({
  heading,
  body,
  background = "#e7eaf0",
}: {
  heading: string[];
  body?: string[];
  background?: string;
}) {
  return (
    <section className={styles.section} style={{ background }}>
      <Reveal className={styles.textBlock}>
        <h2 className={styles.heading}>
          {heading.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h2>
        {body && (
          <p className={styles.body}>
            {body.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </p>
        )}
      </Reveal>
    </section>
  );
}
