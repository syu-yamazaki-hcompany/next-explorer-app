// ユーザーカードのコンポーネント
// 状態は持たないが要件に従ってクライアントコンポーネントとし、コロケーションはしない

import Image from "next/image";
import Link from "next/link";

type Props = {
  user: {
    login: string;
    id: number;
    avatar_url: string;
    name?: string | null;
  };
};

export function UserCard({ user }: Props) {
  return (
    <Link
    href={`/user/${user.login}`}
    className="flex items-center gap-4 p-4 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition"
    >
    <Image
        src={user.avatar_url}
        alt={`${user.login}のアバター`}
        width={48}
        height={48}
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
