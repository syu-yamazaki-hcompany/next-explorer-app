// app/user/[login]/page.tsx
import { getUserWithRepos } from "@/lib/getUserWithRepos";

type Props = {
  params: {
    login: string;
  };
};

export default async function UserPage({ params }: Props) {
  const { login } = params;
  const userData = await getUserWithRepos(login);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">@{login} の詳細ページ</h1>
      {/* 今後ここにUserCardやRepoListを追加 */}
      <pre className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded">
        {JSON.stringify(userData, null, 2)}
      </pre>
    </main>
  );
}
