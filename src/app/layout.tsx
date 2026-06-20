import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "БУKOVKI — букварь нового поколения",
  description:
    "Волшебные иллюстрации, приключенческий сюжет и задания, вписанные прямо в историю.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${nunito.variable} h-full`}>
      <body className="min-h-full font-[family-name:var(--font-nunito)] antialiased">
        {children}
      </body>
    </html>
  );
}
