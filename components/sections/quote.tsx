"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/motion";
import { cn, wrap } from "@/lib/utils";

export function Quote() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    // TODO: replace with a Server Action or API route that stores/sends the request.
    await new Promise((r) => setTimeout(r, 900));
    form.reset();
    setStatus("done");
  }

  return (
    <section id="contact" aria-labelledby="quote-title" className={cn(wrap, "py-12 md:py-16")}>
      <Reveal>
        <div className="group relative isolate mx-auto max-w-5xl overflow-hidden rounded-[1.5rem] bg-brand-mint px-6 py-16 text-center text-foreground sm:py-20 md:py-24">
          <Image src="/images/quote-bg.jpg" alt="" fill sizes="(min-width:1024px) 1024px, 100vw" className="-z-20 object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-white/25" />
          <h2 id="quote-title" className="text-[clamp(2rem,4.5vw,2.8rem)]">
            Request A <em className="font-light">Free Quote</em>
          </h2>
          <form onSubmit={onSubmit} aria-busy={status === "sending"} className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label htmlFor="quote-email" className="sr-only">Email address</label>
            <Input id="quote-email" name="email" type="email" required autoComplete="email" placeholder="Your email" className="bg-white/90" />
            <Button type="submit" variant="default" disabled={status === "sending"}>
              {status === "sending" ? <><Loader2 className="animate-spin" /> Sending</> : "Request"}
            </Button>
          </form>
          <p role="status" className="mt-4 min-h-6 text-base">
            {status === "done" && "Thanks! We'll email your free quote within one business day."}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
