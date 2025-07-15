// トップページ兼検索ページ
// 入力フィールドと一覧表示はクライアントコンポーネントで実装するためコロケーションはせずnameを並列取得する
// 要件に従いユーザー検索のfetchにはREST APIを使用

import { SearchPage } from "@/components/SearchPage";
import "server-only";

// searchParams から検索クエリを取得し、GitHubユーザーを検索してクライアントコンポーネントに渡す
export default async function HomePage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = params.q ?? "";
  const users = query ? await fetchUsers(query) : [];
  // クエリがある場合のみ検索APIを呼び出し、なければ空配列を返す

  return (
    <main className="p-8">
      <SearchPage initialUsers={users} query={query} />
    </main>
  );
}

export type GitHubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string | null;
};

// GitHub REST APIを使ってユーザーを検索し、さらに個別のユーザー情報を取得して name を補完する
// APIの仕様上、検索結果には name が含まれないため、2段階で取得している
async function fetchUsers(login: string): Promise<GitHubUser[]> {
  const res = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(login)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store", // 最新の結果を取得するためキャッシュを無効化

    }
  );

  if (!res.ok) {
    console.error(`[Server] GitHubユーザー検索失敗: ${res.status}`);
    throw new Error("GitHubユーザー検索に失敗しました");
  }
  const data = await res.json();
  console.log(`[Server] ユーザー数: ${data.items.length}`);

  // nameを取得する
  const fetchUsername = await Promise.all(
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

        if (!detailRes.ok) throw new Error("ユーザー詳細取得に失敗");
        const detail = await detailRes.json();
        return { ...user, name: detail.name };
      } catch {
        return { ...user, name: null };
      }
    })
  );

  return fetchUsername;
}
