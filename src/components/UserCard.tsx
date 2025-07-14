// ユーザーカードのコンポーネント
// 状態は持たないが要件に従ってクライアントコンポーネントとし、コロケーションはしない

"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  user: {
    login: string;
    id: number;
    avatar_url: string;
    name?: string | null;
  };
};

export function UserCard({ user }: Props) {
  // クエリパラメータを取得して、詳細ページの戻るボタンから直前の検索結果を維持したまま戻る用
  const params = useSearchParams();
  const q = params.get("q");
  const href = q
    ? `/user/${user.login}?q=${encodeURIComponent(q)}`
    : `/user/${user.login}`;

  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition"
    >
    <Image
        src={user.avatar_url}
        alt={`${user.login}のアバター`}
        width={60}
        height={60}
        className="rounded-full"
    />
    <div className="flex flex-col">
        <span className="font-semibold text-lg text-blue-600">
        {user.name ?? user.login}
        </span>
        <span className="text-sm text-gray-600">
        @{user.login}
        </span>
    </div>
    
    </Link>

  );
}
