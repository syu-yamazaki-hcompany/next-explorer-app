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
  }, [query]);

  return (
    <div className="space-y-8">
      <SearchForm defaultValue={query} onSearchStart={() => setIsSearching(true)} />

      <div className="grid gap-4">
        {isSearching
          ? [...Array(30)].map((_, i) => (
              <div
                key={i}
                className="h-20 rounded bg-gray-200 dark:bg-neutral-700 animate-pulse"
              />
            ))
          : initialUsers.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </div>
  );
}

