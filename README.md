# 賢者の精算 - 開発ボード

## Supabase接続情報

### 本番環境
- **Project URL**: https://xhlunauofzuinzhxgqti.supabase.co
- **API Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhobHVuYXVvZnp1aW56aHhncXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NDc0MzYsImV4cCI6MjA3MTMyMzQzNn0.W2aKboc8i4ObqVM8QlLwqAvUXI2D1dg6jVP14QFXawU

## セットアップ

1. 依存関係のインストール
```bash
npm install
```

2. 開発サーバーの起動
```bash
npm run dev
```

## 環境変数

Supabaseの接続情報は `src/lib/supabase.ts` ファイル内で直接設定されています。

## 機能

- 経費申請管理
- 出張申請管理
- 承認ワークフロー
- 会計システム連携
- 通知システム
- ドキュメント生成
- OCR処理
- データ分析
