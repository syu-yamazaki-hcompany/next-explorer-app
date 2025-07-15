// テーマ切り替えボタン
// テーマ状態を持つ必要があるためクライアントコンポーネント

"use client";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

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
    document.cookie = `theme=${theme}; path=/; max-age=31536000`;
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
      aria-pressed={isDark}
      title={isDark ? "ライトモードに切り替え" : "ダークモードに切り替え"}
      className="group p-2 rounded-full border border-gray-300 dark:border-white/10 
                 bg-white/80 dark:bg-neutral-800/80 
                 text-gray-700 dark:text-gray-100 
                 shadow-md hover:shadow-lg transition-all duration-200 
                 hover:scale-105 backdrop-blur-sm
                 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-yellow-400"
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      ) : (
        <MoonIcon className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}
