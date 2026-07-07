import { Reveal } from "../ui/Reveal";
import styles from "./FeaturePillar.module.css";

export type FeaturePillarProps = {
  eyebrow: string;
  heading: string;
  body: string;
  questions: { label: string; text: string }[];
};

export function FeaturePillar({ eyebrow, heading, body, questions }: FeaturePillarProps) {
  return (
    <section className={styles.section}>
      <Reveal>
        <p className={styles.eyebrow}>{eyebrow}</p>
      </Reveal>
      <div className={styles.headerRow}>
        <Reveal delay={0.05}>
          <h2 className={styles.heading}>{heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={styles.body}>{body}</p>
        </Reveal>
      </div>
      <div className={styles.questions}>
        {questions.map((q, i) => (
          <Reveal key={q.label} delay={0.1 + i * 0.08}>
            <div className={styles.question}>
              <span className={styles.qLabel}>{q.label}</span>
              <p className={styles.qText}>{q.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
