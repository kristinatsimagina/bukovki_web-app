"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white flex items-center justify-center">

      {/* === ЭЛЕМЕНТЫ КОЛЛАЖА (заглушки) === */}

      {/* Котевич — внизу слева */}
      <div className="sticker" style={{
        left: "5%", bottom: "10%", width: 160, height: 200,
        animationDelay: "0s", animationDuration: "4s"
      }}>
        <Placeholder label="Котевич" color="#FFE0B2" />
      </div>

      {/* Дерево — слева по центру */}
      <div className="sticker" style={{
        left: "2%", top: "15%", width: 140, height: 280,
        animationDelay: "1.2s", animationDuration: "5s"
      }}>
        <Placeholder label="Дерево" color="#C8E6C9" />
      </div>

      {/* Домик — правый верх */}
      <div className="sticker" style={{
        right: "8%", top: "8%", width: 150, height: 160,
        animationDelay: "0.5s", animationDuration: "4.5s"
      }}>
        <Placeholder label="Домик" color="#BBDEFB" />
      </div>

      {/* Мотылёк — верх по центру */}
      <div className="sticker" style={{
        left: "45%", top: "5%", width: 60, height: 60,
        animationDelay: "2s", animationDuration: "3s"
      }}>
        <Placeholder label="🦋" color="#F8BBD9" />
      </div>

      {/* Цветы — правый низ */}
      <div className="sticker" style={{
        right: "6%", bottom: "12%", width: 120, height: 120,
        animationDelay: "0.8s", animationDuration: "5.5s"
      }}>
        <Placeholder label="Цветы" color="#F0F4C3" />
      </div>

      {/* Куст — правый центр */}
      <div className="sticker" style={{
        right: "3%", top: "40%", width: 100, height: 110,
        animationDelay: "1.5s", animationDuration: "4.2s"
      }}>
        <Placeholder label="Куст" color="#C8E6C9" />
      </div>

      {/* Ягоды — левый низ */}
      <div className="sticker" style={{
        left: "20%", bottom: "5%", width: 80, height: 80,
        animationDelay: "2.5s", animationDuration: "3.8s"
      }}>
        <Placeholder label="Ягоды" color="#FFCDD2" />
      </div>

      {/* Звёздочки — верх справа */}
      <div className="sticker" style={{
        right: "25%", top: "10%", width: 50, height: 50,
        animationDelay: "3s", animationDuration: "3.2s"
      }}>
        <Placeholder label="✨" color="#FFF9C4" />
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
  return (
    <div
      className="w-full h-full rounded-2xl flex items-center justify-center text-sm text-gray-500 font-medium"
      style={{ backgroundColor: color }}
    >
      {label}
    </div>
  );
}
