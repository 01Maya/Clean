"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import {
  CountUp,
  ImageReveal,
  Reveal,
  Tilt,
} from "@/components/motion";
import { pro, stats } from "@/lib/data";
import { cn, wrap } from "@/lib/utils";

export function About() {
  const [activePoint, setActivePoint] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActivePoint((current) => (current + 1) % pro.points.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative mx-[min(4%,40px)] mt-8 overflow-hidden rounded-[2rem] bg-brand-mint pb-24 pt-28 md:pb-28 md:pt-36"
    >
      {/* Decorative wave */}
      <svg
        aria-hidden="true"
        className="absolute -top-px left-0 h-[70px] w-[200%] animate-slide"
        viewBox="0 0 2880 70"
        preserveAspectRatio="none"
      >
        <path
          className="fill-background"
          d="M0 0H2880C2700 0 2700 55 2520 55S2340 0 2160 0 1980 55 1800 55 1620 0 1440 0 1260 55 1080 55 900 0 720 0 540 55 360 55 180 0 0 0Z"
        />
      </svg>

      <div className={wrap}>
        <h2 id="about-title" className="sr-only">
          About CLEAN
        </h2>

        {/* Statistics */}
        <Reveal>
          <ul className="mb-16 flex justify-around gap-4 text-center md:mb-24">
            {stats.map((s) => (
              <li key={s.label}>
<b className="flex items-baseline justify-center text-[clamp(3rem,8vw,5rem)] font-light leading-none">
  <CountUp
    value={s.value}
    decimals={s.decimals}
  />
  {s.suffix && (
    <span className="ml-0.5 text-[0.45em] leading-none">
      {s.suffix}
    </span>
  )}
</b>

                <span className="mt-2 block text-xs text-foreground/70 sm:text-base">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* About content */}
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <Reveal className="text-center md:text-left">
            {/* Consistent section label */}
            <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
              <span className="h-px w-7 bg-foreground/30" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70">
                {pro.tag}
              </span>

              <span className="h-px w-7 bg-foreground/30" />
            </div>

            <h3 className="mx-auto max-w-[18ch] text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1.12] tracking-tight md:mx-0 md:max-w-none">
              Professional Cleaning For Every{" "}
              <em className="font-light text-muted-foreground">Occasion</em>
            </h3>

            <p className="mx-auto mb-7 mt-4 max-w-[46ch] text-base leading-7 text-foreground/80 md:mx-0">
              {pro.text}
            </p>

            {/* Minimal feature points — no boxes or hover backgrounds */}
            <ul className="grid gap-5 text-left">
              {pro.points.map((p, index) => {
                const isActive = activePoint === index;

                return (
                  <li key={p.title}>
                    <motion.button
                      type="button"
                      onClick={() => setActivePoint(index)}
                      aria-pressed={isActive}
                      whileHover={reduceMotion ? undefined : { y: -3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className={cn(
                        "group flex w-full items-start gap-3 p-0 text-left",
                        "transition-opacity duration-300",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#397a40] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-mint",
                        "motion-reduce:transition-none",
                        isActive
                          ? "opacity-100"
                          : "opacity-75 hover:opacity-100"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-1 grid size-5 shrink-0 place-items-center rounded-full",
                          "transition-colors duration-300 motion-reduce:transition-none",
                          isActive
                            ? "bg-foreground text-background"
                            : "border border-foreground/40 text-foreground"
                        )}
                      >
                        <Check className="size-3" />
                      </span>

                      <span className="text-base leading-6">
                        <span className="font-medium">
                          {p.title}
                        </span>

                        {p.text && (
                          <small className="mt-1 block text-sm leading-6 text-foreground/75">
                            {p.text}
                          </small>
                        )}
                      </span>
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Image */}
          <Reveal delay={0.15}>
            <Tilt className="group relative mx-auto aspect-[1/1.1] w-full max-w-[460px] overflow-hidden rounded-[1.5rem] bg-muted">
              <ImageReveal className="absolute inset-0">
                <Image
                  src="/images/glove.jpg"
                  alt="Hand in a yellow rubber cleaning glove making a peace sign on a blue background"
                  fill
                  sizes="(min-width:768px) 460px, 92vw"
                  className="object-cover object-[50%_20%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07] motion-reduce:transform-none motion-reduce:transition-none"
                />
              </ImageReveal>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
