import { SearchForm } from "@/components/SearchForm";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";
  const users = query ? await fetchUsers(query) : [];

  return (
    <main className="p-8 space-y-8">
      <SearchForm defaultValue={query} />
      <div className="grid gap-4">
        {users.map((user) => (
          <Link
            key={user.id}
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
              {/* name がある場合は強調表示し、login はサブ表示 */}
              <span className="font-semibold text-lg text-blue-600">
                {user.name ?? user.login}
              </span>
              <span className="text-sm text-gray-600">@{user.login}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

type GitHubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string | null;
};

async function fetchUsers(login: string): Promise<GitHubUser[]> {
  const res = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(login)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("GitHubユーザー検索に失敗しました");

  const data = await res.json();

  //　各ユーザーの name を並列で取得
  const enrichedItems = await Promise.all(
    data.items.map(async (user: any) => {
      try {
        const detailRes = await fetch(
          `https://api.github.com/users/${user.login}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
              Accept: "application/vnd.github+json",
            },
            cache: "no-store",
          }
        );

        if (!detailRes.ok) throw new Error("ユーザー詳細取得に失敗");

        const detail = await detailRes.json();
        return { ...user, name: detail.name };
      } catch (err) {
        return { ...user, name: null };
      }
    })
  );

  return enrichedItems;
}
