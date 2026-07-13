import { Reveal } from "../ui/Reveal";
import styles from "./AnchorEnvironment.module.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function AnchorEnvironment() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.textBlock}>
        <h2 className={styles.heading}>
          앵커환경
          <br />: Active Layer
        </h2>
        <p className={styles.body}>
          사용자가 소유한 환경을 앵커 환경으로 지정하면,
          <br />
          환경에 SKEEP을 부여해 사용자의 규칙을 설정하고 관리할 수 있습니다.
          <br />
          내가 만약 카페 사장님이라면, 공간을 SKEEP해두면 카페를 떠나도 나
          대신 SKEEP이 필요한 일을 이어갑니다.
        </p>
      </Reveal>
      <Reveal delay={0.1} className={styles.box}>
        <video
          className={styles.boxVideo}
          src={`${BASE_PATH}/negotiation/anchor-environment.mp4`}
          autoPlay
          muted
          loop
          playsInline
        />
      </Reveal>
    </section>
  );
}
