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

    // smooth expo with gentle tail
    const DURATION = 13500;
    const DELAY = 425;
    const startAt = performance.now() + DELAY;

    const easeOutExpo = (t: number) =>
      t === 1 ? 1 : 1 - Math.pow(2, -25 * t);
    const PIVOT = 0.9;
    const POWER = 1.8;
    const expoWithTail = (t: number) => {
      const base = easeOutExpo(t);
      if (t <= PIVOT) return base;
      const u = (t - PIVOT) / (1 - PIVOT);
      const slowed = Math.pow(base, POWER);
      return base * (1 - u) + slowed * u;
    };

    const step = (now: number) => {
      if (now < startAt) {
        requestAnimationFrame(step);
        return;
      }
      const t = Math.min(1, (now - startAt) / DURATION);
      const eased = expoWithTail(t);
      const x = 0 + (-110 - 0) * eased; // 0% → -110%
      el.style.transform = `translate3d(${x}%,0,0)`;
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
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
          {/* Your big SVG goes here; placeholder rectangle: */}
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
