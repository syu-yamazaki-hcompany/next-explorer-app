import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ items: [] });
  }

  const res = await fetch(`https://api.github.com/search/users?q=${q}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "GitHub API エラー" },
      { status: res.status }
    );
  }

  const data = await res.json();

  // 各ユーザーの詳細（/users/:login）を並列で取得して name を付加
  const enrichedItems = await Promise.all(
    data.items.map(async (user: any) => {
      try {
        const detailRes = await fetch(`https://api.github.com/users/${user.login}`, {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
            Accept: "application/vnd.github+json",
          },
        });

        if (!detailRes.ok) throw new Error("Failed to fetch user detail");

        const detail = await detailRes.json();
        return { ...user, name: detail.name };
      } catch (err) {
        return { ...user, name: null };
      }
    })
  );

  return NextResponse.json({ items: enrichedItems });
}
