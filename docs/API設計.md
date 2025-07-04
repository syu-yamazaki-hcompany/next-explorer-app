# API設計概要
技術課題の要件に合わせて、`GitHub GraphQL API v4`を用いる。
`Github GraphQL API`ではユーザー検索のクエリが提供されていないため、ユーザー検索に関しては例外的に`REST API`を利用。

## 必要なクエリ一覧
1. ユーザー検索（一覧表示）
- GitHub REST API を使用してユーザー検索を行う
- `searchParams.q` をもとに GitHub API へ検索リクエスト
- 処理はサーバーコンポーネント (`app/search/page.tsx`) で行う
- クエリ例: 
```
GET https://api.github.com/search/users?q=<検索語>&page=<ページ番号>&per_page=<件数>
```
- 環境変数 `.env` に定義したトークンを使用し、認証済みで API 呼び出し

実装時は下記のような感じと思われる。
```tsx
const keyword = "柊"; // 検索ボックスに入力された文字列
const res = await fetch(`https://api.github.com/search/users?q=${keyword}`, {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
});

```

2. ユーザー個人の情報取得（詳細ページ）+ 
要件のユーザー情報（プロフィール画像、バイオ、フォロワー数など）を取得。
```graphql
query GetUserWithRepos($login: String!) {
  user(login: $login) {
    name
    login
    avatarUrl
    bio
    followers {
      totalCount
    }
    repositories(first: 20, orderBy: { field: UPDATED_AT, direction: DESC }, privacy: PUBLIC) {
      totalCount
      nodes {
        name
        description
        primaryLanguage {
          name
        }
        stargazerCount
        updatedAt
        url
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
```
実装のときはこんな感じ。
```tsx
const query = `...上記のGraphQLクエリ...`;

const variables = {
  login: "shu-yamazaki", // ← 動的に入力や検索結果から得る値
};

const data = await client.request(query, variables);
```

3. ユーザー個人のリポジトリ取得（詳細ページで最大20件表示）


```graphql
import { GraphQLClient, gql } from 'graphql-request'

const endpoint = 'https://api.github.com/graphql'

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
})

const query = gql`
  query GetUserRepositories($login: String!) {
    user(login: $login) {
      repositories(first: 20, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          name
          description
          primaryLanguage {
            name
          }
          stargazerCount
          updatedAt
          url
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

const variables = {
  login: "shu-yamazaki", // ← ここに動的にユーザー名を渡す
}

const data = await graphQLClient.request(query, variables)
console.log(data)

```