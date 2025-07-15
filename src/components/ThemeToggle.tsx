// テーマ切り替えボタン
// テーマ状態を持つ必要があるためクライアントコンポーネント

"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored === "dark" || (!stored && prefersDark);
    setIsDark(initial);
    updateTheme(initial);
  }, []);

  const updateTheme = (dark: boolean) => {
    const theme = dark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.cookie = `theme=${theme}; path=/; max-age=31536000`; // 1年
    document.documentElement.classList.toggle("dark", dark);
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    updateTheme(next);
  };

  return (
<button
  onClick={toggleTheme}
  aria-label="テーマ切り替え"
  className="p-2 rounded-full bg-white dark:bg-neutral-800 text-black dark:text-white hover:ring-2 hover:ring-yellow-300 transition"
>
  {isDark ? "☀️" : "🌙"}
</button>

  );
}
