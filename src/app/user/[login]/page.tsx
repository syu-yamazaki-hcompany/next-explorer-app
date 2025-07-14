// ユーザー名をパラメータとして受け取り、そのユーザーの詳細情報とリポジトリを表示するページ
// 再利用しない静的表示部分はサーバーコンポーネント内に記載

import { GetUserWithReposDocument } from "@/graphql/generated/graphql";
import { GetUserWithReposQueryVariables } from "@/graphql/generated/graphql";
import { GraphQLClient } from "graphql-request";
import Image from "next/image";
import RepoCard from "@/components/RepoCard";
import "server-only"

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

  return (
    <main className="p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Image
          src={user.avatarUrl}
          alt={`${user.login} のアバター`}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-blue-700">{user.name ?? user.login}</span>
          </h1>
          <p className="text-gray-600">@{user.login}</p>
          {user.bio && <p className="mt-2 text-sm text-gray-800">{user.bio}</p>}
          <p className="text-sm text-gray-500 mt-1">
            フォロワー: {user.followers.totalCount}
          </p>
        </div>
      </div>

      {/* クライアントコンポーネントでリポジトリ表示 */}
      <RepoCard repositories={user.repositories.nodes} />
    </main>
  );
}
