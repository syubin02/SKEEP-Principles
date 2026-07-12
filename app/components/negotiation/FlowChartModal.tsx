"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import styles from "./FlowChartModal.module.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.closeIcon} aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FlowChartModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
        >
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className={styles.header}>
              <p className={styles.title}>협상 프로세스 흐름</p>
              <button type="button" className={styles.closeButton} onClick={onClose} aria-label="닫기">
                <CloseIcon />
              </button>
            </header>
            <div className={styles.scrollArea}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.flowImage}
                src={`${BASE_PATH}/negotiation/flow-chart.png`}
                alt="협상 프로세스 흐름도"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
