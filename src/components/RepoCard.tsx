// リポジトリカードのコンポーネント
// ページネーションのために状態を持たせてましたが、スクロールで全部見れたほうがUIUX的に良さそうなので実装やめました
// 状態を持たなくていいのでコロケーションさせたほうが責務が明確かもですが、fetch回数が増えるのとユーザー情報取得にまとめといたほうが把握しやすいので[login]/page.tsxで取得したものを受け取る形にしています

import { GetUserWithReposQuery } from "@/graphql/generated/graphql";

type UserRepositoriesNodes = NonNullable<
  GetUserWithReposQuery["user"]
>["repositories"]["nodes"];

type Props = {
  repositories?: UserRepositoriesNodes;
};

export default function RepoCards({ repositories }: Props) {
  const validRepos = (repositories ?? []).filter(
    (repo): repo is NonNullable<typeof repo> => Boolean(repo)
  );

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">
        公開リポジトリ（{validRepos.length}件中）
      </h2>

      {validRepos.length > 0 ? (
        <ul className="grid gap-4 max-w-3xl mx-auto">
          {validRepos.map((repo) => (
            <li key={repo.id}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block card-base card-border-colorful card-hover-colorful"
              >
                <h3 className="card-title">{repo.name}</h3>

                {repo.description && (
                  <p className="card-subtitle mt-1">{repo.description}</p>
                )}

                <div className="text-xs text-gray-700 dark:text-gray-300 mt-2 flex flex-wrap gap-4">
                  <span>言語: {repo.primaryLanguage?.name ?? "不明"}</span>
                  <span>⭐ {repo.stargazerCount}</span>
                  <span>
                    更新日: {new Date(repo.updatedAt).toISOString().slice(0, 10)}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">公開リポジトリはありません</p>
      )}
    </section>
  );
}
