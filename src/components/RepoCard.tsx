// リポジトリカードのコンポーネント
// ページ切り替えのための状態管理を行う必要があるのでクライアントコンポーネント
// クライアントコンポーネントからのfetchは要件違反なのでコロケーションさせない

"use client";

import { useState } from "react";
import { GetUserWithReposQuery } from "@/graphql/generated/graphql";

type UserRepositoriesNodes = NonNullable<
  GetUserWithReposQuery["user"]
>["repositories"]["nodes"];

type Props = {
  repositories?: UserRepositoriesNodes;
};

const ITEMS_PER_PAGE = 5;

export default function RepoCards({ repositories }: Props) {
  const validRepos = (repositories ?? []).filter(
    (repo): repo is NonNullable<typeof repo> => Boolean(repo)
  );

  const [page, setPage] = useState(0);
  const start = page * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginated = validRepos.slice(start, end);

  const totalPages = Math.ceil(validRepos.length / ITEMS_PER_PAGE);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">
        公開リポジトリ（{validRepos.length}件中）
      </h2>

      {/* ページネーションを上に配置 */}
      {totalPages > 1 && (
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
          >
            前へ
          </button>
          <span className="text-sm mt-1">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={page + 1 >= totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
          >
            次へ
          </button>
        </div>
      )}

      {/* リポジトリリスト */}
      {validRepos.length > 0 ? (
        <ul className="grid gap-4 max-w-3xl mx-auto">
          {paginated.map((repo) => (
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
