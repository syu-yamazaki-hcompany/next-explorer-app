// ユーザー名をパラメータとして受け取り、そのユーザーの詳細情報とリポジトリを表示するページ
// 再利用しない静的表示部分はサーバーコンポーネント内に記載

import { GetUserWithReposDocument } from "@/graphql/generated/graphql";
import { GetUserWithReposQueryVariables } from "@/graphql/generated/graphql";
import { GraphQLClient } from "graphql-request";
import Image from "next/image";
import RepoCard from "@/components/RepoCard";
import "server-only";
import { BackButton } from "@/components/BackButton";
import { ScrollReset } from "@/components/ScrollReset";

export default async function UserPage({
  params,
}: {
  params: Promise<{ login: string }>;
}) {
  const { login } = await params;

  const graphqlClient = new GraphQLClient("https://api.github.com/graphql", {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
  });

  const variables: GetUserWithReposQueryVariables = { login };
  const { user } = await graphqlClient.request(GetUserWithReposDocument, variables);

  if (!user) {
    return (
      <main className="p-8">
        <h1 className="text-xl font-bold text-red-600">ユーザーが見つかりません</h1>
      </main>
    );
  }

  const githubUrl = `https://github.com/${user.login}`;

  return (
    <>
      <ScrollReset /> {/* ← スクロール位置をリセットする */}
      <main className="px-4 py-8 max-w-3xl mx-auto space-y-8">
        <BackButton />

        <div className="flex items-center gap-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${user.login}のGitHubプロフィール`}
          >
            <Image
              src={user.avatarUrl}
              alt={`${user.login} のアバター`}
              width={100}
              height={100}
              className="rounded-full hover:ring-3 ring-blue-500 dark:ring-yellow-500 transition"
            />
          </a>

          <div>
            <h1 className="text-2xl font-bold">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 dark:text-yellow-500 hover:underline"
              >
                {user.name ?? user.login}
              </a>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">@{user.login}</p>
            {user.bio && (
              <p className="mt-2 text-sm text-gray-900 dark:text-gray-100">{user.bio}</p>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              フォロワー: {user.followers.totalCount}
            </p>
          </div>
        </div>

      {/* クライアントコンポーネントでリポジトリ表示 */}
        <RepoCard repositories={user.repositories.nodes} />
      </main>
    </>
  );
}
