export async function fetchUser(login: string) {
  return {
    login,
    name: "仮ユーザー",
    bio: "これはダミーデータです",
  };
}
