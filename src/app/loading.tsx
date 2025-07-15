// ローディングを表示するコンポーネント

import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center space-y-6
                    bg-gradient-to-b from-sky-100 to-blue-200
                    dark:from-neutral-900 dark:to-black overflow-hidden">

      {/* 昼間の雲 */}
      <div className="absolute w-full h-full pointer-events-none dark:hidden">
        <div className="absolute top-1/4 left-1/4 w-28 h-14 bg-white opacity-50 rounded-full blur-md animate-float-slow" />
        <div className="absolute top-1/3 left-2/3 w-36 h-16 bg-white opacity-40 rounded-full blur-md animate-float-medium" />
        <div className="absolute top-1/2 left-1/5 w-24 h-12 bg-white opacity-60 rounded-full blur-md animate-float-fast" />
        <div className="absolute top-2/3 left-3/4 w-32 h-14 bg-white opacity-30 rounded-full blur-md animate-float-slow" />
      </div>

      {/* 夜の星 */}
      <div className="absolute w-full h-full pointer-events-none dark:flex hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ロゴ・スピナー・テキスト */}
      <GitHubLogoIcon className="w-16 h-16 text-gray-700 dark:text-gray-300 animate-pulse-slow" />

      <div className="w-16 h-16 border-4 border-gray-300 dark:border-neutral-600 border-t-blue-500 dark:border-t-blue-300 rounded-full animate-spin-slow shadow-md" />

      <div className="text-gray-700 dark:text-gray-200 text-base font-semibold tracking-wide animate-fade-in">
        データ取得中…
      </div>
    </div>
  );
}
