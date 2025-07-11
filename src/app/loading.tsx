import { GitHubLogoIcon } from '@radix-ui/react-icons';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-6 bg-gradient-to-b from-white to-gray-100">
      <GitHubLogoIcon className="w-16 h-16 text-gray-700" />

      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />

      <div className="text-gray-700 text-base font-medium">データ取得中…</div>
    </div>
  );
}
