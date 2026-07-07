"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./RoleFlow.module.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function RoleFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 55%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className={styles.section}>
      <motion.div
        ref={ref}
        className={styles.box}
        style={{
          backgroundImage: `url(${BASE_PATH}/roleflow/bg.jpg)`,
          y,
          opacity,
        }}
      >
        <div className={styles.textLayer}>
          <p className={styles.heading}>
            각자의 역할을 모아
            <br />
            하나의 흐름으로
          </p>
          <p className={styles.body}>
            SKEEP은 연결된 환경의 능력을 읽고,
            <br />각 환경이 가장 잘할 수 있는 일을
            <br />
            선별해 맡깁니다.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
