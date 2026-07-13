"use client";

import { useState } from "react";
import { Reveal } from "../ui/Reveal";
import styles from "./NegotiationDiagram.module.css";

const LABELS = [
  { index: "01", name: "CNP" },
  { index: "02", name: "DCOP" },
];

function ScaleIcon() {
  return (
    <svg viewBox="0 0 40 40" className={styles.statIcon} aria-hidden="true">
      <circle cx="20" cy="7" r="5.5" fill="currentColor" />
      <circle cx="7" cy="33" r="5.5" fill="currentColor" />
      <circle cx="33" cy="33" r="5.5" fill="currentColor" />
      <path
        d="M20 12.5V20M20 20L7 27.5M20 20L33 27.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

const STEPS = [
  { num: "STEP 1", name: "CFP", desc: ["당신의 목적을", "세상에 알리고"], raised: true, align: "left" as const },
  { num: "STEP 2", name: "Bid", desc: ["가장 스마트한", "파트너를 찾아"], raised: false, align: "right" as const },
  { num: "STEP 3", name: "Award", desc: ["최적의 조건으로", "흐름을 잇는"], raised: false, align: "right" as const },
];

function CnpCard() {
  return (
    <div className={styles.cardInner}>
      <div className={styles.cardText}>
        <h3 className={styles.cardHeading}>
          비우고, 채우고.
          <br />
          당신의 흐름은 멈춤 없이
        </h3>
        <p className={styles.cardSubheading}>CNP : Contract Net Protocol</p>
      </div>
      <div className={styles.cardPanels}>
        <div className={styles.statPanel}>
          <span className={styles.statLabel}>로컬협상 처리율</span>
          <span className={styles.statValue}>90%</span>
          <ScaleIcon />
          <p className={styles.statCaption}>
            중앙 서버의 부하를 덜고
            <br />
            로컬 환경은 더 가볍게.
          </p>
        </div>
        <div className={styles.stepsPanel}>
          {STEPS.map((step) => (
            <div key={step.num} className={step.raised ? `${styles.stepRow} ${styles.stepRowRaised}` : styles.stepRow}>
              <div className={styles.stepLabel}>
                <span className={styles.stepNum}>{step.num}</span>
                <span className={styles.stepName}>{step.name}</span>
              </div>
              <p className={step.align === "right" ? `${styles.stepDesc} ${styles.stepDescRight}` : styles.stepDesc}>
                {step.desc[0]}
                <br />
                {step.desc[1]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CORE_VALUES = [
  { label: "CORE VALUE 1", text: "복잡한 제약 해소" },
  { label: "CORE VALUE 2", text: "전체 이익 극대화" },
  { label: "CORE VALUE 3", text: "자동화된 최적 정답" },
];

function DcopCard() {
  return (
    <div className={styles.cardInner}>
      <div className={styles.cardText}>
        <h3 className={styles.cardHeading}>
          복잡함은 끝
          <br />
          효율은 정점으로
        </h3>
        <p className={styles.cardSubheading}>
          DCOP : Distributed Constraint
          <br />
          Optimization Problem
        </p>
      </div>
      <div className={styles.dcopRight}>
        <div className={styles.interventionPanel}>
          <div className={styles.interventionStat}>
            <span className={styles.statLabel}>사용자 개입 필요성</span>
            <span className={styles.interventionValue}>0</span>
          </div>
          <p className={styles.interventionDesc}>
            사용자가 복잡한 수동설정을 하지 않아도,
            <br />
            알고리즘을 통해 가장 조화로운 결과를 계산합니다.
          </p>
        </div>
        <div className={styles.coreValueRow}>
          {CORE_VALUES.map((value) => (
            <div key={value.label} className={styles.coreValuePanel}>
              <span className={styles.coreValueLabel}>{value.label}</span>
              <span className={styles.coreValueText}>{value.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CARDS = [<CnpCard key="cnp" />, <DcopCard key="dcop" />];

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
              {CARDS[i]}
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
