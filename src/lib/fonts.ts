import localFont from "next/font/local";

export const ebGaramond = localFont({
  src: [
    {
      path: "../fonts/EBGaramond-VariableFont_wght.ttf",
      weight: "400 800",
      style: "normal",
    },
    {
      path: "../fonts/EBGaramond-Italic-VariableFont_wght.ttf",
      weight: "400 800",
      style: "italic",
    },
  ],
  variable: "--font-eb-garamond",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});
