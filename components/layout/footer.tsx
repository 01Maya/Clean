import Link from "next/link";
import { nav } from "@/lib/data";
import { cn, wrap } from "@/lib/utils";

const cols = [
  { title: "Pages", links: nav.slice(0, 4).map((l) => ({ label: l.label, href: `#${l.id}` })) },
  { title: "Company", links: [{ label: "Contact", href: "#contact" }, { label: "Get a quote", href: "#contact" }, { label: "Careers", href: "#" }] },
  { title: "Follow", links: [{ label: "Instagram", href: "#" }, { label: "LinkedIn", href: "#" }, { label: "Facebook", href: "#" }] },
];

export function Footer() {
  return (
    <footer className="mt-12 rounded-t-[2rem] bg-brand-mint pb-8 pt-16 text-base">
<div
  className={cn(
    wrap,
    "grid grid-cols-2 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-10"
  )}
>
        <div>
          <p className="text-xl font-semibold tracking-[.08em]">CLEAN</p>
          <p className="mt-3 max-w-[28ch] text-foreground/80">Expert cleaning for homes and offices.</p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="mb-3 font-medium">{c.title}</p>
            <ul className="grid gap-2">
              {c.links.map((l) => (
                <li key={l.label}><Link href={l.href} className="inline-block text-foreground/80 transition-transform hover:translate-x-1 hover:text-foreground">{l.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
<p className={cn(wrap, "mt-12 text-left text-sm text-foreground/70 sm:text-center")}>
  © {new Date().getFullYear()} CLEAN. All rights reserved.
</p>
    </footer>
  );
}
