"use client";

import { cn } from "@/lib/utils";
import { MenuItem } from "@/lib/zod/menu";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { useState } from "react";
import AuthGateClient from "./auth/auth-gate-client";

const variants = {
  open: {
    transition: {
      staggerChildren: 0.05,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};

interface MobileMenuProps {
  className?: string;
  menu: MenuItem[];
}

export function MobileMenu({ className, menu }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("z-50", className)}>
      <button
        className="z-50"
        aria-label="menu-toggle"
        onClick={() => setOpen((prev) => !prev)}
        data-test-id="mobile-menu-toggle"
      >
        <svg width="23" height="23" viewBox="0 0 23 23">
          <motion.path
            strokeWidth="3"
            stroke="currentColor"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
            animate={open ? "open" : "closed"}
          />
          <motion.path
            strokeWidth="3"
            stroke="currentColor"
            strokeLinecap="round"
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            animate={open ? "open" : "closed"}
          />
          <motion.path
            strokeWidth="3"
            stroke="currentColor"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
            animate={open ? "open" : "closed"}
          />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial="closed"
            animate={open ? "open" : "closed"}
            exit="closed"
            transition={{ duration: 0.5 }}
            variants={{
              open: { opacity: 1, scale: 1 },
              closed: { opacity: 0, scale: 1 },
            }}
            className="absolute left-0 top-0 z-40 h-screen w-full bg-background"
            data-test-id="mobile-menu"
          >
            <motion.div
              className="flex h-full w-full flex-col items-center justify-center gap-5"
              variants={variants}
            >
              {menu.map((item) => (
                <AuthGateClient key={item._key} isProtected={item.isProtected}>
                  <div
                    className="flex flex-col items-center gap-4"
                    onClick={() => setOpen(false)}
                  >
                    <motion.div
                      className="hover:text-primary-accent text-3xl"
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </motion.div>
                  </div>
                </AuthGateClient>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
