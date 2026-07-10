"use client";

import { useState } from "react";
import { Reveal } from "../ui/Reveal";
import styles from "./EnvironmentLayers.module.css";

const LAYERS = [
  {
    title: "주력 환경",
    subtitle: "Passive Layer",
    body: "사용자가 현재 상호작용하고 있는 환경입니다. 여러 환경이 동시에 주력이 될 수 있으며, 그 중 사용자가 직접 조작하는 접점에는 SKEEP의 상태와 인터페이스가 나타납니다.",
  },
  {
    title: "앵커 환경",
    subtitle: "Active Layer",
    body: "사용자가 소유한 환경을 앵커 환경으로 지정하면, 환경에 SKEEP을 부여해 사용자의 규칙을 설정하고 관리할 수 있습니다. 사용자가 곁에 없더라도 결제 한도, 접근 권한처럼 내가 정한 기준 안에서 SKEEP이 필요한 일을 이어갑니다.",
  },
];

export function EnvironmentLayers() {
  const [active, setActive] = useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {LAYERS.map((layer, i) => (
          <Reveal key={layer.title} delay={i * 0.08} className={styles.reveal}>
            <div
              className={`${styles.card} ${i === active ? styles.cardActive : styles.cardDim}`}
              onMouseEnter={() => setActive(i)}
            >
              <div className={styles.titleGroup}>
                <p className={styles.title}>{layer.title}</p>
                <p className={styles.subtitle}>{layer.subtitle}</p>
              </div>
              <p className={styles.body}>{layer.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
