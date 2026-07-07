"use client";

import { motion } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import styles from "./CTA.module.css";

export function CTA() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.textBlock}>
        <h2 className={styles.heading}>
          멈춘 곳에서 다시,
          <br />
          이어서 SKEEP하기
        </h2>
        <p className={styles.body}>
          지금의 환경에서 끝내지 못한 일은 패킷에 남아 다음 환경으로 함께
          이동합니다. 이어갈 수 있는 환경을 만나면, SKEEP은 자연스럽게 남은
          흐름을 다시 이어가죠!
        </p>
      </Reveal>
      <Reveal delay={0.15} className={styles.visual}>
        <motion.button
          className={styles.button}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="SKEEP 이어가기"
        >
          →
        </motion.button>
      </Reveal>
    </section>
  );
}
