"use client";

import { useEffect, useRef } from "react";
import { Fade } from "react-awesome-reveal";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const ContactInfo = () => {
  const phoneDisplay = "+31 6 20002928";
  const phoneTel = "+31620002928";
  const whatsappNumber = "31620002928";

  const currentYear = new Date().getFullYear();

  // ===== FOOTER WIPE REFS ============================================
  const footerRef = useRef<HTMLElement | null>(null);
  const wipeRef = useRef<HTMLDivElement | null>(null);
  const padRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const hasAnimated = useRef(false);

  const computeEndX = () => {
    const footerEl = footerRef.current;
    const padEl = padRef.current;
    const logoEl = logoRef.current;
    if (!footerEl || !padEl || !logoEl) return 0;

    const footerW = footerEl.getBoundingClientRect().width;
    const padLeft = parseFloat(getComputedStyle(padEl).paddingLeft || "0");
    const logoW = logoEl.getBoundingClientRect().width;

    const EXTRA_RED = 10;
    return footerW - padLeft - logoW - EXTRA_RED;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const footerEl = footerRef.current;
    const wipeEl = wipeRef.current;
    if (!footerEl || !wipeEl) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let cleanupResize: (() => void) | null = null;

    const DURATION = 13500;
    const DELAY = 425;

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

    const runAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      let endX = computeEndX();
      wipeEl.style.willChange = "transform";

      const onResize = () => {
        endX = computeEndX();
      };
      window.addEventListener("resize", onResize);
      cleanupResize = () => window.removeEventListener("resize", onResize);

      if (prefersReduced) {
        wipeEl.style.transform = `translate3d(${endX}px,0,0)`;
        return;
      }

      const startAt = performance.now() + DELAY;

      const step = (now: number) => {
        if (now < startAt) {
          raf = requestAnimationFrame(step);
          return;
        }
        const t = Math.min(1, (now - startAt) / DURATION);
        const eased = expoWithTail(t);
        const x = 0 + (endX - 0) * eased;
        wipeEl.style.transform = `translate3d(${x}px,0,0)`;

        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else {
          wipeEl.style.transform = `translate3d(${endX}px,0,0)`;
        }
      };

      raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(footerEl);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (cleanupResize) cleanupResize();
    };
  }, []);

  return (
    <>
      <section
        id="contact-section"
        className="relative bg-[#EAEAEA] py-10"
        aria-labelledby="contact-title"
      >
        <div className="mx-auto max-w-[95rem] px-6">
          <div
            className="
              mt-4 grid grid-cols-1
              md:grid-cols-[auto_minmax(0,1fr)]
              lg:grid-cols-[auto_minmax(0,1.2fr)_auto]
              items-center gap-8 md:gap-6 lg:gap-8 relative
            "
          >
            {/* LEFT GREY LOGO */}
            <div className="hidden md:flex justify-end pr-8 lg:pr-16">
              <img
                src="/images/Designs4suc6_logo_grey.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none h-24 lg:h-32 w-auto opacity-100"
                style={{ transform: "translateY(-10%)" }}
              />
            </div>

            {/* CENTRAL CONTACT CONTAINER */}
            <div
              className="
                border-[5px] rounded-[10px]
                px-6 py-8 md:px-10 md:py-9 lg:px-12 lg:py-10
                mx-auto w-full max-w-[48rem]
              "
              style={{ borderColor: "#BCC0C2", backgroundColor: "#E5E5E5" }}
            >
              {/* HEADER */}
              <div className="flex justify-center">
                <h2
                  id="contact-title"
                  className="
                    font-semibold pb-2 text-center inline-block
                    text-[1.2rem] md:text-[1.4rem] lg:text-[1.5rem]
                    border-b-[5px]
                  "
                  style={{ color: "#C3373D", borderColor: "#BCC0C2" }}
                >
                  Contact informatie
                </h2>
              </div>

              {/* PARAGRAPH */}
              <p
                className="
                  mt-6 leading-relaxed
                  text-[0.9rem] md:text-[1.0rem] lg:text-[1.1rem]
                  text-center md:text-left
                "
                style={{ color: "#645F5A" }}
              >
Wanneer je het contactformulier invult, neem ik binnen een dag contact met je op. Bellen of WhatsAppen is eveneens mogelijk. Tijdens ons gesprek bekijken wij samen wat ik voor je kan realiseren, waarna ik een totaalprijs opmaak voor het volledige project.
              </p>

              {/* SIMPLE CONTACT FORM (Formspree) */}
              <form
                className="mt-8 space-y-4"
                action="https://formspree.io/f/myzvzgbo"
                method="POST"
              >
                {/* Hidden field so you see it came from Designs4suc6 */}
                <input
                  type="hidden"
                  name="form_origin"
                  value="Designs4suc6.nl contactformulier"
                />

                <div>
                  <label
                    htmlFor="naam"
                    className="block text-[0.95rem] md:text-[1.0rem] font-medium mb-1"
                    style={{ color: "#645F5A" }}
                  >
                    Naam *
                  </label>
                  <input
                    id="naam"
                    name="naam"
                    type="text"
                    required
                    className="w-full rounded-[10px] border-[2px] px-3 py-2 text-[0.95rem]"
                    style={{
                      backgroundColor: "#EAEAEA",
                      borderColor: "#BCC0C2",
                      color: "#645F5A",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[0.95rem] md:text-[1.0rem] font-medium mb-1"
                    style={{ color: "#645F5A" }}
                  >
                    E-mail *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-[10px] border-[2px] px-3 py-2 text-[0.95rem]"
                    style={{
                      backgroundColor: "#EAEAEA",
                      borderColor: "#BCC0C2",
                      color: "#645F5A",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="website"
                    className="block text-[0.95rem] md:text-[1.0rem] font-medium mb-1"
                    style={{ color: "#645F5A" }}
                  >
                    Huidige website indien aanwezig
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    placeholder="https://..."
                    className="w-full rounded-[10px] border-[2px] px-3 py-2 text-[0.95rem]"
                    style={{
                      backgroundColor: "#EAEAEA",
                      borderColor: "#BCC0C2",
                      color: "#645F5A",
                    }}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="
                      w-full rounded-[10px] border-[3px]
                      text-center text-[0.95rem] md:text-[1.05rem] font-medium
                      py-[10px] px-0 transition duration-300
                    "
                    style={{
                      backgroundColor: "#E5E5E5",
                      color: "#645F5A",
                      borderColor: "#BCC0C2",
                    }}
                    onMouseEnter={(e) => {
                      const t = e.currentTarget;
                      t.style.backgroundColor = "#FDD194";
                      t.style.color = "#AC1917";
                      t.style.borderColor = "#AC1917";
                    }}
                    onMouseLeave={(e) => {
                      const t = e.currentTarget;
                      t.style.backgroundColor = "#E5E5E5";
                      t.style.color = "#645F5A";
                      t.style.borderColor = "#BCC0C2";
                    }}
                  >
                    Verstuur
                  </button>
                </div>
              </form>

{/* PHONE + WHATSAPP BELOW FORM */}
<div
  className="
    mt-8
    flex flex-col items-center gap-4
    lg:flex-row lg:justify-center lg:items-center lg:gap-10
  "
>
  {/* PHONE */}
  <a
    href={`tel:${phoneTel}`}
    className="
      group flex items-center gap-3
      text-[1rem] md:text-[1.1rem] text-[#645F5A]
      transition-colors duration-200 hover:text-[#AC1917]
    "
  >
    <LocalPhoneIcon
      fontSize="medium"
      className="transition-colors duration-200"
    />
    <span>{phoneDisplay}</span>
  </a>

  {/* WHATSAPP */}
  <a
    href={`https://wa.me/${whatsappNumber}`}
    target="_blank"
    rel="noopener noreferrer"
    className="
      group flex items-center gap-3
      text-[1rem] md:text-[1.1rem] text-[#645F5A]
      transition-colors duration-200 hover:text-[#AC1917]
    "
  >
    <WhatsAppIcon
      fontSize="medium"
      className="transition-colors duration-200"
    />
    <span>WhatsApp</span>
  </a>
</div>

            </div>

            {/* RIGHT GREY LOGO — desktop only */}
            <div className="hidden lg:flex justify-start pl-16">
              <img
                src="/images/Designs4suc6_logo_grey.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none h-32 w-auto opacity-70"
                style={{ transform: "translateY(-10%)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER WITH REVERSED WIPE ================================= */}
      <footer
        ref={footerRef}
        className="relative overflow-hidden bg-[#EAEAEA] border-t-[3px] border-[#645F5A]"
      >
        {/* Wipe layer: starts at left, slides right, parks logo on the right */}
        <div
          ref={wipeRef}
          aria-hidden="true"
          className="absolute inset-0 z-[30] flex items-center justify-start pointer-events-none"
          style={{ background: "#AC1917", transform: "translate3d(0px,0,0)" }}
        >
          <div
            ref={padRef}
            className="h-full grid place-items-center pl-4 sm:pl-5"
          >
            <img
              ref={logoRef}
              src="/images/Designs4suc6_logo2.webp"
              alt="Designs4suc6 logo"
              className="block h-full w-auto max-h-16"
            />
          </div>
        </div>

        {/* Content layer above the wipe */}
        <div className="relative z-[5]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="h-16 flex items-center">
              {/* Grey logo, mirrored from navbar (left side) */}
              <div className="w-[56px] flex items-center justify-start">
                <img
                  src="/images/Designs4suc6_logo_grey.webp"
                  alt="Designs4suc6 mark"
                  width={54}
                  height={45}
                  className="block"
                />
              </div>

              {/* Centered copyright text */}
              <div className="flex-1 flex items-center justify-center">
                <p
                  className="text-[0.85rem] md:text-[0.9rem] text-center"
                  style={{ color: "#645F5A" }}
                >
                  © {currentYear} Designs4suc6. Alle rechten voorbehouden.
                </p>
              </div>

              {/* Spacer so the center text remains centered */}
              <div className="w-[56px]" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactInfo;
