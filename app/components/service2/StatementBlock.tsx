import { Reveal } from "../ui/Reveal";
import styles from "./StatementBlock.module.css";

export function StatementBlock({
  heading,
  body,
  background = "#e7eaf0",
  video,
}: {
  heading: string[];
  body?: string[];
  background?: string;
  video?: string;
}) {
  return (
    <section
      className={styles.section}
      style={{ background: video ? undefined : background }}
    >
      {video && (
        <>
          <video className={styles.video} src={video} autoPlay muted loop playsInline />
          <div className={styles.scrim} />
        </>
      )}
      <Reveal className={styles.textBlock}>
        <h2 className={`${styles.heading} ${video ? styles.headingOnVideo : ""}`}>
          {heading.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h2>
        {body && (
          <p className={`${styles.body} ${video ? styles.bodyOnVideo : ""}`}>
            {body.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </p>
        )}
      </Reveal>
    </section>
  );
}
