"use client";

import { ebGaramond } from "@/lib/fonts";
import Image from "next/image";
import { useState } from "react";

type BookPage = {
  id: number;
  title: string;
  text: string;
  animatedObject: string;
};

const pages: BookPage[] = [
  {
    id: 1,
    title: "Лисенок просыпается",
    text: "Утром в волшебном лесу лисенок услышал, как поют птицы.",
    animatedObject: "",
  },
  {
    id: 2,
    title: "Прогулка к озеру",
    text: "Он побежал к озеру и увидел, как по воде прыгают солнечные зайчики.",
    animatedObject: "🦆",
  },
  {
    id: 3,
    title: "Добрый вечер",
    text: "На закате друзья собрались вместе и спели веселую песню.",
    animatedObject: "⭐",
  },
];

export default function Home() {
  const [pageIndex, setPageIndex] = useState(0);
  const currentPage = pages[pageIndex];

  const canGoBack = pageIndex > 0;
  const canGoForward = pageIndex < pages.length - 1;

  const playPageSound = () => {
    if (typeof window === "undefined") return;

    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.value = 440 + pageIndex * 80;
    gainNode.gain.value = 0.001;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(
      0.15,
      audioContext.currentTime + 0.04,
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.45,
    );
    oscillator.stop(audioContext.currentTime + 0.45);
  };

  return (
    <main className="relative min-h-dvh w-full bg-zinc-200">
      <div
        className="absolute bottom-0 left-1/2 top-0 w-[900px] max-w-full -translate-x-1/2"
        aria-hidden="true"
      >
        <Image
          src="/bg-story.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="900px"
        />
      </div>

      <section className="relative z-10 min-h-dvh w-full">
        <div className="absolute right-[40px] top-[40px] z-20">
          <button
            type="button"
            onClick={playPageSound}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow hover:bg-zinc-100"
          >
            Включить звук
          </button>
        </div>

        <div className="absolute left-[40px] top-[40px] z-10 box-border max-h-[calc(50vh-40px)] w-[calc(50vw-40px)] overflow-y-auto">
          <div className={`p-[40px] text-left ${ebGaramond.className}`}>
            {currentPage.animatedObject ? (
              <div
                className="book-float mb-4 text-6xl leading-none sm:text-7xl"
                aria-hidden="true"
              >
                {currentPage.animatedObject}
              </div>
            ) : null}
            <h1 className="text-[32px] font-bold leading-[1] text-zinc-800">
              {currentPage.title}
            </h1>
            <p className="mt-3 text-[16px] text-zinc-700">{currentPage.text}</p>
          </div>
        </div>

        <footer className="absolute bottom-[40px] left-[40px] right-[40px] flex items-center justify-between gap-3">
          <button
            type="button"
            aria-label="Назад"
            onClick={() => setPageIndex((prev) => prev - 1)}
            disabled={!canGoBack}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-zinc-50 text-zinc-700 shadow-md transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 [box-shadow:0_2px_8px_rgba(0,0,0,0.08),0_0_4px_rgba(255,255,255,0.95)]"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Вперед"
            onClick={() => setPageIndex((prev) => prev + 1)}
            disabled={!canGoForward}
            className="group inline-flex cursor-pointer bg-transparent p-0 shadow-none outline-none transition-transform hover:scale-[1.03] active:scale-[0.98] focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            <span
              className="relative inline-block [filter:drop-shadow(0_2px_7px_rgba(0,0,0,0.28))_drop-shadow(0_0_1.96px_rgba(33,132,250,0.75))]"
            >
              <Image
                src="/arrow-forward.png"
                alt=""
                width={333}
                height={144}
                className="pointer-events-none relative z-0 block h-9 w-auto object-contain opacity-100 transition-opacity duration-[400ms] ease-in-out select-none group-hover:opacity-0 sm:h-10"
                draggable={false}
              />
              <span
                className="pointer-events-none absolute inset-0 z-10 bg-[rgb(33,132,250)] opacity-0 transition-opacity duration-[400ms] ease-in-out [mask-image:url('/arrow-forward.png')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [mask-mode:alpha] [-webkit-mask-image:url('/arrow-forward.png')] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] group-hover:opacity-100 group-disabled:opacity-0"
                aria-hidden="true"
              />
            </span>
          </button>
        </footer>
      </section>
    </main>
  );
}
