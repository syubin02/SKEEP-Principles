"use client";

import { useState } from "react";
import { Reveal } from "../ui/Reveal";
import styles from "./NegotiationDiagram.module.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const LABELS = [
  { index: "01", name: "CNP", src: `${BASE_PATH}/negotiation/cnp.png`, alt: "CNP : Contract Net Protocol" },
  {
    index: "02",
    name: "DCOP",
    src: `${BASE_PATH}/negotiation/dcop.png`,
    alt: "DCOP : Distributed Constraint Optimization Problem",
  },
];

export function NegotiationDiagram() {
  const [active, setActive] = useState(0);

  return (
    <section id="negotiation-diagram" className={styles.section}>
      <Reveal className={styles.header}>
        <h2 className={styles.heading}>
          협상을 완성하는
          <br />
          두 가지 규칙
        </h2>
        <p className={styles.body}>
          CNP를 협상의 대화 규칙으로 사용하며, DCOP으로 전체 조합을
          계산합니다. 아래 버튼을 눌러 각 규칙의 역할을 확인해 보세요.
        </p>
      </Reveal>
      <Reveal delay={0.1} className={styles.diagramWrap}>
        <div className={styles.diagram}>
          {LABELS.map((label, i) => (
            <div key={label.name} className={styles.diagramLayer} style={{ opacity: active === i ? 1 : 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.diagramImage} src={label.src} alt={label.alt} />
            </div>
          ))}
        </div>
        <div className={styles.labelRow}>
          {LABELS.map((label, i) => (
            <button
              key={label.name}
              type="button"
              className={i === active ? `${styles.labelCard} ${styles.labelCardRaised}` : styles.labelCard}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
            >
              <span className={styles.labelIndex}>{label.index}</span>
              <span className={styles.labelName}>{label.name}</span>
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
