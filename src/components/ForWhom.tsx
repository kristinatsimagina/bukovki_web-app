"use client";

import { useState } from "react";
import Image from "next/image";

const cards = [
  {
    id: 1,
    title: "Новый Дом",
    name: "Маша",
    text: "Мы переехали из России, когда сыну было 3 года. Сейчас он ходит в международную школу, отлично говорит по-английски, учит язык страны. А вот русскоязычной среды у него почти нет, русский у нас только в семье. Я бы хотела мягко поддерживать русский, чтобы у сына оставалась связь с большой семьёй в России, с культурой. Хочу, чтобы он мог читать по-русски — и чтобы это было для него в радость, а не в нагрузку.",
    accentColor: "#4CAF82",
    borderColor: "#4CAF82",
    imageSrc: "/images/for-whom-masha.png",
    imageAlt: "Маша",
  },
  {
    id: 2,
    title: "Первый Интерес",
    name: "Аня",
    text: "Моей дочке 4 года, и она вдруг начала замечать буквы везде — на вывесках, на упаковках, листает книжки и спрашивает: «Мама, а это какая буква?». Я вижу, что ей интересно, но не уверена — не рано ли учить читать? Многие говорят, что до пяти лет не надо. Я бы хотела поддержать этот интерес — но так, чтобы не сидеть над букварями и прописями.",
    accentColor: "#F0922B",
    borderColor: "#F0922B",
    imageSrc: "/images/for-whom-anya.png",
    imageAlt: "Аня",
  },
  {
    id: 3,
    title: "Любимый Голос",
    name: "Дима",
    text: "Моё любимое время — вечернее чтение с сыном. Он засыпает меня вопросами, впитывает всё, что я рассказываю — просто как губка! Помню, как в детстве папа читал мне книги про приключения, изображая героев разными голосами. Он делал это так смешно, что я мечтал научиться читать так же. Это одни из самых тёплых моих воспоминаний, и я хочу дать своему сыну такой же опыт.",
    accentColor: "#7C83D4",
    borderColor: "#7C83D4",
    imageSrc: "/images/for-whom-dima.png",
    imageAlt: "Дима",
  },
];

// Sticky top offsets for desktop stack
const stickyTops = ["0px", "60px", "120px"];

export default function ForWhom() {
  // Mobile accordion: first card open by default
  const [openCard, setOpenCard] = useState<number>(1);

  return (
    <section className="w-full bg-white">

      {/* ===== DESKTOP: sticky stack (hidden on mobile) ===== */}
      <div
        className="hidden md:block"
        style={{ minHeight: `calc(3 * 100vh)` }}
      >
        {cards.map((card, i) => (
          <div
            key={card.id}
            className="sticky w-full flex justify-center"
            style={{
              top: stickyTops[i],
              zIndex: 10 + i,
            }}
          >
            <div
              className="w-full"
              style={{ maxWidth: 800 }}
            >
              <div
                className="bg-white rounded-2xl shadow-md mx-4 lg:mx-auto"
                style={{
                  borderTop: `4px solid ${card.borderColor}`,
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  className="flex flex-row items-center gap-10 p-10"
                >
                  {/* Illustration — left column */}
                  <div
                    className="flex-shrink-0"
                    style={{
                      width: 280,
                      height: 280,
                      position: "relative",
                      borderRadius: 16,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      style={{ objectFit: "cover", borderRadius: "16px" }}
                      sizes="280px"
                    />
                  </div>

                  {/* Text — right column */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h2
                      className="text-gray-900 mb-1 leading-tight"
                      style={{
                        fontFamily: "'Made Barista', serif",
                        fontSize: 36,
                      }}
                    >
                      {card.title}
                    </h2>
                    <p
                      className="font-semibold mb-5"
                      style={{ color: "#9CA3AF", fontSize: 15 }}
                    >
                      {card.name}
                    </p>
                    <p
                      className="text-gray-700 font-[Nunito,sans-serif]"
                      style={{ fontSize: 16, lineHeight: 1.6 }}
                    >
                      {card.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== MOBILE: accordion (hidden on desktop) ===== */}
      <div className="md:hidden flex flex-col gap-3 px-4 py-8">
        {cards.map((card) => {
          const isOpen = openCard === card.id;

          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
              style={{ borderTop: `4px solid ${card.borderColor}` }}
            >
              {/* Accordion header — always visible */}
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpenCard(isOpen ? 0 : card.id)}
                aria-expanded={isOpen}
                aria-controls={`card-body-${card.id}`}
              >
                <span
                  className="text-gray-900 leading-tight"
                  style={{
                    fontFamily: "'Made Barista', serif",
                    fontSize: 24,
                  }}
                >
                  {card.title}
                </span>
                {/* Chevron icon */}
                <span
                  className="ml-4 flex-shrink-0 text-gray-400 transition-transform duration-300"
                  style={{
                    display: "inline-block",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              {/* Accordion body */}
              <div
                id={`card-body-${card.id}`}
                style={{
                  overflow: "hidden",
                  maxHeight: isOpen ? "600px" : "0px",
                  transition: "max-height 0.35s ease",
                }}
              >
                {/* Illustration — full width */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    position: "relative",
                  }}
                >
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    style={{ objectFit: "cover", borderRadius: "16px" }}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>

                {/* Text body */}
                <div className="px-5 py-5">
                  <p
                    className="font-semibold mb-3"
                    style={{ color: "#9CA3AF", fontSize: 14 }}
                  >
                    {card.name}
                  </p>
                  <p
                    className="text-gray-700"
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontSize: 15,
                      lineHeight: 1.6,
                    }}
                  >
                    {card.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* prefers-reduced-motion: disable chevron transition */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-reduced-motion] { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
