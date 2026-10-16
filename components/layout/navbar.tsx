
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn, wrap } from "@/lib/utils";

const navigation = [
  { id: "top", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "pricing", label: "Pricing" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    window.history.replaceState(null, "", `#${id}`);
    const scrollOffset =
      Number.parseFloat(
        window.getComputedStyle(document.documentElement).scrollPaddingTop
      ) || 0;
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - scrollOffset;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: reduceMotion ? "instant" : "smooth",
    });
  }, []);

  // Detect the section currently near the top of the viewport.
  const updateActiveSection = useCallback(() => {
    setScrolled(window.scrollY > 10);

    let current = "top";
    const offset = 150;

    for (const item of navigation) {
      const section = document.getElementById(item.id);

      if (section && section.getBoundingClientRect().top <= offset) {
        current = item.id;
      }
    }

    setActive(current);
  }, []);

  // Close the mobile drawer before scrolling to avoid fighting its scroll lock.
  const handleNavigation = useCallback(
    (
      event: React.MouseEvent<HTMLAnchorElement>,
      id: string,
      isMobile = false
    ) => {
      const target = document.getElementById(id);

      if (!target) return;

      event.preventDefault();
      setActive(id);
      if (mobileScrollTimer.current) {
        clearTimeout(mobileScrollTimer.current);
        mobileScrollTimer.current = null;
      }

      if (!isMobile) {
        scrollToSection(id);
        return;
      }

      setMobileOpen(false);
      mobileScrollTimer.current = setTimeout(() => {
        mobileScrollTimer.current = null;
        scrollToSection(id);
      }, 350);
    },
    [scrollToSection]
  );

  // Update the active navigation item while scrolling.
  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        updateActiveSection();
        frame = 0;
      });
    };

    updateActiveSection();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      if (mobileScrollTimer.current) {
        clearTimeout(mobileScrollTimer.current);
      }
    };
  }, [updateActiveSection]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "border-b border-black/5",
        "bg-background/90 backdrop-blur-xl",
        "transition-shadow duration-300",
        scrolled && "shadow-[0_6px_24px_rgba(28,29,31,0.07)]"
      )}
    >
      <div
        className={cn(
          wrap,
          "flex h-[68px] items-center justify-between gap-4",
          "sm:h-[76px]"
        )}
      >
        {/* Logo */}
        <Link
          href="#top"
          onClick={(event) => handleNavigation(event, "top")}
          className="shrink-0 text-lg font-semibold tracking-[0.08em] sm:text-xl"
        >
          CLEAN
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 lg:flex xl:gap-8"
        >
          {navigation.map((item) => {
            const isActive = active === item.id;

            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => handleNavigation(event, item.id)}
                className={cn(
                  "group relative whitespace-nowrap py-2 text-sm",
                  "transition-colors hover:text-[#315f37] xl:text-[0.95rem]",
                  isActive && "text-[#315f37]"
                )}
              >
                {item.label}

                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full",
                    "origin-left bg-current transition-transform duration-200",
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile and tablet navigation */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation menu"
              className="shrink-0 lg:hidden [&_svg]:size-6"
            >
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent
            className="w-[min(88vw,360px)] overflow-y-auto px-5 pb-8 pt-8 sm:px-7"
          >
            <SheetTitle className="text-lg font-medium tracking-tight">
              Navigation
            </SheetTitle>

            <nav
              aria-label="Mobile navigation"
              className="mt-6 flex flex-col gap-2"
            >
              {navigation.map((item) => {
                const isActive = active === item.id;

                return (
                  <Link
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(event) =>
                      handleNavigation(event, item.id, true)
                    }
                    className={cn(
                      "flex min-h-12 items-center justify-between",
                      "rounded-xl px-4 py-3 text-lg font-normal",
                      "transition-colors duration-200",
                      "hover:bg-[#eef5ed] hover:text-[#315f37]",
                      isActive && "bg-[#eef5ed] text-[#315f37]"
                    )}
                  >
                    <span>{item.label}</span>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-sm text-[#315f37] transition-opacity",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    >
                      ↗
                    </span>
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
