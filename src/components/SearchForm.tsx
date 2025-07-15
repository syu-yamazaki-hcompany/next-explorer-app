// ユーザー名を入力して検索するフォーム
// 入力内容を保持する必要があるのでクライアントコンポーネント
// 入力されたユーザー名を使って、/user/[login] ページに遷移

"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function SearchForm({
  defaultValue = "",
  onSearchStart,
}: {
  defaultValue?: string;
  onSearchStart?: () => void;
}) {
  const [input, setInput] = useState(defaultValue);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    onSearchStart?.(); // 検索開始を通知

    startTransition(() => {
      router.push(`/?q=${encodeURIComponent(input)}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="GitHubユーザー名"
        className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-white/10 
                   bg-white dark:bg-neutral-800 
                   text-gray-800 dark:text-white 
                   placeholder:text-gray-400 dark:placeholder:text-gray-500
                   focus:outline-none focus:ring-2 focus:ring-blue-400 
                   transition-colors"
      />
      <button
        type="submit"
        disabled={isPending}
        aria-label="ユーザー検索"
        className="inline-flex items-center gap-1 px-4 py-2 rounded-md
          text-white dark:text-black
          bg-gradient-to-r from-blue-600 to-cyan-600
          hover:from-blue-900 hover:to-cyan-900

          dark:bg-gradient-to-r dark:from-yellow-600 dark:to-red-600
          dark:hover:from-yellow-300 dark:hover:to-yellow-400

          focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:focus-visible:ring-yellow-400
          disabled:opacity-50 disabled:cursor-not-allowed
          active:scale-95 motion-safe:transition-transform
          shadow-md cursor-pointer transition-all"
      >
        <MagnifyingGlassIcon className="w-4 h-4" />
        <span>検索</span>
      </button>
    </form>
  );
}
