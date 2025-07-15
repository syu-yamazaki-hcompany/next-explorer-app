// ローディングを表示するコンポーネント

import { GitHubLogoIcon } from '@radix-ui/react-icons';

export default function Loading() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center space-y-6
                    bg-gradient-to-b from-sky-100 to-blue-200
                    dark:from-neutral-900 dark:to-black overflow-hidden">

      {/* 昼：雲 */}
      <div className="absolute w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-24 h-12 bg-white opacity-60 rounded-full blur-md animate-float" />
        <div className="absolute top-1/3 left-2/3 w-32 h-14 bg-white opacity-40 rounded-full blur-md animate-float" />
      </div>

      {/* 夜：星 */}
      <div className="absolute w-full h-full pointer-events-none dark:flex hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* ロゴ・スピナー・テキスト */}
      <GitHubLogoIcon className="w-16 h-16 text-gray-700 dark:text-gray-300" />

      <div className="w-16 h-16 border-4 border-gray-300 dark:border-neutral-600 border-t-blue-500 dark:border-t-blue-300 rounded-full animate-spin" />

      <div className="text-gray-700 dark:text-gray-200 text-base font-medium">データ取得中…</div>
    </div>
  );
}
