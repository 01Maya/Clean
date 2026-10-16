"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal, Tilt } from "@/components/motion";
import { cn, wrap } from "@/lib/utils";
import {
  Check,
  Sparkles,
  House,
  BriefcaseBusiness,
} from "lucide-react";

const plans = [
  {
    name: "Essential Clean",
    price: "79",
    description: "Perfect for regular home maintenance.",
    icon: House,
    features: [
      "General surface cleaning",
      "Kitchen & bathroom cleaning",
      "Dusting & vacuuming",
      "Trash removal",
    ],
  },
  {
    name: "Deep Clean",
    price: "129",
    description: "A more thorough clean for a fresh start.",
    icon: Sparkles,
    features: [
      "Everything in Essential",
      "Deep kitchen & bathroom clean",
      "Detailed dusting and wiping",
      "Hard-to-reach areas",
    ],
  },
  {
    name: "Office Clean",
    price: "199",
    description: "Keep your workspace healthy and productive.",
    icon: BriefcaseBusiness,
    features: [
      "Customized office cleaning",
      "Workstations & common areas",
      "Floor care & trash removal",
      "Flexible scheduling",
    ],
  },
];

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState("Deep Clean");

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className={cn(wrap, "py-16 sm:py-20 md:py-24")}
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-7 bg-foreground/30" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Pricing
          </span>
          <span className="h-px w-7 bg-foreground/30" />
        </div>

        <h2
          id="pricing-title"
          className="text-3xl font-normal tracking-tight sm:text-4xl md:text-[2.7rem]"
        >
          Simple, transparent{" "}
          <em className="font-light text-muted-foreground">pricing.</em>
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
          Choose a plan that fits your space and schedule. No hidden fees,
          just spotless results.
        </p>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 items-stretch gap-5 sm:mt-12 md:grid-cols-3 md:gap-4 lg:gap-5">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          const isSelected = selectedPlan === plan.name;

          return (
            <Reveal
              key={plan.name}
              delay={index * 0.08}
              className="h-full"
            >
              <Tilt className="h-full">
                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan.name)}
                  aria-pressed={isSelected}
                  aria-label={`Select ${plan.name} plan`}
                  className="group block h-full w-full rounded-[1.5rem] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                >
                  <article
                    className={cn(
                      "relative flex h-full flex-col rounded-[1.5rem] border bg-gradient-to-b from-white to-[#f8fbf7] p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out sm:p-7",
                      "hover:-translate-y-1 hover:border-[#a9c9a9] hover:shadow-[0_14px_32px_rgba(28,29,31,0.08)]",
                      isSelected
                        ? "border-[#7ea981] shadow-[0_12px_30px_rgba(79,128,84,0.16)]"
                        : "border-border/70"
                    )}
                  >
                    {isSelected && (
                      <span className="absolute right-5 top-5 rounded-full bg-[#eef5ed] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#315f37]">
                        Selected
                      </span>
                    )}

                    <div
                      className={cn(
                        "mb-5 flex size-12 items-center justify-center rounded-full bg-[#e5f2e3] text-[#315f37] ring-1 ring-inset ring-[#d2e7d0] transition-[background-color,transform] duration-300",
                        "group-hover:scale-105 group-hover:bg-[#d8ebd6]",
                        isSelected && "bg-[#d8ebd6]"
                      )}
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-5"
                        strokeWidth={1.6}
                      />
                    </div>

                    <h3 className="text-xl font-medium tracking-tight">
                      {plan.name}
                    </h3>

                    <p className="mt-2 min-h-10 max-w-[260px] text-sm leading-5 text-muted-foreground">
                      {plan.description}
                    </p>

                    <div className="mt-6 flex items-baseline gap-1.5">
                      <span className="text-4xl font-normal tracking-tight sm:text-[2.6rem]">
                        ${plan.price}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        / visit
                      </span>
                    </div>

                    <div className="my-6 h-px bg-foreground/10" />

                    <ul className="grid flex-1 content-start gap-3.5">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm leading-5"
                        >
                          <Check
                            aria-hidden="true"
                            className={cn(
                              "mt-0.5 size-4 shrink-0 transition-colors",
                              isSelected
                                ? "text-[#4f8054]"
                                : "text-muted-foreground"
                            )}
                            strokeWidth={2}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <span
                      className={cn(
                        "mt-8 inline-flex h-11 w-full items-center justify-center gap-1 rounded-full border px-4 text-sm font-medium transition-all duration-300",
                        isSelected
                          ? "border-[#4f8054] bg-[#4f8054] text-white"
                          : "border-border bg-transparent text-foreground"
                      )}
                    >
                      {isSelected ? "Selected plan" : "Choose plan"}
                      <span aria-hidden="true">→</span>
                    </span>
                  </article>
                </button>
              </Tilt>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-8 text-center">
        <p className="text-xs leading-5 text-muted-foreground">
          Need a custom cleaning plan?{" "}
          <a
            href="#contact"
            onClick={(event) => event.stopPropagation()}
            className="font-medium text-foreground underline decoration-[#a9c9a9] underline-offset-4 transition-colors hover:text-[#315f37]"
          >
            Request a free quote
          </a>
        </p>
      </Reveal>
    </section>
  );
}
