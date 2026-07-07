import { ParallaxLayer } from "../ui/ParallaxLayer";
import { Reveal } from "../ui/Reveal";
import styles from "./IcebreakSkip.module.css";

const NOISE_LINES = [
  "서 <b>택시를 탈 때도</b> 나 지금 빨리 우리대학",
  "겼고 내가 원하는건 <b>여행을 갈 때도</b> 내 호",
  "려고 왔으니까 음악은 잔잔한걸로 <b>카페에서도</b> 내 결",
  "기에 맞는 옷으로 <b>쇼핑을 하면서</b> 브",
];

function NoiseLine({ text }: { text: string }) {
  const parts = text.split(/<b>|<\/b>/);
  return (
    <p className={styles.noiseLine}>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
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
            {NOISE_LINES.map((line) => (
              <NoiseLine key={line} text={line} />
            ))}
          </div>
        </ParallaxLayer>
      </Reveal>
    </section>
  );
}
