import { Reveal } from "../ui/Reveal";
import styles from "./StatementBlock.module.css";

export function StatementBlock({
  heading,
  body,
  background = "#e7eaf0",
  video,
  image,
}: {
  heading: string[];
  body?: string[];
  background?: string;
  video?: string;
  image?: string;
}) {
  const hasMedia = Boolean(video || image);
  return (
    <section
      className={styles.section}
      style={{ background: hasMedia ? undefined : background }}
    >
      {video && (
        <>
          <video className={styles.video} src={video} autoPlay muted loop playsInline />
          <div className={styles.scrim} />
        </>
      )}
      {!video && image && <img className={styles.video} src={image} alt="" />}
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
