// トップページ兼検索ページ
// 入力フィールドと一覧表示はクライアントコンポーネントで実装するためコロケーションはせずnameを並列取得する
// 要件に従いユーザー検索のfetchにはREST APIを使用

import { SearchForm } from "@/components/SearchForm";
import { UserCard } from "@/components/UserCard";
import "server-only"

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
          <UserCard key={user.id} user={user} />
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

  if (!res.ok) {
    console.error(`[Server] GitHubユーザー検索失敗: ${res.status}`);
    throw new Error("GitHubユーザー検索に失敗しました");
  } else {
    console.log(`[Server] GitHubユーザー検索成功: ${res.status}`);
  }
  const data = await res.json();
  console.log(`[Server] ユーザー数: ${data.items.length}`);

  // 各ユーザーの name を並列で取得
  const enrichedItems = await Promise.all(
    data.items.map(async (user: GitHubUser) => {
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

        if (!detailRes.ok) {
          console.warn(`[Server] ${user.login} の詳細取得に失敗`);
          throw new Error("ユーザー詳細取得に失敗");
        }
        const detail = await detailRes.json();
        console.log(`[Server] 詳細取得成功: ${user.login}, name: ${detail.name}`);
        return { ...user, name: detail.name };
      } catch (err) {
        console.error(`[Server] ${user.login} の詳細取得エラー:`, err);
        return { ...user, name: null };
      }
    })
  );

  return enrichedItems;
}
