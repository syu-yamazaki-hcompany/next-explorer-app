// ユーザー名を入力して検索するフォーム
// 入力内容を保持する必要があるのでクライアントコンポーネント
// 入力されたユーザー名を使って、/user/[login] ページに遷移

"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

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
        className="border px-2 py-1 rounded"
      />
      <button
        type="submit"
        className="bg-black text-white px-3 py-1 rounded transition hover:bg-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isPending}
        aria-label="ユーザー検索"
      >
        {isPending ? "検索中..." : "検索"}
      </button>
    </form>
  );
}
