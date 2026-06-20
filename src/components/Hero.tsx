"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="flex flex-col lg:flex-row min-h-screen w-full"
      >
        {/* Иллюстрация — на мобиле сверху, на десктопе справа */}
        <div className="order-first lg:order-last lg:w-1/2 h-[280px] lg:h-auto flex-shrink-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm tracking-wide">
            Иллюстрация
          </span>
        </div>

        {/* Текстовый блок */}
        <div className="lg:w-1/2 flex items-center px-8 py-16 lg:px-16 xl:px-24">
          <div className="max-w-lg w-full">
            <h1
              className="font-serif text-[2rem] leading-tight lg:text-[2.75rem] lg:leading-snug mb-6 text-gray-900"
              style={{ fontFamily: "'Made Barista', serif" }}
            >
              «Мама, я прочитал&nbsp;это сам!»
            </h1>

            <p className="text-lg lg:text-xl leading-relaxed text-gray-600 mb-10">
              БУKOVKI — букварь нового поколения. Волшебные иллюстрации,
              приключенческий сюжет и задания, вписанные прямо в историю.
            </p>

            {/* CTA — скрыта на мобиле (там sticky), видна на десктопе */}
            <div className="hidden lg:block">
              <CtaButton />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA — только на мобиле, пока Hero в viewport */}
      <div
        className={`
          lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe
          transition-transform duration-300
          ${heroVisible ? "translate-y-0" : "translate-y-full"}
        `}
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <CtaButton fullWidth />
      </div>
    </>
  );
}

function CtaButton({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <a
      href="#trial"
      className={`
        inline-flex items-center justify-center
        h-14 rounded-2xl px-8
        bg-[#1a1a4e] text-white text-base font-semibold
        transition-colors duration-200
        hover:bg-[#2a2a6e] active:bg-[#141438]
        ${fullWidth ? "w-full" : ""}
      `}
    >
      Попробовать бесплатно
    </a>
  );
}
