"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUpIcon } from "lucide-react";
import { useState } from "react";

export function ScrollTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.9) {
      setPulse(true);
    } else {
      setPulse(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial="closed"
          animate={visible ? "open" : "closed"}
          exit="closed"
          transition={{ duration: 0.5 }}
          variants={{
            open: { opacity: 1, scale: 1 },
            closed: { opacity: 0, scale: 0 },
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-14 right-7 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl sm:right-14",
            pulse && "animate-pulse",
          )}
          data-test-id="scroll-top"
        >
          <ArrowUpIcon size="20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
