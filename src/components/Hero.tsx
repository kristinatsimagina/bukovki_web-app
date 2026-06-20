"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white flex items-center justify-center">

      {/* === ЭЛЕМЕНТЫ КОЛЛАЖА === */}

      {/* Дерево — слева */}
      <div className="sticker" style={{
        left: "-2%", top: "5%", width: 320, height: 380,
        animationDelay: "0s", animationDuration: "5s"
      }}>
        <Image src="/images/tree.png" alt="Дерево" fill style={{ objectFit: "contain" }} />
      </div>

      {/* Куст — справа внизу */}
      <div className="sticker" style={{
        right: "2%", bottom: "8%", width: 260, height: 260,
        animationDelay: "1.2s", animationDuration: "4.5s"
      }}>
        <Image src="/images/bush.png" alt="Куст" fill style={{ objectFit: "contain" }} />
      </div>

      {/* Куст — слева внизу (тот же, зеркальный) */}
      <div className="sticker" style={{
        left: "5%", bottom: "5%", width: 180, height: 180,
        animationDelay: "2s", animationDuration: "5.5s",
        transform: "scaleX(-1)"
      }}>
        <Image src="/images/bush.png" alt="Куст" fill style={{ objectFit: "contain" }} />
      </div>

      {/* Старая Типография — правый верх */}
      <div className="sticker" style={{
        right: "4%", top: "5%", width: 220, height: 260,
        animationDelay: "0.5s", animationDuration: "4.2s"
      }}>
        <Image src="/images/typography.png" alt="Старая Типография" fill style={{ objectFit: "contain" }} />
      </div>

      {/* Котевич — правый центр */}
      <div className="sticker" style={{
        right: "3%", top: "45%", width: 160, height: 200,
        animationDelay: "1.8s", animationDuration: "4s"
      }}>
        <Image src="/images/kotevich.png" alt="Котевич" fill style={{ objectFit: "contain" }} />
      </div>

      {/* Мотылёк 1 — верх слева */}
      <div className="sticker" style={{
        left: "32%", top: "6%", width: 70, height: 70,
        animationDelay: "2.5s", animationDuration: "3s"
      }}>
        <Image src="/images/butterfly.png" alt="Мотылёк" fill style={{ objectFit: "contain" }} />
      </div>

      {/* Мотылёк 2 — правый низ, зеркальный */}
      <div className="sticker" style={{
        right: "28%", bottom: "10%", width: 55, height: 55,
        animationDelay: "1s", animationDuration: "3.5s",
        transform: "scaleX(-1)"
      }}>
        <Image src="/images/butterfly.png" alt="Мотылёк" fill style={{ objectFit: "contain" }} />
      </div>

      {/* Куст 2 — правый низ */}
      <div className="sticker" style={{
        right: "22%", bottom: "2%", width: 160, height: 160,
        animationDelay: "3s", animationDuration: "5s"
      }}>
        <Image src="/images/bush.png" alt="Куст" fill style={{ objectFit: "contain" }} />
      </div>

      {/* === ТЕКСТ И CTA === */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        <h1
          className="text-4xl lg:text-6xl leading-tight mb-6 text-gray-900"
          style={{ fontFamily: "'Made Barista', serif" }}
        >
          «Мама, я прочитал это сам!»
        </h1>

        <p className="text-lg lg:text-xl leading-relaxed text-gray-600 mb-10 max-w-lg">
          БУKOVKI — букварь нового поколения. Волшебные иллюстрации,
          приключенческий сюжет и задания, вписанные прямо в историю.
        </p>

        <a
          href="#trial"
          className="inline-flex items-center justify-center h-14 rounded-2xl px-10 bg-[#1a1a4e] text-white text-base font-semibold transition-colors duration-200 hover:bg-[#2a2a6e] active:bg-[#141438]"
        >
          Попробовать бесплатно
        </a>
      </div>

    </section>
  );
}

function Placeholder({ label, color }: { label: string; color: string }) {
  // Временная заглушка до получения иллюстрации
  return (
    <div
      className="w-full h-full rounded-2xl flex items-center justify-center text-sm text-gray-500 font-medium"
      style={{ backgroundColor: color }}
    >
      {label}
    </div>
  );
}
