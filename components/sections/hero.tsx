"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ease } from "@/components/motion";
import { cn, wrap } from "@/lib/utils";

const START = 1.3; // matches the Preloader duration

export function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const { scrollY } = useScroll();
  const bgX = useTransform(sx, (v) => v * -28);
  const bgY = useTransform([sy, scrollY], ([a, b]: number[]) => a * -18 + b * 0.12);
  const cardX = useTransform(sx, (v) => v * 14);
  const cardY = useTransform(sy, (v) => v * 9);

  const fade = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: START + d, ease } };

  const line = (text: string, d: number, italic = false) => (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className={cn("inline-block", italic && "italic")}
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: START + d, ease }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section aria-labelledby="hero-title" className={cn(wrap, "pt-2")}>
      <div
        className="relative isolate flex min-h-[min(540px,85svh)] items-center justify-center overflow-hidden rounded-[2rem] bg-brand-mint px-4 sm:min-h-[560px] md:aspect-video md:min-h-[560px]"
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => { mx.set(0); my.set(0); }}
      >
        <motion.div style={reduce ? undefined : { x: bgX, y: bgY, scale: 1.1 }} className="absolute inset-0 -z-10">
          <Image
            src="/images/hero.jpg"
            alt="Eco-friendly cleaning supplies — sponges, brush, spray bottle and soap dispenser on a soft mint background"
            fill
            priority
            sizes="(min-width:1280px) 1180px, 100vw"
            className="animate-kenburns origin-bottom object-cover object-[65%_100%] sm:object-[60%_100%] md:object-bottom"
          />
        </motion.div>

        {[["20%", "0s", "size-3"], ["55%", "-3s", "size-5"], ["80%", "-6s", "size-2.5"]].map(([left, delay, size]) => (
          <span key={left} aria-hidden className={cn("absolute bottom-0 animate-rise rounded-full bg-white/40", size)} style={{ left, animationDelay: delay }} />
        ))}

        <motion.div
          style={reduce ? undefined : { x: cardX, y: cardY }}
          className="relative h-fit w-full max-w-[560px] rounded-[1.5rem] border border-white/50 bg-white/30 px-6 pb-6 pt-6 text-center text-[#1c1d1f] shadow-[0_20px_50px_rgba(47,107,58,.16)] backdrop-blur-xl"
        >
          <motion.p {...fade(0)} className="mb-3 flex items-center justify-center gap-2 text-[.85rem] font-medium text-[#3d4a40]">
            <Sparkles className="size-4" /> Go-to cleaners
          </motion.p>
          <h1 id="hero-title" className="whitespace-nowrap text-[clamp(1.6rem,8vw,3.2rem)] leading-[1.05]">
            {line("EXPERT", 0.1)}
            {line("CLEANING", 0.3, true)}
          </h1>
          <motion.p {...fade(0.7)} className="mx-auto mb-6 mt-4 max-w-[34ch] text-[1.05rem] text-[#2f3b32]">
            Creating cleaner, healthier spaces so you can focus on what matters and relax on the weekends.
          </motion.p>
          <motion.div {...fade(0.9)}>
            <Button asChild className="bg-white/80"><a href="#services">Explore</a></Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
