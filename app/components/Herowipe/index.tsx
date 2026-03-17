"use client";

import { useEffect, useRef } from "react";

export default function HeroWipe({
  title = "Designs4suc6",
  svg = null, // pass your replacement SVG element if you like
}: {
  title?: string;
  svg?: React.ReactNode;
}) {
  const wipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wipeRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      el.style.transform = "translateX(-110%)";
      return;
    }

    const DELAY = 425;
    const DURATION = 1800;
    const startAt = performance.now() + DELAY;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    let raf = 0;

    const step = (now: number) => {
      if (now < startAt) {
        raf = requestAnimationFrame(step);
        return;
      }

      const t = Math.min(1, (now - startAt) / DURATION);
      const progress = easeOutCubic(t);
      const x = -110 * progress; // 0% → -110%

      el.style.transform = `translate3d(${x}%,0,0)`;

      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        el.style.transform = "translate3d(-110%,0,0)";
      }
    };

    raf = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      className="relative grid place-items-center overflow-hidden"
      style={{
        minHeight: "clamp(120px, 18vw, 210px)",
        padding: "clamp(10px, 2vw, 18px)",
        backgroundColor: "#EAEAEA",
      }}
      data-hero
    >
      {/* Title frame */}
      <div
        className="relative z-[1] rounded-[10px] border-[5px] text-center"
        style={{ background: "#E5E5E5", borderColor: "#BCC0C2" }}
      >
        <h1
          className="m-0 px-6 py-3 font-semibold leading-tight"
          style={{ color: "#C3373D", fontSize: "2.0rem" }}
        >
          {title}
        </h1>
      </div>

      {/* Red wipe with logo */}
      <div
        ref={wipeRef}
        aria-hidden="true"
        className="absolute inset-0 z-[2] flex items-center justify-end"
        style={{ background: "#AC1917", transform: "translateX(0%)" }}
      >
        <div className="grid h-full place-items-center pr-6">
          {svg ?? (
            <svg width="120" height="120">
              <rect width="120" height="120" fill="#ECD4A4" />
            </svg>
          )}
        </div>
      </div>
    </section>
  );
}