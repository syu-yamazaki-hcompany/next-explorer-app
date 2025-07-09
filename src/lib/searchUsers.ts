// REST APIを使用してGitHubユーザーを検索するロジック

export async function searchUsersFromGitHub(login: string) {
  const res = await fetch(`/api/search-users?q=${encodeURIComponent(login)}`);

  if (!res.ok) {
    throw new Error("GitHubユーザー検索に失敗しました");
  }

  const data = await res.json();
  return data.items || [];
}

