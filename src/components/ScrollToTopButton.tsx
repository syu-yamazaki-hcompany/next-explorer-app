// スクロール位置に応じて表示される「ページの先頭に戻る」ボタンのコンポーネント

"use client";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="ページの先頭に戻る"
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full
                 bg-neutral-400/40 dark:bg-neutral-700/90
                 text-blue-600 dark:text-yellow-300
                 shadow-lg hover:shadow-xl transition-all
                 hover:ring-2 hover:ring-blue-400 dark:hover:ring-yellow-400
                 cursor-pointer"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
