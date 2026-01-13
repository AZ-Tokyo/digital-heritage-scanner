# AZ-Tokyo Asset Scanner - Chrome拡張機能

Chrome拡張機能でデジタル遺産候補を抽出し、バックエンドのAssetモデルに対応するCSVを出力する。

## 概要

プロファイルの詳細画面から遺産のスキャンができるようにする。

- PCのロック解除済みを前提
- PCのみ（スマホでの実装は行わない）
- Chrome拡張機能として実装

## 開発環境 (Development)

このプロジェクトは [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) で開発します。

### 前提条件
- Node.js v22.x 以上
- npm 10.x 以上

### セットアップ
```bash
npm install
```

### 開発サーバー起動 (HMR)
```bash
npm run dev
```

### ビルド
```bash
npm run build
```

## 技術スタック (Tech Stack)

- **Framework**: Chrome Extension Manifest V3
- **Language**: TypeScript
- **Bundler**: Vite (+ [@crxjs/vite-plugin](https://crxjs.dev/vite-plugin))
- **Test**: Vitest (Unit Test)
- **Linter/Formatter**: ESLint, Prettier

## プロジェクト構成 (Structure)

```
extension/
├── manifest.json          # Manifest V3
├── package.json           # Dependencies & Scripts
├── vite.config.ts         # Vite Config
├── patterns.json          # デジタル遺産判定パターン
├── popup.html
├── src/
│   ├── popup.ts           # Popup UI Logic
│   ├── extractors/        # Data Extraction Logic
│   │   ├── bookmarks.ts
│   │   ├── history.ts
│   │   └── cookies.ts
│   └── filter.ts          # Pattern Matching Logic
├── PRIVACY_POLICY.md
└── README.md
```

## Assetモデル対応 (CSV Output)

`backend/internal/model/asset.go` のフィールドに対応するCSVを出力:

| Asset Model Field | CSV Column | 説明 |
|-------------------|------------|------|
| `Name` | `name` | サービス名（自動推定） |
| `URL` | `url` | サービスURL |
| `IsInheritable` | `is_inheritable` | 空欄（ユーザーが後で判断） |

## 抽出対象データ

| データ種別 | Chrome API | 用途 |
|-----------|-----------|------|
| ブックマーク | `chrome.bookmarks` | 金融・サービスサイト特定 |
| 閲覧履歴 | `chrome.history` | 利用頻度の高いサービス特定 |
| Cookie | `chrome.cookies` | ログイン済みサービス特定 |

## デジタル遺産候補カテゴリ

| カテゴリ | 判定キーワード例 |
|---------|------------------|
| ネット銀行 | `bank`, `rakuten-bank`, `netbk` |
| 証券 | `sbisec`, `rakuten-sec` |
| 暗号資産 | `bitflyer`, `coincheck` |
| 電子マネー | `paypay`, `linepay` |
| サブスク | `netflix`, `spotify`, `amazon.co.jp/prime` |
| SNS | `twitter`, `x.com`, `facebook`, `instagram` |
| クラウド | `drive.google`, `dropbox` |

## 出力CSV形式

```csv
name,url,is_inheritable
楽天銀行,https://www.rakuten-bank.co.jp,
SBI証券,https://www.sbisec.co.jp,
Netflix,https://www.netflix.com,
```

## Chrome Web Store規約への対応

- データエクスポートは拡張機能の**主目的として明示**
- プライバシーポリシーの設置が**必須**
- ユーザーへの**明示的な同意取得**をpopup UI内で実施

## 親プロジェクト

[AZ-Tokyo/AZ-Tokyo](https://github.com/AZ-Tokyo/AZ-Tokyo)
本拡張機能は上記プロジェクトの補助ツールとして開発されています。
