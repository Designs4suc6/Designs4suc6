"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const wipeRef   = useRef<HTMLDivElement | null>(null);
  const padRef    = useRef<HTMLDivElement | null>(null);
  const logoRef   = useRef<HTMLImageElement | null>(null);
  const hasAnimated = useRef(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ===== DESKTOP WIPE ANIMATION ======================================
  const computeEndX = () => {
    const headerEl = headerRef.current;
    const padEl    = padRef.current;
    const logoEl   = logoRef.current;
    if (!headerEl || !padEl || !logoEl) return 0;

    const headerW  = headerEl.getBoundingClientRect().width;
    const padRight = parseFloat(getComputedStyle(padEl).paddingRight || "0");
    const logoW    = logoEl.getBoundingClientRect().width;

    const EXTRA_RED = 10;
    return -(headerW - padRight - logoW - EXTRA_RED);
  };

  useEffect(() => {
    const el = wipeRef.current;
    if (!el || hasAnimated.current) return;
    hasAnimated.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const endX = computeEndX();
      el.style.transform = `translate3d(${endX}px,0,0)`;
      return;
    }

    const DURATION = 13500;
    const DELAY    = 425;

    function easeOutExpo(t: number) {
      return t === 1 ? 1 : 1 - Math.pow(2, -25 * t);
    }

    el.style.transform = "translate3d(0px,0,0)";
    el.style.willChange = "transform";

    let endX = computeEndX();
    const startAt = performance.now() + DELAY;

    const onResize = () => {
      endX = computeEndX();
      if (parked) el.style.transform = `translate3d(${endX}px,0,0)`;
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    let parked = false;

    const step = (now: number) => {
      if (now < startAt) {
        raf = requestAnimationFrame(step);
        return;
      }
      const t = Math.min(1, (now - startAt) / DURATION);
      const eased = easeOutExpo(t);
      const x = 0 + (endX - 0) * eased;
      el.style.transform = `translate3d(${x}px,0,0)`;

      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        el.style.transform = `translate3d(${endX}px,0,0)`;
        parked = true;
      }
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // ===== MOBILE MENU BEHAVIOUR =======================================

  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    if (isMenuOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
    return () => {
      body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // close menu when resizing up to md+
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleMenu = () => setIsMenuOpen(v => !v);
  const closeMenu  = () => setIsMenuOpen(false);

  const linkClasses =
    "px-4 py-2 rounded-full border border-[#BCC0C2] bg-[#E5E5E5] text-[#645F5A] hover:bg-[#FDD194] hover:text-[#AC1917] hover:border-[#AC1917] transition";

  return (
    <>
      <header
  ref={headerRef}
  className="sticky top-0 z-[10000] w-full bg-[#EAEAEA] border-b-[3px] border-[#645F5A]"
        role="banner"
        aria-label="Site navigation"
      >
        {/* WIPE */}
        <div
          ref={wipeRef}
          aria-hidden="true"
          className="absolute inset-0 z-20 flex items-center justify-end pointer-events-none"
          style={{ background: "#AC1917" }}
        >
          <div ref={padRef} className="h-full grid place-items-center pr-4 sm:pr-5">
            <img
              ref={logoRef}
              src="/images/Designs4suc6_logo.webp"
              alt="Designs4suc6 logo"
              className="block h-16 w-auto"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative z-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="h-16 flex items-center">
              {/* LEFT SPACER (tablet+ real spacer, mobile fake spacer) */}
              <div className="w-[56px] flex items-center">
                <div className="hidden md:block w-full" />
                <div className="block md:hidden w-full" aria-hidden="true" />
              </div>

              {/* CENTER: desktop/tablet nav OR mobile hamburger */}
              <div className="flex-1 flex items-center justify-center">
                {/* Desktop / tablet nav */}
                <nav className="hidden md:flex justify-center gap-6 lg:gap-10">
                  <Link href="#home-section" className={linkClasses}>
                    Wat ik doe
                  </Link>
                  <Link href="#portfolio-section" className={linkClasses}>
                    Portfolio
                  </Link>
                  <Link href="#contact-section" className={linkClasses}>
                    Contact
                  </Link>
                </nav>

                {/* Mobile hamburger */}
                <div className="md:hidden">
                  <button
                    type="button"
                    className="menu-toggle"
                    aria-label="Menu"
                    aria-expanded={isMenuOpen ? "true" : "false"}
                    onClick={toggleMenu}
                  >
                    <span className={`bar ${isMenuOpen ? "open" : ""}`} />
                    <span className={`bar ${isMenuOpen ? "open" : ""}`} />
                    <span className={`bar ${isMenuOpen ? "open" : ""}`} />
                    <span className={`bar ${isMenuOpen ? "open" : ""}`} />
                  </button>
                </div>
              </div>

              {/* RIGHT GREY LOGO — ALWAYS VISIBLE */}
              <div className="w-[56px] flex items-center justify-end">
                <img
                  src="/images/Designs4suc6_logo_grey.webp"
                  alt="Designs4suc6 mark"
                  width={54}
                  height={45}
                  className="block"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY MENU (BELOW NAVBAR) */}
      <div
className={`
  fixed left-0 right-0 bottom-0 top-[calc(4rem+3px)] bg-[#E5E5E5]
    flex flex-col items-center justify-center
    transition-opacity duration-300
    z-50
    ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  `}

        aria-hidden={isMenuOpen ? "false" : "true"}
      >
        <ul className="list-none space-y-8 text-center">
          <li>
            <a
              href="#home-section"
              className="menu-item text-2xl font-semibold text-[#645F5A]"
              onClick={closeMenu}
            >
              Wat ik doe
            </a>
          </li>
          <li>
            <a
              href="#portfolio-section"
              className="menu-item text-2xl font-semibold text-[#645F5A]"
              onClick={closeMenu}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="#contact-section"
              className="menu-item text-2xl font-semibold text-[#645F5A]"
              onClick={closeMenu}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* HAMBURGER STYLES */}
      <style jsx global>{`
        .menu-toggle {
          --btn-size: 36px;
          position: relative;
          width: var(--btn-size);
          height: var(--btn-size);
          padding: 8px;
          border: 3px solid #bcc0c2;
          border-radius: 10px;
          cursor: pointer;
          background: transparent;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        .menu-toggle .bar {
          position: absolute;
          left: 50%;
          width: 60%;
          height: 3px;
          background-color: #645f5a;
          border-radius: 2px;
          transform-origin: center;
          transition: transform 0.25s ease, opacity 0.25s ease,
            background-color 0.2s ease, top 0.25s ease;
          margin-left: -30%;
        }
        .menu-toggle .bar:nth-child(1) {
          top: 8px;
        }
        .menu-toggle .bar:nth-child(2),
        .menu-toggle .bar:nth-child(3) {
          top: calc(50% - 1.5px);
        }
        .menu-toggle .bar:nth-child(4) {
          top: calc(100% - 8px - 3px);
        }

        .menu-toggle:hover .bar {
          background-color: #b60b13;
        }

        /* X state */
        .menu-toggle .bar.open:nth-child(1),
        .menu-toggle .bar.open:nth-child(4) {
          opacity: 0;
        }
        .menu-toggle .bar.open:nth-child(2) {
          transform: rotate(45deg);
        }
        .menu-toggle .bar.open:nth-child(3) {
          transform: rotate(-45deg);
        }
      `}</style>
    </>
  );
}
