"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FlowChartModal } from "./FlowChartModal";
import styles from "./MoreStory.module.css";

export function MoreStory() {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.section}>
      <motion.button
        type="button"
        className={styles.pill}
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.3 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: "spring", stiffness: 260, damping: 14, mass: 0.9 }}
      >
        협상에 대한 더 자세한 이야기
      </motion.button>
      <FlowChartModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
