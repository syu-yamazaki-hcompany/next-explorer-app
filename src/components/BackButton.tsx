// 詳細ページから戻るボタン
// クエリパラメータを持たせて検索結果に戻るためクライアントコンポーネント

"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function BackButton() {
  const params = useSearchParams();
  const q = params.get("q");

  return (
   <Link
      href={q ? `/?q=${encodeURIComponent(q)}` : "/"}
      className="inline-flex items-center gap-1.5 text-sm font-semibold
                 text-blue-600 dark:text-blue-300
                 px-2 py-1 rounded-md
                 hover:bg-blue-100/40 dark:hover:bg-blue-900/40
                 hover:shadow-sm
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                 transition-all duration-150 ease-in-out"
      aria-label="検索結果に戻る"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      検索に戻る
    </Link>
  );
}

