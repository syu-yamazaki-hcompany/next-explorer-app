// ユーザー名を入力して検索するフォームのコンポーネント
// 入力されたユーザー名を使って、/user/[login] ページに遷移

"use client";

type Props = {
  login: string;
  setLogin: (value: string) => void;
  search: () => void;
  loading: boolean;
};

export function SearchForm({ login, setLogin, search, loading }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="GitHubユーザー名"
        className="border px-2 py-1 rounded"
      />
      <button
        type="submit"
        className="bg-black text-white px-3 py-1 rounded"
        disabled={loading}
      >
        {loading ? "検索中..." : "検索"}
      </button>
    </form>
  );
}
