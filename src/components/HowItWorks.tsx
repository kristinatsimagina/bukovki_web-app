"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ─── Данные пунктов ───────────────────────────────────────────────────────────
const STEPS = [
  {
    title: "Волшебные Страницы",
    text: "Качественные иллюстрации, созданные художником, разнообразный мир, по которому интересно путешествовать, яркие ассоциативные образы букв. Буковки — это книга, которую приятно держать в руках, к которой хочется возвращаться.",
    color: "#A8D5A2",
  },
  {
    title: "Настоящее Приключение",
    text: "Приключенческий сюжет, герои-дети, понятные маленькому читателю, задания, вписанные прямо в историю — ребёнок становится активным участником происходящего и сам просит читать дальше.",
    color: "#F4C97E",
  },
  {
    title: "Естественный Темп",
    text: "Буквы появляются в том порядке, в котором они появляются в речи. Слова для первого чтения простые и понятные современному ребёнку. Уже в первых главах ребёнок прочитает свой первый текст и почувствует себя настоящим читателем.",
    color: "#A8C8E8",
  },
  {
    title: "Объёмный Мир",
    text: "Буковки не только про чтение. Живые эмоции персонажей, сложные ситуации, богатый язык — всё это развивает речь, логику и эмоциональный интеллект. Обсуждайте, ищите решения, делайте открытия — вы отправляетесь в это приключение вместе с ребёнком.",
    color: "#E8A8C8",
  },
  {
    title: "Гибкий Формат",
    text: "Книги на русском языке за рубежом бывает непросто достать, поэтому мы сделали Буковки в цифровом формате для планшета. Читайте ребёнку сами или слушайте в озвучке, выполняйте интерактивные задания на экране — это не игровое приложение, а всё те же Буковки, красивая книга для вдумчивого чтения, доступная в любой точке мира.",
    color: "#C8A8E8",
  },
] as const;

// ─── Координаты кустов — desktop (в % от ширины/высоты контейнера) ────────────
// Нечётные (0,2,4) — слева, чётные (1,3) — справа
const DESKTOP_POSITIONS = [
  { xPct: 20, yPct: 10 }, // 0 — левый
  { xPct: 75, yPct: 28 }, // 1 — правый
  { xPct: 20, yPct: 46 }, // 2 — левый
  { xPct: 75, yPct: 64 }, // 3 — правый
  { xPct: 48, yPct: 82 }, // 4 — центр
] as const;

// ─── SVG viewBox параметры ────────────────────────────────────────────────────
const VB_W = 1000;
const VB_H = 1000;

// Точки пути в координатах SVG viewBox (соответствуют DESKTOP_POSITIONS)
const BUSH_CENTERS_SVG = DESKTOP_POSITIONS.map((p) => ({
  x: (p.xPct / 100) * VB_W,
  y: (p.yPct / 100) * VB_H,
}));

// Строим кубический bezier через все 5 точек.
// Для каждого сегмента используем cp1 = точка1 сдвинутая по y вниз,
// cp2 = точка2 сдвинутая по y вверх — даёт плавный S-изгиб.
function buildPath(pts: { x: number; y: number }[]): string {
  if (pts.length === 0) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const dy = (curr.y - prev.y) * 0.55;
    const cp1x = prev.x;
    const cp1y = prev.y + dy;
    const cp2x = curr.x;
    const cp2y = curr.y - dy;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

const desktopPathD = buildPath(BUSH_CENTERS_SVG);

// ─── Мобильный SVG — вертикальная волна ──────────────────────────────────────
const MOB_VB_W = 100;
const MOB_VB_H = 900;

// Мобильные позиции кустов (в % от mob viewBox)
const MOB_BUSH_CENTERS = [
  { x: 30, y: 8 },
  { x: 70, y: 24 },
  { x: 30, y: 40 },
  { x: 70, y: 57 },
  { x: 50, y: 73 },
] as const;

const mobilePathD = buildPath(
  MOB_BUSH_CENTERS.map((p) => ({ x: p.x, y: (p.y / 100) * MOB_VB_H }))
);

// ─── Компонент ────────────────────────────────────────────────────────────────
export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(-1); // -1 = ещё не начали
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Определяем prefers-reduced-motion один раз
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
  }, []);

  // IntersectionObserver — запускает анимацию, когда секция входит во viewport
  useEffect(() => {
    if (prefersReduced) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && step === -1) {
          setStep(0);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced, step]);

  // Последовательно переводим мотылька от куста к кусту
  useEffect(() => {
    if (step < 0 || step >= STEPS.length - 1) return;
    const timer = setTimeout(() => setStep((s) => s + 1), 900);
    return () => clearTimeout(timer);
  }, [step]);

  // ─── Вычисляем текущую позицию мотылька на desktop (в % от контейнера) ────
  const butterflyIndex = prefersReduced ? 0 : step < 0 ? 0 : step;
  const fallbackSvgPos = { x: BUSH_CENTERS_SVG[0]?.x ?? 0, y: BUSH_CENTERS_SVG[0]?.y ?? 0 };
  const butterflySvgPos = BUSH_CENTERS_SVG[butterflyIndex] ?? fallbackSvgPos;

  // Переводим SVG координаты в % для абсолютного позиционирования
  // Смещаем центр мотылька (-25px / размер контейнера), но проще — offset в px через transform
  const bfLeftPct = (butterflySvgPos.x / VB_W) * 100;
  const bfTopPct = (butterflySvgPos.y / VB_H) * 100;

  // ─── Мобильный мотылёк ───────────────────────────────────────────────────
  const fallbackMobPos = { x: MOB_BUSH_CENTERS[0]?.x ?? 30, y: MOB_BUSH_CENTERS[0]?.y ?? 8 };
  const mobBfPos = MOB_BUSH_CENTERS[butterflyIndex] ?? fallbackMobPos;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-20 px-4 overflow-hidden"
      aria-label="Как это работает"
    >
      {/* Заголовок секции */}
      <div className="text-center mb-12">
        <h2
          style={{
            fontFamily: "'Made Barista', serif",
            fontSize: "clamp(26px, 4vw, 40px)",
            color: "#1a1a4e",
            lineHeight: 1.3,
          }}
        >
          Как это работает
        </h2>
      </div>

      {/* ════════════════════════════════════════════════════
          DESKTOP-версия (≥768px)
      ════════════════════════════════════════════════════ */}
      <div
        className="hidden md:block relative mx-auto"
        style={{ maxWidth: 860, minHeight: 900 }}
      >
        {/* SVG дорожка */}
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <path
            d={desktopPathD}
            stroke="#D4A843"
            strokeWidth="3"
            strokeDasharray="8 6"
            fill="none"
          />
        </svg>

        {/* 5 кустов */}
        {STEPS.map((s, i) => {
          const pos = DESKTOP_POSITIONS[i]!;
          const isLeft = i % 2 === 0;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${pos.xPct}%`,
                top: `${pos.yPct}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 20,
                  flexDirection: isLeft ? "row" : "row-reverse",
                }}
              >
                {/* Куст-заглушка */}
                {/* TODO: заменить на <Image src={`/images/bush-${i + 1}.png`} width={80} height={80} alt="" /> */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: s.color,
                    flexShrink: 0,
                  }}
                />

                {/* Текст */}
                <div
                  style={{
                    maxWidth: 260,
                    textAlign: isLeft ? "left" : "right",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Made Barista', serif",
                      fontSize: 22,
                      color: "#1a1a4e",
                      marginBottom: 6,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontSize: 15,
                      color: "#4B5563",
                      lineHeight: 1.6,
                    }}
                  >
                    {s.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Мотылёк (desktop) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: `${bfLeftPct}%`,
            top: `${bfTopPct}%`,
            transform: `translate(-50%, -60px)`,
            width: 50,
            height: 50,
            transition: step >= 0 ? "left 0.8s ease-in-out, top 0.8s ease-in-out" : "none",
            animation: prefersReduced ? "none" : "flutter 0.4s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <Image
            src="/images/butterfly.png"
            alt=""
            width={50}
            height={50}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          MOBILE-версия (<768px)
      ════════════════════════════════════════════════════ */}
      <div className="block md:hidden relative mx-auto" style={{ maxWidth: 420 }}>
        {/* Обёртка с фиксированной высотой для SVG позиционирования */}
        <div className="relative" style={{ paddingBottom: "220%" }}>
          {/* SVG дорожка — мобильная */}
          <svg
            viewBox={`0 0 ${MOB_VB_W} ${MOB_VB_H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <path
              d={mobilePathD}
              stroke="#D4A843"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              fill="none"
            />
          </svg>

          {/* 5 кустов — мобильные */}
          {STEPS.map((s, i) => {
            const pos = MOB_BUSH_CENTERS[i]!;
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isLeft ? "flex-start" : "flex-end",
                    gap: 8,
                    width: 160,
                    marginLeft: isLeft ? 0 : -80,
                    marginRight: isLeft ? -80 : 0,
                  }}
                >
                  {/* Куст-заглушка */}
                  {/* TODO: заменить на <Image src={`/images/bush-${i + 1}.png`} width={56} height={56} alt="" /> */}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      backgroundColor: s.color,
                      flexShrink: 0,
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'Made Barista', serif",
                      fontSize: 16,
                      color: "#1a1a4e",
                      lineHeight: 1.3,
                      textAlign: isLeft ? "left" : "right",
                    }}
                  >
                    {s.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontSize: 13,
                      color: "#4B5563",
                      lineHeight: 1.6,
                      textAlign: isLeft ? "left" : "right",
                    }}
                  >
                    {s.text}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Мотылёк (mobile) */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${mobBfPos.x}%`,
              top: `${mobBfPos.y}%`,
              transform: "translate(-50%, -62px)",
              width: 40,
              height: 40,
              transition: step >= 0 ? "left 0.8s ease-in-out, top 0.8s ease-in-out" : "none",
              animation: prefersReduced ? "none" : "flutter 0.4s ease-in-out infinite",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <Image
              src="/images/butterfly.png"
              alt=""
              width={40}
              height={40}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      {/* flutter-анимация — inline @keyframes через style-tag */}
      <style>{`
        @keyframes flutter {
          0%   { transform: translate(-50%, -60px) scaleX(1); }
          50%  { transform: translate(-50%, -60px) scaleX(0.3); }
          100% { transform: translate(-50%, -60px) scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-butterfly] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
