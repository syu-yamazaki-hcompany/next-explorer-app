"use client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  user: {
    login: string;
    name?: string | null;
    avatar_url: string;
    html_url: string;
  };
};

export function UserCard({ user }: Props) {
  return (
    <Link
      href={`/user/${user.login}`}
      className="flex items-center gap-4 p-4 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
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
          {user.name || user.login}
        </span>
        <span className="text-sm text-gray-600">@{user.login}</span>
      </div>
    </Link>
  );
}
