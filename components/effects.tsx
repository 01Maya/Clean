"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/** Mint curtain with the logo; lifts after 1.3s (hero entrance is timed to this). */
export function Preloader() {
  const [show, setShow] = useState(true);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) { setShow(false); return; }
    const t = setTimeout(() => setShow(false), 1300);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[200] grid place-items-center bg-brand-mint"
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.7, 0, 0.2, 1] } }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: ".8em" }}
            animate={{ opacity: 1, letterSpacing: ".3em" }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(1.6rem,5vw,2.4rem)] font-semibold"
          >
            CLEAN
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[120] h-[3px] origin-left bg-gradient-to-r from-brand-sage to-brand-blue" />;
}

export function BackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 600));
  return (
    <button
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: reduceMotion ? "instant" : "smooth",
        })
      }
      className={cn(
        "fixed bottom-5 right-4 z-40 grid size-12 place-items-center rounded-full bg-foreground text-background shadow-lg transition-all duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring",
        show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
