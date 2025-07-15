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

  return (
    <div className="space-y-8">
      {/* 検索フォームは幅制限＆中央寄せ */}
      <div className="max-w-xl mx-auto">
        <SearchForm defaultValue={query} onSearchStart={() => setIsSearching(true)} />
      </div>

      {/* 画面幅に応じてカードを並び替え */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {isSearching
          ? [...Array(30)].map((_, i) => (
              <div
                key={i}
                className="h-28 rounded bg-gray-200 dark:bg-neutral-700 animate-pulse"
              />
            ))
          : initialUsers.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </div>
  );
}
