import { ParallaxLayer } from "../ui/ParallaxLayer";
import { Reveal } from "../ui/Reveal";
import styles from "./IcebreakSkip.module.css";

type LinePart =
  | { type: "dim"; text: string }
  | { type: "highlight"; emoji: string; text: string };

const NOISE_LINES: LinePart[][] = [
  [
    { type: "dim", text: "서 " },
    { type: "highlight", emoji: "🚕", text: "택시를 탈 때도" },
    { type: "dim", text: " 나 지금 빨리 우리대학" },
  ],
  [
    { type: "dim", text: "갰고 내가 원하는건 " },
    { type: "highlight", emoji: "🧳", text: "여행을 갈 때도" },
  ],
  [{ type: "dim", text: "시험공부하려고 왔으니까 음악은 잔잔한" }],
  [
    { type: "dim", text: "뉴는 " },
    { type: "highlight", emoji: "☕", text: "카페에서도" },
    { type: "dim", text: " 내가 평소에 좋아하" },
  ],
];

function NoiseLine({ parts }: { parts: LinePart[] }) {
  return (
    <p className={styles.noiseLine}>
      {parts.map((part, i) =>
        part.type === "dim" ? (
          <span key={i} className={styles.dim}>
            {part.text}
          </span>
        ) : (
          <span key={i} className={styles.highlight}>
            <span className={styles.noiseEmoji}>{part.emoji}</span>
            <strong>{part.text}</strong>
          </span>
        )
      )}
    </p>
  );
}

function SkipIcon() {
  return (
    <svg
      className={styles.skipIcon}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="12" fill="#DCEEFC" />
      <polygon points="7.2,8.2 7.2,15.8 12.8,12" fill="#85CBFA" />
      <polygon points="12.4,8.2 12.4,15.8 18,12" fill="#85CBFA" />
    </svg>
  );
}

export function IcebreakSkip() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.textBlock}>
        <h2 className={styles.heading}>
          반복되는
          <br />
          아이스브레이킹은
          <br />
          스킵
          <SkipIcon />
        </h2>
        <p className={styles.body}>
          낯선 환경과의 첫인사는 SKEEP이 맡고, 사용자는 반복된 자기소개 대신
          하려던 일을 바로 시작할 수 있습니다.
        </p>
      </Reveal>
      <Reveal delay={0.15} className={styles.visual}>
        <ParallaxLayer strength={30}>
          <div className={styles.noise}>
            {NOISE_LINES.map((parts, i) => (
              <NoiseLine key={i} parts={parts} />
            ))}
          </div>
        </ParallaxLayer>
      </Reveal>
    </section>
  );
}
