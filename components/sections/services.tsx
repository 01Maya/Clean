
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  Clock3,
  Check,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CountUp,
  ImageReveal,
  Reveal,
  Tilt,
} from "@/components/motion";
import { services } from "@/lib/data";
import { cn, wrap } from "@/lib/utils";

const serviceHighlights = [
  {
    title: "Expert Cleaning",
    description:
      "Thoughtful, detailed care from a trained team you can trust.",
    details:
      "We use proven cleaning methods, quality products, and careful checklists to leave every room feeling fresh and beautifully finished.",
    features: [
      "Trained cleaning professionals",
      "Quality cleaning products",
      "Detailed room-by-room checklists",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Tailored Service",
    description:
      "A cleaning plan shaped around your space and routine.",
    details:
      "Choose the rooms, priorities, and rhythm that work for you. We make it easy to create a service that fits your home or workplace.",
    features: [
      "Personalized cleaning plans",
      "Flexible service options",
      "Home and office solutions",
    ],
    icon: Sparkles,
  },
  {
    title: "On Your Schedule",
    description:
      "Reliable visits that keep your space consistently pristine.",
    details:
      "From one-off deep cleans to regular visits, flexible scheduling means your space stays ready without adding another thing to your to-do list.",
    features: [
      "One-time deep cleaning",
      "Recurring cleaning visits",
      "Flexible appointment times",
    ],
    icon: Clock3,
  },
] as const;

export function Services() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(
    new Set()
  );

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className={wrap}
    >
      <h2 id="services-title" className="sr-only">
        Our cleaning services
      </h2>

      {/* Main services */}
      {services.map((s) => (
        <article
          key={s.title}
          className="grid items-center gap-10 py-8 md:grid-cols-2 md:gap-16 md:py-12"
        >
          {/* Service image */}
<Reveal
  className={cn(
    "w-full max-w-[400px] justify-self-center",
    s.flip && "md:order-2"
  )}
>
            <Tilt className="group relative aspect-[1/1.05] w-full">
              <ImageReveal className="absolute inset-0 overflow-hidden rounded-[1.5rem] shadow-[0_16px_40px_rgba(28,29,31,0.12)]">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(min-width:768px) 400px, 86vw"
                  className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
                />
              </ImageReveal>

              {/* Floating badge */}
              <div
                className={cn(
                  "absolute top-[9%] z-10 animate-float rounded-2xl bg-white/95 px-5 py-3 text-center text-[.85rem] text-[#1c1d1f] shadow-xl backdrop-blur",
                  s.flip
                    ? "-left-4 sm:-left-7"
                    : "-right-4 sm:-right-7"
                )}
              >
                <b className="block text-[2.2rem] font-light leading-none">
                  <CountUp
                    value={s.badge.value}
                    suffix={s.badge.suffix}
                  />
                </b>
                {s.badge.label}
              </div>
            </Tilt>
          </Reveal>

          {/* Service content */}
          <Reveal
            delay={0.1}
className={cn(
  "text-center md:text-left md:translate-x-16 lg:translate-x-24",
  s.flip && "md:order-1 md:translate-x-0"
)}
          >
<div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
  <span className="h-px w-7 bg-foreground/30" />
  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
    {s.tag}
  </span>
  <span className="h-px w-7 bg-foreground/30" />
</div>
            <h3 className="text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.08] tracking-tight">
              {s.title}{" "}
              <em className="font-light text-muted-foreground">
                {s.accent}
              </em>
            </h3>

            <p className="mx-auto mb-7 mt-4 max-w-[44ch] text-[1.05rem] leading-7 text-muted-foreground md:mx-0">
              {s.text}{" "}
              {s.title === "Home"
                ? "Dusting, vacuuming, mopping, kitchen and bathroom detailing, plus the finishing touches that make your space feel new."
                : "Desks, shared areas, kitchens, restrooms and high-touch surfaces cleaned around your team's schedule."}
            </p>

            <Button asChild className="mt-5">
              <a href="#contact">Explore</a>
            </Button>
          </Reveal>
        </article>
      ))}

      {/* Why Choose Us */}
      <Reveal
        delay={0.15}
        className="pb-16 pt-4 md:pb-24 md:pt-8"
      >
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-foreground/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Why Choose Us
            </span>
            <span className="h-px w-7 bg-foreground/30" />
          </div>

          <h3 className="text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.08] tracking-tight">
            The cleaning team that{" "}
            <em className="font-light text-muted-foreground">
              cares.
            </em>
          </h3>

          <p className="mx-auto mt-4 max-w-[52ch] text-[1.05rem] leading-7 text-muted-foreground">
            Experts in creating pristine homes and productive
            workspaces, with thoughtful service at every step.
          </p>
        </div>

        {/* Interactive feature cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceHighlights.map((highlight, index) => {
            const Icon = highlight.icon;
            const isExpanded = expandedCards.has(highlight.title);
            const detailsId = `service-details-${index}`;

            const toggleCard = () => {
              setExpandedCards((current) => {
                const next = new Set(current);

                if (next.has(highlight.title)) {
                  next.delete(highlight.title);
                } else {
                  next.add(highlight.title);
                }

                return next;
              });
            };

            return (
              <Reveal
                key={highlight.title}
                delay={index * 0.08}
                className={cn(
                  "h-full",
                  index === 2 &&
                    "sm:col-span-2 sm:mx-auto sm:w-1/2 lg:col-span-1 lg:mx-0 lg:w-auto"
                )}
              >
                <Tilt className="h-full">
                  <article
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                    onClick={toggleCard}
                    onKeyDown={(event) => {
                      if (event.target !== event.currentTarget) return;

                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        event.preventDefault();
                        toggleCard();
                      }
                    }}
                    className={cn(
                      "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.5rem] border bg-gradient-to-b from-white to-[#f8fbf7] p-6 sm:p-7",
                      "transition-[transform,border-color,box-shadow] duration-300 ease-out",
                      "hover:-translate-y-1 hover:border-[#a9c9a9] hover:shadow-[0_14px_32px_rgba(28,29,31,0.08)]",
                      isExpanded
                        ? "border-[#a9c9a9] shadow-[0_10px_24px_rgba(28,29,31,0.06)]"
                        : "border-border/70",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "motion-reduce:transform-none motion-reduce:transition-none"
                    )}
                  >
                    <div className="relative z-10 flex h-full flex-col">
                      <div
                        className={cn(
                          "mb-6 flex size-12 shrink-0 items-center justify-center rounded-full",
                          "bg-[#e5f2e3] text-[#315f37] ring-1 ring-inset ring-[#d2e7d0]",
                          "transition-[background-color,transform] duration-300 group-hover:scale-105 group-hover:bg-[#d8ebd6]",
                          "motion-reduce:transition-none"
                        )}
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-6"
                          strokeWidth={1.7}
                        />
                      </div>

                      {/* Title */}
                      <h4
                        className="text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-[#315f37]"
                      >
                        {highlight.title}
                      </h4>

                      {/* Description */}
                      <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
                        {highlight.description}
                      </p>

                      {/* Expandable content */}
                      <div
                        id={detailsId}
                        aria-hidden={!isExpanded}
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
                          "motion-reduce:transition-none",
                          isExpanded
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <div className="overflow-hidden">
                          <div className="space-y-3 border-t border-border/60 pt-4">
                            {highlight.features.map((feature) => (
                              <div
                                key={feature}
                                className="flex items-start gap-2.5 text-sm leading-5 text-muted-foreground"
                              >
                                <Check
                                  aria-hidden="true"
                                  className="mt-0.5 size-4 shrink-0 text-[#4f8054]"
                                  strokeWidth={2}
                                />
                                <span>{feature}</span>
                              </div>
                            ))}

                            <p className="pt-1 text-sm leading-6 text-muted-foreground">
                              {highlight.details}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Expand/collapse indicator */}
                      <div
                        aria-hidden="true"
                        className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-[#315f37]"
                      >
                        <span>
                          {isExpanded ? "Show less" : "Learn more"}
                        </span>

                        <ArrowRight
                          className={cn(
                            "size-4 transition-transform duration-300",
                            isExpanded
                              ? "rotate-90"
                              : "group-hover:translate-x-1"
                          )}
                        />
                      </div>
                    </div>
                  </article>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
