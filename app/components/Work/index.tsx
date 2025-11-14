"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Portfolio() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cardData: CardItem[] = [
    {
      images: [
        "/images/Portfolio - KPSA.webp",
        "/images/Portfolio - KPSA Tablet & Mobile.webp",
      ],
      heading: "KPSA",
      subheading:
        "At KPSA, we help companies and initiatives take the next step. Our focus is on strategy, funding and execution. With a hands-on approach that goes beyond advice.",
      url: "https://kpsa.nl/",
    },
    {
      images: [
        "/images/Portfolio - Like-Fresh.webp",
        "/images/Portfolio - Like-Fresh Tablet & Mobile.webp",
      ],
      heading: "Like Fresh",
      subheading:
        "Like-Fresh is the next level experience in plant based dairy. Made special for flexitarians, vegetarians and vegans.",
      url: "https://like-fresh.com/",
    },
    {
      images: [
        "/images/Portfolio_farm-32.webp",
        "/images/Portfolio farm-32 Tablet & Mobile.webp",
      ],
      heading: "Farm-32",
      subheading:
        "Farm-32's mission is clear: to guarantee food security, anywhere, anytime, through clean energy and sustainable farming techniques.",
      url: "https://farm-32.nl/",
    },
  ];

  const featured: CardItem = {
    images: [
      "/images/Dogs4suc6mediashare.webp",
      "/images/Portfolio - Dogs4suc6 Tablet & Mobile.webp",
    ],
    heading: "Dogs4suc6",
    subheading:
      "Voor mijn eigen hondenschoolwebsite heb ik alles volledig zelf opgebouwd: van interactieve stappenplannen en contactformulieren tot videospelers en meer.",
    url: "https://dogs4suc6.nl/",
  };

  return (
<section
  id="portfolio-section"
  className="
    bg-[#EAEAEA]
    pt-10 md:pt-12 lg:pt-14
    pb-6 md:pb-7.5 lg:pb-9
    relative
  "
  aria-labelledby="portfolio-title"
>

      <div className="mx-auto max-w-[88rem] px-6">
        <div
          className="p-8 border-[5px] rounded-[10px]"
          style={{ borderColor: "#BCC0C2", backgroundColor: "#E5E5E5" }}
        >
          {/* === HEADER === */}
          <header className="mx-auto text-center">
            <h2
              id="portfolio-title"
              className="font-semibold pb-2 mx-auto text-center inline-block text-[1.2rem] md:text-[1.4rem] lg:text-[1.5rem] border-b-[5px]"
              style={{ color: "#C3373D", borderColor: "#BCC0C2" }}
            >
              Portfolio
            </h2>
            <p
              className="mt-6 leading-relaxed mx-auto text-[0.95rem] md:text-[1.05rem] lg:text-[1.1rem] text-center"
              style={{ color: "#645F5A" }}
            >
              Bekijk hier enkele van mijn eerdere projecten. Elk design is uniek
              én volledig responsive op tablet en mobiel.
            </p>
          </header>

          {/* === FEATURED CARD WITH SIDE LOGOS (centered, enlarged) === */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 items-center relative">
            {/* LEFT GREY LOGO */}
            <div className="hidden lg:flex justify-end pr-20">
              <img
                src="/images/Designs4suc6_logo_grey.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none h-32 w-auto opacity-100"
                style={{
                  transform: "translateY(-15%)",
                }}
              />
            </div>

            {/* FEATURED CARD */}
            <div className="w-full flex justify-center">
              <Card item={featured} isMobile={isMobile} />
            </div>

            {/* RIGHT GREY LOGO */}
            <div className="hidden lg:flex justify-start pl-20">
              <img
                src="/images/Designs4suc6_logo_grey.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none h-32 w-auto opacity-70"
                style={{
                  transform: "translateY(-15%)",
                }}
              />
            </div>
          </div>

          {/* === PORTFOLIO GRID === */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-stretch">
            {cardData.map((item, idx) => (
              <Card key={idx} item={item} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>

      {/* === CARD HOVER EFFECT === */}
      <style jsx global>{`
        .service-card {
          transition: box-shadow 0.5s ease, transform 0.5s ease;
        }
        .service-card:hover {
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2),
            0 4px 10px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
}

interface CardItem {
  images: string[];
  heading: string;
  subheading: string;
  url: string;
}

type Palette = {
  cardBg: string;
  border: string;
  underline: string;
  divider: string;
  buttonBg: string;
  buttonBorder: string;
  imageBg: string;
};

function getPalette(heading: string, isMobile: boolean): Palette {
  let isAlternate: boolean;

  if (isMobile) {
    // Mobile: Dogs4suc6 and Like Fresh use the dark variant
    isAlternate = heading === "Dogs4suc6" || heading === "Like Fresh";
  } else {
    // Tablet and desktop: existing alternation
    isAlternate =
      heading === "KPSA" ||
      heading === "Farm-32" ||
      heading === "Dogs4suc6";
  }

  if (isAlternate) {
    // Alternate palette (dark): KPSA / Farm-32 / Dogs4suc6 on larger screens,
    // Dogs4suc6 and Like Fresh on mobile
    return {
      cardBg: "#D1D5DB",
      border: "#645F5A",
      underline: "#645F5A",
      divider: "#645F5A",
      buttonBg: "#D1D5DB",
      buttonBorder: "#645F5A",
      imageBg: "#D1D5DB",
    };
  }

  // Default palette (light)
  return {
    cardBg: "#E5E5E5",
    border: "#BCC0C2",
    underline: "#BCC0C2",
    divider: "#BCC0C2",
    buttonBg: "#E5E5E5",
    buttonBorder: "#BCC0C2",
    imageBg: "#E5E5E5",
  };
}

function Card({
  item,
  isMobile,
}: {
  item: CardItem;
  isMobile: boolean;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hasChangedOnce, setHasChangedOnce] = useState(false);

  const palette = getPalette(item.heading, isMobile);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isHovering && item.images.length > 1) {
      if (!hasChangedOnce) {
        const t = setTimeout(() => {
          setCurrentImageIndex(1);
          setHasChangedOnce(true);
        }, 0); // was 100
        return () => clearTimeout(t);
      } else {
        intervalId = setInterval(() => {
          setCurrentImageIndex((prev) =>
            prev === item.images.length - 1 ? 0 : prev + 1
          );
        }, 20000);
      }
    } else {
      setCurrentImageIndex(0);
      setHasChangedOnce(false);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovering, item.images.length, hasChangedOnce]);

  return (
    <article
      className="
        service-card h-full flex flex-col rounded-[10px] overflow-hidden
        w-full max-w-[24rem] md:max-w-[20rem] lg:max-w-[22rem] mx-auto
      "
      style={{
        backgroundColor: palette.cardBg,
        borderColor: palette.border,
        borderWidth: "3px",
        borderStyle: "solid",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setCurrentImageIndex(0);
      }}
    >
      {/* Image area */}
      <div
        className="relative w-full"
        style={{
          backgroundColor: palette.imageBg,
        }}
      >
        <div className="aspect-[16/10] w-full relative overflow-hidden rounded-t-[8px]">
          {item.images.map((src, i) => {
            const isActive = i === currentImageIndex;
            const isHoverFrame = i > 0;

            const TOP_BIAS_MAIN = 0.1;
            const TOP_BIAS_HOVER = 0.05;
            const BASE_SCALE = 1.06;
            const HOVER_SCALE = 1.03;

            const bias = isHoverFrame ? TOP_BIAS_HOVER : TOP_BIAS_MAIN;
            const scale = isHoverFrame ? HOVER_SCALE : BASE_SCALE;

            return (
              <img
                key={i}
                src={src}
                alt={`${item.heading} image ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-out ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transform: `translateY(-${bias * 100}%) scale(${scale})`,
                  transformOrigin: "center top",
                  backgroundColor: "transparent",
                }}
                loading={i === 0 ? "eager" : "lazy"}
              />
            );
          })}
        </div>
      </div>

      {/* Text + bottom block */}
      <div className="flex-1 flex flex-col p-5">
        <h3
          className="text-center inline-block pb-2 border-b-[5px] text-[1.1rem] md:text-[1.3rem] lg:text-[1.4rem] font-semibold self-center"
          style={{ color: "#C3373D", borderColor: palette.underline }}
        >
          {item.heading}
        </h3>

        <p
          className="mt-3 leading-relaxed text-[0.9rem] md:text-[1.0rem] text-center md:text-left"
          style={{ color: "#645F5A" }}
        >
          {item.subheading}
        </p>

        <div className="mt-auto" />

        <div className="pt-4">
          <div
            className="border-t-[3px] w-full mx-auto"
            style={{ borderColor: palette.divider }}
          />
          <div className="mt-4">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button
                className="
                  w-full rounded-[10px] border-[3px]
                  text-center text-[0.9rem] md:text-[1.0rem] lg:text-[1.1rem] font-medium
                  py-[10px] px-0 transition duration-300
                "
                style={{
                  backgroundColor: palette.buttonBg,
                  color: "#645F5A",
                  borderColor: palette.buttonBorder,
                }}
                onMouseEnter={(e) => {
                  const t = e.currentTarget;
                  t.style.backgroundColor = "#FDD194";
                  t.style.color = "#AC1917";
                  t.style.borderColor = "#AC1917";
                }}
                onMouseLeave={(e) => {
                  const t = e.currentTarget;
                  t.style.backgroundColor = palette.buttonBg;
                  t.style.color = "#645F5A";
                  t.style.borderColor = palette.buttonBorder;
                }}
              >
                Naar site
              </button>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
