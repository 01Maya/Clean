"use client";

import { useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Tilt } from "@/components/motion";
import { testimonials } from "@/lib/data";
import { cn, wrap } from "@/lib/utils";

export function Testimonials() {
  const reduceMotion = useReducedMotion();
  const autoplay = useMemo(
    () => reduceMotion ? null :
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [reduceMotion]
  );
  const plugins = useMemo(() => autoplay ? [autoplay] : [], [autoplay]);

  const [ref, api] = useEmblaCarousel(
    { loop: true, align: "start" },
    plugins
  );

  const [sel, setSel] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSel(api.selectedScrollSnap());

    const onInit = () => {
      setSnaps(api.scrollSnapList());
      onSelect();
    };

    onInit();
    api.on("select", onSelect);
    api.on("reInit", onInit);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onInit);
    };
  }, [api]);

  return (
    <section
      id="testimonials"
      aria-labelledby="reviews-title"
      className={cn(wrap, "py-16 sm:py-20 md:py-24")}
    >
      {/* Section heading */}
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-7 bg-foreground/30" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Testimonials
          </span>
          <span className="h-px w-7 bg-foreground/30" />
        </div>

        <h2
          id="reviews-title"
          className="text-3xl font-normal tracking-tight sm:text-4xl md:text-[2.7rem]"
        >
          A little love from our{" "}
          <em className="font-light text-muted-foreground">clients.</em>
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
          Clean spaces, happier homes, and workplaces that feel their best.
          Here’s what our customers have to say.
        </p>
      </Reveal>

      {/* Carousel */}
      <Reveal delay={0.1} className="mt-8 sm:mt-10">
        <div className="mb-2 flex justify-end gap-2">
          <Button
            variant="soft"
            size="icon"
            aria-label="Previous review"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            variant="soft"
            size="icon"
            aria-label="Next review"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        <div className="overflow-hidden" ref={ref}>
          <div className="-ml-4 flex touch-pan-y py-4">
            {testimonials.map((t, index) => (
              <div
                key={t.name}
                className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <Tilt className="h-full">
                  <figure
                    className="flex h-full min-h-[260px] flex-col items-center rounded-[1.5rem] border border-border/70 bg-white p-7 text-center text-foreground shadow-[0_8px_24px_rgba(28,29,31,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-[#d3e3d2] hover:shadow-[0_12px_28px_rgba(28,29,31,0.07)] sm:p-8"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mb-5 grid size-12 shrink-0 place-items-center rounded-full font-medium",
                        [
                          "bg-[#9ed7a3] text-[#234b29]",
                          "bg-[#a9cfe4] text-[#1d425a]",
                          "bg-[#b8d2b8] text-[#234b29]",
                          "bg-[#a5d3aa] text-[#234b29]",
                        ][index % 4]
                      )}
                    >
                      {t.initials}
                    </span>

                    <div
                      role="img"
                      aria-label="Rated 5 out of 5 stars"
                      className="mb-4 flex gap-1 text-amber-400"
                    >
                      {Array.from({ length: 5 }, (_, star) => (
                        <Star
                          key={star}
                          aria-hidden="true"
                          className="size-4 fill-current"
                        />
                      ))}
                    </div>

                    <blockquote className="text-sm leading-7 sm:text-base">
                      “{t.quote}”
                    </blockquote>

                    <figcaption className="mt-auto pt-6 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      {t.name}
                      <span className="mx-1.5 text-[#6e9b70]">·</span>
                      {t.role}
                    </figcaption>
                  </figure>
                </Tilt>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div
          className="mt-4 flex justify-center gap-2"
          aria-label="Review pagination"
        >
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to review ${i + 1}`}
              aria-current={i === sel ? "true" : undefined}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "motion-reduce:transition-none",
                i === sel
                  ? "w-7 bg-[#4f8054]"
                  : "w-2 bg-foreground/25 hover:bg-[#a9c9a9]"
              )}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
