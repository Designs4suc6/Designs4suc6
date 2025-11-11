// app/fonts.ts
import localFont from "next/font/local";

export const gontserrat = localFont({
  src: [
    { path: "../public/fonts/Gontserrat-Regular.ttf", weight: "400", style: "normal" },
  ],
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Arial"],
  adjustFontFallback: "Arial",   // ← fix: valid values are 'Arial' | 'Times New Roman' | false
  preload: true,
});
