"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import styles from "./FeaturePillar.module.css";

export type FeaturePillarProps = {
  eyebrow: string;
  heading: string;
  body: string;
  questions: { label: string; text: string; answer?: string }[];
};

function QuestionCard({
  label,
  text,
  answer,
  delay,
}: {
  label: string;
  text: string;
  answer?: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const expanded = Boolean(answer) && (hovered || clicked);

  return (
    <Reveal delay={delay}>
      <div
        className={styles.question}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setClicked((c) => !c)}
      >
        <span className={styles.qLabel}>{label}</span>
        <p className={styles.qText}>{text}</p>
        {answer && (
          <motion.div
            className={styles.answer}
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.aLabel}>A.</span>
            <p className={styles.aText}>{answer}</p>
          </motion.div>
        )}
      </div>
    </Reveal>
  );
}

export function FeaturePillar({ eyebrow, heading, body, questions }: FeaturePillarProps) {
  return (
    <section className={styles.section}>
      <Reveal>
        <p className={styles.eyebrow}>{eyebrow}</p>
      </Reveal>
      <div className={styles.headerRow}>
        <Reveal delay={0.05}>
          <h2 className={styles.heading}>{heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={styles.body}>{body}</p>
        </Reveal>
      </div>
      <div className={styles.questions}>
        {questions.map((q, i) => (
          <QuestionCard
            key={q.label}
            label={q.label}
            text={q.text}
            answer={q.answer}
            delay={0.1 + i * 0.08}
          />
        ))}
      </div>
    </section>
  );
}
