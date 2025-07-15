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

  // 詳細ページに遷移する直前に login を保存
  const handleClick = () => {
    sessionStorage.setItem("scrollTargetLogin", user.login);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      data-login={user.login}
      className="card-base card-hover-colorful card-border-colorful min-h-[7rem] flex gap-4"
    >
      <Image
        src={user.avatar_url}
        alt={`${user.login}のアバター`}
        width={80}
        height={80}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <span className="card-title">
          {user.name ?? user.login}
        </span>
        <span className="card-subtitle">
          @{user.login}
        </span>
      </div>
    </Link>
  );
}
