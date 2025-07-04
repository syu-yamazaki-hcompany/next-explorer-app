# next-explorer-app

GitHubのユーザー情報・リポジトリを表示するアプリ。

## セットアップ手順

### リポジトリをクローンする
以下のコマンドでリポジトリをクローンしてください。
```bash
git clone https://github.com/syu-yamazaki-hcompany/next-explorer-app.git
cd next-explorer-app
```

### `.env.local`を作成する
プロジェクトを実行するには環境変数の設定が必要です。
以下のコマンドで `.env.example` をコピーして`.env.local` を作成してください。
```bash
cp .env.example .env.local
```

### アクセストークンを取得する
このアプリでは GitHub API を利用するため、個人のアクセストークンが必要です。

1. 以下のページにアクセス：
   https://github.com/settings/tokens

2. 「Personal access tokens」タブの「Fine-grained tokens」を選択し、「Generate new token」をクリック

3. 以下のように設定：
   - **token name**: 任意の名前（例：`next-explorer-app-token`）
   - **Resource owner**: 個人アカウントを選択
   - **Expiration**: `No expiration` か `60 days`など必要に応じて有効期限を設定
   - **Repository access**: Public repositoriesを選択し公開されているユーザー情報等を取得できるように設定
   設定が完了したらGenerate tokenをクリック。

4. トークンが生成されたらコピーしておきます（再表示不可）

5. `.env.local` に以下のように貼り付けます：

```env
GITHUB_ACCESS_TOKEN=your-token-here
```

### コンテナを起動しアクセスする
.env.localを作成後、下記のコマンドでDockerコンテナを起動。
```bash
docker-compose up --build
```

Dockerコンテナの起動後、`http://localhost:4000`にアクセス。

## 設計意図
### ページ構成
下記の２画面構成とする。
1. ユーザー検索・一覧ページ
2. ユーザー情報ページ（リポジトリ一覧の表示含む）
要件にページ分割の明記はなかったので、UXと開発コストの観点から1画面にまとめる。