"use client";
import { useState } from "react";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <p className="text-lg text-gray-700 text-center">
        Отлично! Проверьте почту — там письмо от нас 🐾
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        placeholder="ваш email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 h-14 rounded-2xl px-5 border border-gray-200 text-base outline-none focus:border-[#1a1a4e] transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="h-14 rounded-2xl px-8 bg-[#1a1a4e] text-white text-base font-semibold transition-colors hover:bg-[#2a2a6e] active:bg-[#141438] disabled:opacity-60 whitespace-nowrap"
      >
        {status === "loading" ? "..." : "Хочу попробовать первой"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-500 sm:col-span-2">
          Что-то пошло не так. Попробуйте ещё раз.
        </p>
      )}
    </form>
  );
}
