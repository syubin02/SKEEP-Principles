import { ParallaxLayer } from "../ui/ParallaxLayer";
import { Reveal } from "../ui/Reveal";
import styles from "./IcebreakSkip.module.css";

const NOISE_ITEMS = [
  { emoji: "🚕", text: "택시를 탈 때도", top: "14.5%", left: "5.8%" },
  { emoji: "🧳", text: "여행을 갈 때도", top: "36.3%", left: "47.6%" },
  { emoji: "☕", text: "카페에서도", top: "76.6%", left: "11.6%" },
];

function NoiseItem({ emoji, text, top, left }: (typeof NOISE_ITEMS)[number]) {
  return (
    <p className={styles.noiseLine} style={{ top, left }}>
      <span className={styles.noiseEmoji}>{emoji}</span>
      <strong>{text}</strong>
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
            {NOISE_ITEMS.map((item) => (
              <NoiseItem key={item.text} {...item} />
            ))}
          </div>
        </ParallaxLayer>
      </Reveal>
    </section>
  );
}
