import { ParallaxLayer } from "../ui/ParallaxLayer";
import { Reveal } from "../ui/Reveal";
import styles from "./EnvironmentCollage.module.css";

const CHIPS = [
  { top: "6%", left: "14%", size: 96, color: "#1c1c1e", strength: 40, rotate: -8 },
  { top: "10%", left: "42%", size: 64, color: "#ffd23f", strength: 60, rotate: 6 },
  { top: "8%", left: "68%", size: 72, color: "#ffe066", strength: 30, rotate: -4 },
  { top: "68%", left: "10%", size: 80, color: "#8fd1ff", strength: 50, rotate: 10 },
  { top: "72%", left: "46%", size: 56, color: "#ffb4c6", strength: 35, rotate: -6 },
  { top: "66%", left: "72%", size: 88, color: "#f3a24c", strength: 55, rotate: 8 },
];

export function EnvironmentCollage() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.box} y={24}>
        {CHIPS.map((chip, i) => (
          <ParallaxLayer key={i} strength={chip.strength}>
            <div
              className={styles.chip}
              style={{
                top: chip.top,
                left: chip.left,
                width: chip.size,
                height: chip.size,
                background: chip.color,
                transform: `rotate(${chip.rotate}deg)`,
                opacity: 0.5,
              }}
            />
          </ParallaxLayer>
        ))}
        <div className={styles.center}>
          <p className={styles.eyebrow}>Standards</p>
          <h2 className={styles.heading}>
            어떤 환경에서도
            <br />
            사용자를 기준으로
          </h2>
          <p className={styles.body}>
            결제 한도, 정보 공유 범위, 제어 권한까지.
            <br />
            SKEEP은 환경이 바뀌어도, 사용자의 기준 안에서만 움직입니다.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
