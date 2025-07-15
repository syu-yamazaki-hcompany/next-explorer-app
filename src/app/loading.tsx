// ローディングを表示するコンポーネント

import { GitHubLogoIcon } from '@radix-ui/react-icons';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-6
                    bg-gradient-to-b from-white to-gray-100
                    dark:from-neutral-900 dark:to-neutral-800">

      <GitHubLogoIcon className="w-16 h-16 text-gray-700 dark:text-gray-300" />

      <div className="w-16 h-16 border-4 border-gray-300 dark:border-neutral-600 border-t-blue-500 dark:border-t-blue-300 rounded-full animate-spin" />

      <div className="text-gray-700 dark:text-gray-200 text-base font-medium">データ取得中…</div>
    </div>
  );
}
