"use client";
import Link from "next/link";
import type { CSSProperties } from "react";

/**
 * KNOBS for adjusting the PC effect.
 */
const pcStyle: CSSProperties & { [key: string]: string } = {
  "--pc-width": "520px",

  // Screen rectangle as percentages
  "--screen-top": "6.80%",    // move screen up/down
  "--screen-left": "7%",      // move screen left/right
  "--screen-width": "86.4%",  // width of screen
  "--screen-height": "74.5%", // height of screen

  // Rounded inner corners
  "--screen-radius": "10% / 10%",

  // Effect strengths
  "--overlay-opacity": "0.7",    // glass + scanlines
  "--phosphor-opacity": "0.18",  // RGB stripes
  "--rim-opacity": "0.6",        // glow
};

const Banner = () => {
  return (
<div id="home-section" className="bg-[#EAEAEA] py-3 md:py-3.5 lg:py-4 relative">
  <div className="mx-auto max-w-7xl pt-8 md:pt-10 lg:pt-12 pb-3 md:pb-4 lg:pb-5 px-6">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* === TEXT COLUMN === */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <div
              className="p-6 md:p-8 border-[5px] rounded-[10px]"
              style={{
                borderColor: "#BCC0C2",
                backgroundColor: "#E5E5E5",
              }}
            >
              {/* HEADER */}
              <div className="flex justify-center">
                <h1
                  className="
                    font-semibold pb-2 text-center inline-block
                    text-[1.1rem] md:text-[1.3rem] lg:text-[1.5rem]
                    border-b-[5px]
                  "
                  style={{ color: "#C3373D", borderColor: "#BCC0C2" }}
                >
                  Designs4suc6
                </h1>
              </div>

              {/* PARAGRAPH */}
              <p
                className="
                  mt-6 leading-relaxed mx-auto
                  text-[0.9rem] md:text-[1.0rem] lg:text-[1.1rem]
                  text-center md:text-left
                "
                style={{ color: "#645F5A" }}
              >
                Jouw onderneming is uniek, en jouw website hoort dat ook te zijn.
                Ik bouw websites volledig op maat, zonder gebruik te maken van
                standaardtemplates. Samen creëren we een ontwerp dat perfect
                aansluit bij jouw wensen en uitstraling. Het design kan ik lokaal
                ontwikkelen, zodat je geen hostingkosten hebt totdat de site klaar
                is. Heb je al een website? Dan help ik je graag met aanpassingen,
                nieuwe functies of een complete redesign. Daarnaast ondersteun ik
                je bij het instellen van hosting, of neem ik dit – tegen vergoeding –
                volledig voor je uit handen. Ook verzorg ik de juiste SEO, zodat je
                website beter gevonden wordt. Na de lancering blijf ik beschikbaar
                voor updates en onderhoud. Elke maand update en back-up ik je
                website, zodat problemen tijdig worden voorkomen.
              </p>

              {/* BUTTON */}
              <div className="mt-8">
                <Link href="#contact-section" className="block">
                  <button
                    className="
                      w-full rounded-[10px] border-[3px]
                      text-center text-[0.9rem] md:text-[1.0rem] lg:text-[1.1rem] font-medium
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
                    Contact
                  </button>
                </Link>
              </div>
            </div>
          </div>

{/* === PC IMAGE COLUMN WITH EFFECT === */}
<div className="md:col-span-5 flex justify-center md:justify-end items-center mt-6 md:mt-0">
  <div
    className="
      w-full max-w-[320px]      /* ~40% smaller on mobile, centered */
      mx-auto
      md:max-w-[360px]         /* tablet: still smaller, side by side */
      lg:max-w-[380px]
      xl:max-w-[420px]
      md:mx-0 md:ml-4 lg:ml-6 xl:ml-10
      translate-y-4 md:translate-y-4 lg:translate-y-6
    "
  >
    <div className="pc-shell" style={pcStyle}>
      <img
        src="/images/Designs4suc6 - Ludo Koster pc.webp"
        alt="Ludo Koster op computerscherm"
        className="pc-shell-img"
      />
      <div className="pc-shell-rim" />
      <div className="pc-shell-overlay" />
    </div>
  </div>
</div>

        </div>
      </div>

      {/* === GLOBAL STYLES FOR PC EFFECT === */}
      <style jsx global>{`
        .pc-shell {
          /* defaults, overridden by inline style */
          --pc-width: 520px;
          --screen-top: 16%;
          --screen-left: 13%;
          --screen-width: 74%;
          --screen-height: 60%;
          --screen-radius: 6% / 9%;
          --overlay-opacity: 0.8;
          --phosphor-opacity: 0.12;
          --rim-opacity: 0.75;

          @keyframes rim-flicker {
            0%   { filter: brightness(1) contrast(1); }
            25%  { filter: brightness(1.03) contrast(1.01); }
            50%  { filter: brightness(1.06) contrast(1.02); }
            75%  { filter: brightness(1.03) contrast(1.01); }
            100% { filter: brightness(1) contrast(1); }
          }

          position: relative;
          width: min(100%, var(--pc-width));
        }

        .pc-shell-img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 10px;
        }

        /* helper to position overlay window */
        .pc-shell-rim,
        .pc-shell-overlay,
        .pc-shell::before {
          position: absolute;
          top: var(--screen-top);
          left: var(--screen-left);
          width: var(--screen-width);
          height: var(--screen-height);
          border-radius: var(--screen-radius);
          pointer-events: none;
        }

        /* Subtle RGB subpixel matrix (modern panel) */
        .pc-shell::before {
          content: "";
          background: repeating-linear-gradient(
            to right,
            rgba(255, 0, 0, 0.05) 0 1px,
            rgba(0, 255, 0, 0.05) 1px 2px,
            rgba(0, 0, 255, 0.05) 2px 3px,
            transparent 3px 4px
          );
          mix-blend-mode: overlay;
          opacity: var(--phosphor-opacity);
        }

        /* Glossy rim with subtle LED flicker */
        .pc-shell-rim {
          position: absolute;
          top: var(--screen-top);
          left: var(--screen-left);
          width: var(--screen-width);
          height: var(--screen-height);
          border-radius: var(--screen-radius);
          pointer-events: none;

          box-shadow:
            inset 0 0 8px 3px rgba(255, 255, 255, 0.75),
            inset 0 0 20px 10px rgba(220, 225, 235, 0.42),
            inset 0 0 40px 18px rgba(200, 205, 215, 0.30);

          mix-blend-mode: screen;
          opacity: var(--rim-opacity, 0.65);
          animation: rim-flicker 4.8s ease-in-out infinite;
        }

        /* Glass, bloom, reflection, very light scanlines */
        .pc-shell-overlay {
          background:
            radial-gradient(
              70% 50% at 50% 50%,
              rgba(255, 255, 255, 0.04),
              rgba(255, 255, 255, 0) 60%
            ),
            linear-gradient(
              150deg,
              rgba(255, 255, 255, 0.18) 0%,
              rgba(255, 255, 255, 0.08) 18%,
              rgba(255, 255, 255, 0.01) 45%,
              rgba(255, 255, 255, 0) 75%
            ),
            radial-gradient(
              130% 100% at 50% 50%,
              rgba(0, 0, 0, 0.20) 100%,
              rgba(0, 0, 0, 0) 55%
            );

          box-shadow:
            inset 0 0 12px rgba(255, 255, 255, 0.25),
            inset 0 0 36px rgba(0, 0, 0, 0.25);

          opacity: 0.55;
          animation: none;
        }

        /* legacy CRT animations kept but unused */
        @keyframes pc-tv-scan {
          0% {
            background-position: 0 0, 0 0, 0 0, 0 0;
          }
          100% {
            background-position: 0 0, 0 0, 0 0, 0 6px;
          }
        }

        @keyframes pc-tv-flicker {
          0%,
          100% {
            filter: brightness(1) contrast(1);
          }
          50% {
            filter: brightness(1.03) contrast(1.02);
          }
        }

        @keyframes pc-tube-flicker {
          0%,
          8% {
            opacity: 0.58;
            filter: brightness(1);
          }
          9% {
            opacity: 0.76;
            filter: brightness(1.05);
          }
          12% {
            opacity: 0.54;
            filter: brightness(0.98);
          }
          25% {
            opacity: 0.66;
            filter: brightness(1.02);
          }
          50% {
            opacity: 0.6;
            filter: brightness(1);
          }
          72% {
            opacity: 0.68;
            filter: brightness(1.03);
          }
          100% {
            opacity: 0.62;
            filter: brightness(1.01);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pc-shell-overlay,
          .pc-shell-rim {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;
