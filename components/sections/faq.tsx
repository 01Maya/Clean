import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion";
import { faqs } from "@/lib/data";
import { cn, wrap } from "@/lib/utils";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className={cn(wrap, "py-16 text-center sm:py-20 md:py-24")}>
      <Reveal>
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-7 bg-foreground/30" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            FAQ
          </span>
          <span className="h-px w-7 bg-foreground/30" />
        </div>
        <h2 id="faq-title" className="text-[clamp(2rem,4vw,2.8rem)] font-normal">
          Have <em className="font-light text-muted-foreground">Questions?</em>
        </h2>
        <p className="mt-3 text-[1.05rem] text-muted-foreground">Clarify your needs and clear up any worries.</p>
      </Reveal>
      <Reveal delay={0.1}>
        <Accordion type="single" collapsible className="mx-auto mt-10 grid max-w-2xl gap-3 text-left">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
