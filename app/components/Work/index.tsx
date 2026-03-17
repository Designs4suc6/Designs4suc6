"use client";

import { useEffect, useState } from "react";

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

export default function Portfolio() {
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [pendingSnapIndex, setPendingSnapIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      if (window.innerWidth < 768) {
        setViewport("mobile");
      } else if (window.innerWidth < 1024) {
        setViewport("tablet");
      } else {
        setViewport("desktop");
      }
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isMobile = viewport === "mobile";
  const isTablet = viewport === "tablet";
  const isDesktop = viewport === "desktop";

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
        "/images/Portfolio - Trouwe4voeter.webp",
        "/images/Portfolio - Trouwe4voeter Tablet & Mobile.webp",
      ],
      heading: "Trouwe4voeter",
      subheading:
        "Uw hondentrimster voor de regio Wageningen. Voor de complete vachtverzorging van uw hond, groot of klein.",
      url: "https://www.trouwe4voeter.nl/",
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

  const pageCount = cardData.length;
  const maxSlide = Math.max(0, pageCount - 1);
  const slideGap = isMobile ? 80 : isTablet ? 56 : 72;

  const loopedSlides =
    cardData.length > 1
      ? [cardData[cardData.length - 1], ...cardData, cardData[0]]
      : cardData;

  const getDotIndex = (slideIndex: number) => {
    if (cardData.length <= 1) return 0;
    if (slideIndex === 0) return cardData.length - 1;
    if (slideIndex === cardData.length + 1) return 0;
    return slideIndex - 1;
  };

  useEffect(() => {
    setCurrentSlide((prev) => {
      if (cardData.length <= 1) return 0;
      if (prev < 1) return 1;
      if (prev > cardData.length) return cardData.length;
      return prev;
    });
  }, [cardData.length, maxSlide]);

  useEffect(() => {
    if (pendingSnapIndex === null) return;

    let raf1 = 0;
    let raf2 = 0;

    raf1 = requestAnimationFrame(() => {
      setCurrentSlide(pendingSnapIndex);
      raf2 = requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
        setPendingSnapIndex(null);
        const unlockDelay = 90;
    window.setTimeout(() => {
      setIsAnimating(false);
    }, unlockDelay);
      });
    });

    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [pendingSnapIndex]);

  const handleTrackTransitionEnd = (e: any) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (cardData.length <= 1) return;

    if (currentSlide === 0) {
      setIsTransitionEnabled(false);
      setPendingSnapIndex(cardData.length);
      return;
    }

    if (currentSlide === cardData.length + 1) {
      setIsTransitionEnabled(false);
      setPendingSnapIndex(1);
      return;
    }

    setIsAnimating(false);
  };

  const nextSlide = () => {
    if (cardData.length <= 1 || isAnimating || pendingSnapIndex !== null) return;
    setIsAnimating(true);
    setIsTransitionEnabled(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (cardData.length <= 1 || isAnimating || pendingSnapIndex !== null) return;
    setIsAnimating(true);
    setIsTransitionEnabled(true);
    setCurrentSlide((prev) => prev - 1);
  };

  return (
    <section
      id="portfolio-section"
      className="bg-[#EAEAEA] pt-10 md:pt-12 lg:pt-14 pb-6 md:pb-8 lg:pb-9 relative"
      aria-labelledby="portfolio-title"
    >
      <div className="mx-auto max-w-[88rem] px-6">
        <div
          className="p-8 border-[5px] rounded-[10px]"
          style={{ borderColor: "#BCC0C2", backgroundColor: "#E5E5E5" }}
        >
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

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 items-center relative">
            <div className="hidden lg:flex justify-end pr-20">
              <img
                src="/images/Designs4suc6_logo_grey.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none h-32 w-auto opacity-100"
                style={{ transform: "translateY(-15%)" }}
              />
            </div>

            <div className="w-full flex justify-center">
              <Card item={featured} isMobile={isMobile} />
            </div>

            <div className="hidden lg:flex justify-start pl-20">
              <img
                src="/images/Designs4suc6_logo_grey.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none h-32 w-auto opacity-70"
                style={{ transform: "translateY(-15%)" }}
              />
            </div>
          </div>

          <div className="mt-10">
            <div className="mx-auto max-w-[78rem]">
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Vorige projecten"
                  className="flex items-center justify-center rounded-[10px] border-[3px] transition duration-300"
                  style={{
                    color: "#645F5A",
                    backgroundColor: "#E5E5E5",
                    borderColor: "#BCC0C2",
                    width: isMobile ? "36px" : "55px",
                    height: isMobile ? "36px" : "55px",
                    fontSize: isMobile ? "18px" : "25px",
                    lineHeight: 1,
                  }}
                >
                  ←
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: pageCount }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (isAnimating || pendingSnapIndex !== null) return;
                        setIsAnimating(true);
                        setIsTransitionEnabled(true);
                        setCurrentSlide(idx + 1);
                      }}
                      aria-label={`Ga naar slide ${idx + 1}`}
                      className="h-3.5 rounded-full transition-all duration-300"
                      style={{
                        width: getDotIndex(currentSlide) === idx ? "2.25rem" : "0.875rem",
                        backgroundColor:
                          getDotIndex(currentSlide) === idx ? "#C3373D" : "#BCC0C2",
                      }}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Volgende projecten"
                  className="flex items-center justify-center rounded-[10px] border-[3px] transition duration-300"
                  style={{
                    color: "#645F5A",
                    backgroundColor: "#E5E5E5",
                    borderColor: "#BCC0C2",
                    width: isMobile ? "36px" : "55px",
                    height: isMobile ? "36px" : "55px",
                    fontSize: isMobile ? "18px" : "25px",
                    lineHeight: 1,
                  }}
                >
                  →
                </button>
              </div>

              <div className="relative overflow-hidden px-0 lg:px-4 py-4">
                <div
                  className={`flex ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isTransitionEnabled
                      ? isMobile
                        ? "transition-transform duration-[850ms]"
                        : isTablet
                        ? "transition-transform duration-[1100ms]"
                        : "transition-transform duration-[1150ms]"
                      : "transition-none"
                  }`}
                  style={{
                    transform: `translateX(calc(-${currentSlide * 100}% - ${currentSlide * slideGap}px))`,
                  }}
                  onTransitionEnd={handleTrackTransitionEnd}
                >
                  {loopedSlides.map((item, idx) => (
                    <div key={`frame-${idx}`} className="contents">
                      <div className="w-full flex-shrink-0">
                        <div className="flex justify-center">
                          <div className="w-full max-w-[24rem]">
                            <Card item={item} isMobile={isMobile} />
                          </div>
                        </div>
                      </div>
                      {idx < loopedSlides.length - 1 ? (
                        <div
                          key={`gap-${idx}`}
                          className="flex-shrink-0"
                          aria-hidden="true"
                          style={{ width: `${slideGap}px` }}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .service-card {
          transition: box-shadow 0.5s ease, transform 0.5s ease;
        }
        .service-card:hover {
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.16),
            0 3px 8px rgba(0, 0, 0, 0.08);
          transform: translateY(-3px);
        }
        @media (max-width: 1023px) {
          .service-card:hover {
            box-shadow: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

function getPalette(heading: string, isMobile: boolean): Palette {
  const isAlternate =
    heading === "KPSA" ||
    heading === "Farm-32" ||
    heading === "Dogs4suc6";

  if (isAlternate) {
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
  const isDesktop = !isMobile;
  const disableHoverImageSwap = typeof window !== "undefined" && window.innerWidth < 1024;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hasChangedOnce, setHasChangedOnce] = useState(false);

  const palette = getPalette(item.heading, isMobile);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (!disableHoverImageSwap && isDesktop && isHovering && item.images.length > 1) {
      if (!hasChangedOnce) {
        const t = setTimeout(() => {
          setCurrentImageIndex(1);
          setHasChangedOnce(true);
        }, 0);
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
  }, [disableHoverImageSwap, isDesktop, isHovering, item.images.length, hasChangedOnce]);

  return (
    <article
      className="service-card h-full min-h-[30rem] md:min-h-[34rem] flex flex-col rounded-[10px] overflow-hidden w-full max-w-[24rem] mx-auto"
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

      <div className="flex-1 flex flex-col p-3 md:p-4">
        <h3
          className="text-center inline-block pb-2 border-b-[5px] text-[1.1rem] md:text-[1.3rem] lg:text-[1.4rem] font-semibold self-center"
          style={{ color: "#C3373D", borderColor: palette.underline }}
        >
          {item.heading}
        </h3>

        <p
          className="mt-2 leading-relaxed text-[0.88rem] md:text-[1rem] text-center md:text-left"
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
                className="w-full rounded-[10px] border-[3px] text-center text-[0.9rem] md:text-[1rem] lg:text-[1.1rem] font-medium py-[10px] px-0 transition duration-300"
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
