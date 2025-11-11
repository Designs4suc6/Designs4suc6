import localFont from "next/font/local";

export const gontserrat = localFont({
  src: [
    { path: "../public/fonts/Gontserrat-Regular.ttf", weight: "400", style: "normal" },
    // Optional extras if you wish:
    // { path: "../public/fonts/Gontserrat-Bold.ttf",    weight: "700", style: "normal" },
    // { path: "../public/fonts/Gontserrat-Medium.ttf",  weight: "500", style: "normal" },
  ],
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Arial"],
  adjustFontFallback: true,
  preload: true,
});
