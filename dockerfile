# 開発用
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]


# ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
# ↓本番モードでの起動時はこちらに切り替え
# # 1. Nodeベースのビルドステージ
# FROM node:20-alpine AS builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# # 2. 実行専用ステージ（軽量）
# FROM node:20-alpine

# WORKDIR /app

# # 本番に必要なファイルだけコピー
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public

# EXPOSE 3000

# # 本番サーバーで起動
# CMD ["npx", "next", "start"]

