// スケルトンUI実装のため検索中の状態を管理する親コンポーネント

"use client";
import { useState, useEffect } from "react";
import { SearchForm } from "@/components/SearchForm";
import { UserCard } from "@/components/UserCard";
import { GitHubUser } from "@/app/page";

type Props = {
  initialUsers: GitHubUser[];
  query: string;
};

export function SearchPage({ initialUsers, query }: Props) {
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // クエリが変わったらローディング解除
    setIsSearching(false);

    // 直前にクリックされたユーザーの位置までスクロール復元
    const login = sessionStorage.getItem("scrollTargetLogin");
    if (login) {
      const target = document.querySelector(`[data-login="${login}"]`);
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }
      sessionStorage.removeItem("scrollTargetLogin");
    }
  }, [query, initialUsers]);

  const shouldShowEmptyMessage = query && initialUsers.length === 0;
  const shouldShowInitialMessage = !query && initialUsers.length === 0;

  return (
    <div className="space-y-8">
      {/* 検索フォームは幅制限＆中央寄せ */}
      <div className="max-w-xl mx-auto">
        <SearchForm defaultValue={query} onSearchStart={() => setIsSearching(true)} />
      </div>

      {/* 画面幅に応じてカードを並び替え */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {isSearching ? (
          [...Array(30)].map((_, i) => (
            <div
              key={i}
              className="h-28 rounded bg-gray-200 dark:bg-neutral-700 animate-pulse"
            />
          ))
        ) : shouldShowEmptyMessage ? (
          <p className="text-center col-span-full text-gray-900 dark:text-gray-100 flex flex-col items-center gap-2 py-10">
            <span className="text-5xl animate-pulse">🔍</span>
            <span className="text-lg font-medium">
              該当するユーザーが見つかりませんでした
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-200">
              スペルミスはありませんか？別のキーワードを試してみてください。
            </span>
          </p>
        ) : shouldShowInitialMessage ? (
          <p className="text-center col-span-full text-gray-900 dark:text-gray-100 flex flex-col items-center gap-4 py-10 animate-fade-in">
            <span
              className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 dark:from-yellow-500 dark:to-red-500 bg-clip-text text-transparent animate-fade-in"
            >
              コードの海を、のぞいてみよう
            </span>
          </p>
        ) : (
          initialUsers.map((user) => <UserCard key={user.id} user={user} />)
        )}
      </div>
    </div>
  );
}
