"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "linear", duration: 0.5 }}
      key="page"
      className="mx-auto flex w-full max-w-7xl grow flex-col px-6 py-6 md:py-9"
    >
      {children}
    </motion.main>
  );
}
