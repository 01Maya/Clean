import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal, Tilt } from "@/components/motion";
import { posts } from "@/lib/data";
import { cn, wrap } from "@/lib/utils";

export function Posts() {
  return (
    <section id="blog" aria-labelledby="blog-title" className={cn(wrap, "py-12 md:py-16")}>
      <Reveal>
        <div className="mb-6 flex items-center justify-between">
          <h2 id="blog-title" className="text-2xl font-normal">Latest Posts</h2>
          <Button asChild size="sm"><a href="#blog">View all</a></Button>
        </div>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.12}>
            <Tilt className="h-full">
              <article className="group h-full overflow-hidden rounded-[1.5rem] border border-border/60 bg-card shadow-[0_8px_24px_rgba(28,29,31,0.05)] transition-[border-color,box-shadow] duration-300 hover:border-[#d3e3d2] hover:shadow-[0_14px_32px_rgba(28,29,31,0.09)]">
                <a href={p.href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                  <div className="relative h-[clamp(220px,28vw,320px)] overflow-hidden">
                    <Image src={p.image} alt={p.alt} fill sizes="(min-width:768px) 580px, 92vw" className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-foreground">{p.category}</span>
                  </div>
                  <h3 className="px-6 py-6 text-xl font-normal">{p.title}</h3>
                </a>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
