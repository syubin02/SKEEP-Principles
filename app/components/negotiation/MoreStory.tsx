"use client";

import { useState } from "react";
import { Reveal } from "../ui/Reveal";
import { FlowChartModal } from "./FlowChartModal";
import styles from "./MoreStory.module.css";

export function MoreStory() {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.section}>
      <Reveal>
        <button type="button" className={styles.pill} onClick={() => setOpen(true)}>
          협상에 대한 더 자세한 이야기
        </button>
      </Reveal>
      <FlowChartModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
