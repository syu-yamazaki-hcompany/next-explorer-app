import { useState } from "react";
import { searchUsersFromGitHub } from "@/lib/searchUsers";

type GitHubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
};

export function useSearchUsers() {
  const [login, setLogin] = useState("");
  const [results, setResults] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async () => {
    if (!login) return;

    setLoading(true);
    setError(null);

    try {
      const users = await searchUsersFromGitHub(login);
      setResults(users);
    } catch (err: any) {
      setError(err.message || "不明なエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    setLogin,
    results,
    loading,
    error,
    search,
  };
}
