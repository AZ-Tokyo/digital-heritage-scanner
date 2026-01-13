# Digital Heritage Scanner

Chrome拡張機能でデジタル遺産候補を抽出し、CSV出力する。

## クイックスタート

### インストール

```bash
npm install
npm run build
```

### Chromeへのロード

1. `chrome://extensions` を開く
2. 右上の「デベロッパーモード」を有効化
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. `dist` フォルダを選択

### 使用方法

1. ツールバーの拡張機能アイコンをクリック
2. 「スキャン開始」ボタンをクリック
3. 結果を確認し「CSVエクスポート」でダウンロード

## 機能

### データ抽出

| 抽出元 | Chrome API | 抽出条件 |
|--------|-----------|----------|
| ブックマーク | `chrome.bookmarks` | 全件 |
| 閲覧履歴 | `chrome.history` | 訪問回数3回以上 |
| Cookie | `chrome.cookies` | ドメインをユニーク化 |

### 対応カテゴリ (14種類)

| カテゴリ | 判定キーワード例 |
|---------|------------------|
| ネット銀行 | `rakuten-bank`, `netbk`, `japannetbank` |
| 証券・投資 | `sbisec`, `rakuten-sec`, `monex` |
| 暗号資産 | `bitflyer`, `coincheck`, `binance` |
| FX・CFD | `gaitame`, `dmm.com/fx`, `gmo-click` |
| 決済・電子マネー | `paypay`, `linepay`, `merpay` |
| ポイントサイト | `pointtown`, `moppy`, `hapitas` |
| ゲーム | `steampowered`, `nintendo`, `playstation`, `epicgames` |
| 動画配信 | `netflix`, `primevideo`, `unext` |
| 音楽配信 | `spotify`, `music.apple`, `music.youtube` |
| クラウドストレージ | `drive.google`, `dropbox`, `onedrive` |
| SNS | `x.com`, `facebook`, `instagram` |
| サブスクリプション | `adobe.com`, `office.com`, `chatgpt` |
| EC・ショッピング | `amazon.co.jp`, `rakuten.co.jp`, `mercari` |
| 保険・クレジットカード | `jcb.co.jp`, `smbc-card`, `rakuten-card` |

### CSV出力形式

```csv
name,url,is_inheritable
楽天銀行,https://www.rakuten-bank.co.jp,
SBI証券,https://www.sbisec.co.jp,
Netflix,https://www.netflix.com,
```

AZ-Tokyoバックエンドの `Asset` モデルに対応:

| CSV Column | 説明 |
|------------|------|
| `name` | サービス名（自動推定） |
| `url` | サービスURL |
| `is_inheritable` | 空欄（ユーザーが後で判断） |

## 開発

### 前提条件

- Node.js v22.x 以上
- npm 10.x 以上

### コマンド

```bash
npm install          # 依存関係インストール
npm run dev          # 開発サーバー起動 (HMR)
npm run build        # プロダクションビルド
npm run test         # ユニットテスト実行
npm run lint         # ESLint実行
npm run format       # Prettierでフォーマット
```

### リリース

1. `CHANGELOG.md` に変更内容を追記
2. リリースコマンドを実行：

```bash
npm run release:patch  # バグ修正 (1.0.0 → 1.0.1)
npm run release:minor  # 機能追加 (1.0.0 → 1.1.0)
npm run release:major  # 破壊的変更 (1.0.0 → 2.0.0)
```

3. GitHub Actions が自動で：
   - テスト・ビルド実行
   - ZIP ファイル作成
   - GitHub Releases に公開

### 技術スタック

| 項目 | 技術 |
|------|------|
| Framework | Chrome Extension Manifest V3 |
| Language | TypeScript |
| Bundler | Vite + [@crxjs/vite-plugin](https://crxjs.dev/vite-plugin) |
| Styling | Tailwind CSS + [@digital-go-jp/tailwind-theme-plugin](https://www.npmjs.com/package/@digital-go-jp/tailwind-theme-plugin) |
| Test | Vitest |
| Linter | ESLint, Prettier |

### プロジェクト構成

```
digital-heritage-scanner/
├── manifest.json          # Chrome Extension Manifest V3
├── package.json           # 依存関係・スクリプト
├── vite.config.ts         # Vite設定
├── tailwind.config.js     # Tailwind + デジタル庁テーマ
├── patterns.json          # デジタル遺産判定パターン (14カテゴリ)
├── popup.html             # Popup UI
├── icons/                 # 拡張機能アイコン (16/48/128px)
├── src/
│   ├── popup.ts           # Popup UIロジック
│   ├── styles.css         # Tailwind CSS
│   ├── filter.ts          # パターンマッチングロジック
│   ├── extractors/        # データ抽出ロジック
│   │   ├── bookmarks.ts   # ブックマーク抽出
│   │   ├── history.ts     # 閲覧履歴抽出
│   │   ├── cookies.ts     # Cookie抽出
│   │   └── index.ts       # バレルエクスポート
│   └── __tests__/
│       └── filter.test.ts # ユニットテスト (17件)
├── scripts/
│   └── generate-icons.mjs # アイコン生成スクリプト
├── PRIVACY_POLICY.md      # プライバシーポリシー
└── README.md
```

## プライバシー

- すべてのデータ処理は**ローカルでのみ**実行
- 外部サーバーへのデータ送信は**一切なし**
- 詳細は [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) を参照

---

## 設計ドキュメント

> 以下は初期設計時のドキュメントです。

### 概要

プロファイルの詳細画面から遺産のスキャンができるようにする。

- PCのロック解除済みを前提
- PCのみ（スマホでの実装は行わない）
- Chrome拡張機能として実装

### Chrome Web Store規約への対応

- データエクスポートは拡張機能の**主目的として明示**
- プライバシーポリシーの設置が**必須**
- ユーザーへの**明示的な同意取得**をpopup UI内で実施

### 親プロジェクト

[AZ-Tokyo/AZ-Tokyo](https://github.com/AZ-Tokyo/AZ-Tokyo)

本拡張機能は上記プロジェクトの補助ツールとして開発されています。
