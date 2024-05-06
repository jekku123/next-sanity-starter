"use client";
import { TracingBeam } from "@/components/tracing-beam";
import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, x: "100%", y: 0 },
  animate: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: "-100%", y: 0 },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "linear", duration: 0.5 }}
      key="page"
    >
      <TracingBeam>{children}</TracingBeam>
    </motion.main>
  );
}
