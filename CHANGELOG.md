# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-01-14

### Changed
- **CSVエクスポート**: `is_inheritable` 列を削除し、`name` と `url` の2列のみを出力するようシンプル化

## [1.2.3] - 2026-01-13

### Changed
- **プライバシーポリシー**: 絵文字を削除し、文書のスタイルを統一
- **プライバシーポリシー**: 収集データの利用目的として「AIサービス」「電子書籍」を明記

## [1.2.2] - 2026-01-13

### Fixed
- **プライバシーポリシー**: 拡張機能内 (`privacy.html`) へのリンク切れを修正 (ビルド時の配置パスを `dist/pages/` に変更)

## [1.2.1] - 2026-01-13

### Added
- **新カテゴリ**: `ai_service` (ChatGPT, Claude, Gemini等) と `ebook_manga` (Kindle, Kobo等) を追加し、パターン検出を拡充
- **海外サービス対応**: O'Reilly, Manning などの海外技術書サービスを追加

## [1.2.0] - 2026-01-13

### Added
- **ソート機能**: 取得結果画面に並び替え機能を追加（カテゴリ順、サービス名順、検出元順）

## [1.1.2] - 2026-01-13

### Internal
- **ファイル整理**: HTMLファイルを `pages/`、Markdownファイルを `docs/` に移動し、ルートディレクトリを整理

## [1.1.1] - 2026-01-13

### Fixed
- **サイドパネル**: 結果リストがスクロールせず、フッターが画面外にはみ出すレイアウト崩れを修正 (`min-h-0` と `height: 100%` の適用)
- **ビルド設定**: Tailwind CSSの設定ファイルパスを修正し、ビルド時にスタイルが適用されない問題を解決

### Internal
- **Config整理**: `vite.config.ts`, `tailwind.config.js` などの設定ファイルを `config/` ディレクトリに集約し、プロジェクトルートを整理

## [1.1.0] - 2026-01-13

### Added
- **課金系カテゴリの拡充**: クリエイター支援、マッチングアプリ、オンライン教育、ふるさと納税、生活インフラの5カテゴリを追加
- **共通**: カテゴリ定義ファイルを `src/data/patterns.json` として分離・管理

### Changed
- **リファクタリング**: ファイル構造を整理し、`src/services`, `src/data`, `src/types` に分割
- **note.com**: カテゴリを `crowdsourcing` から `creator_support` へ移動

## [1.0.5] - 2026-01-13

### Added
- カテゴリ定義の拡充：インフラ（AWS/ドメイン）、公営競技、クラウドソーシング、旅行など新規4カテゴリを追加し、検出範囲を拡大
- 既存カテゴリへパターン追加（ヤフオク、PayPayフリマ、楽天ラクマなど）

### Changed
- 重複排除ロジックの改善：サブドメインが異なる同じサービスを1つに集約するように変更
- ドメイン判定の厳密化：誤検知防止のため、パターンの種類（ドット有無）に応じて後方一致と部分一致を使い分けるよう改善

## [1.0.4] - 2026-01-13

### Fixed
- サイドパネルでのレイアウト崩れ（フッターが正しく固定されない問題）を修正

## [1.0.3] - 2026-01-13

### Fixed
- UIレイアウトを改善：CSVエクスポートボタンとフッターを画面下部に固定し、リスト部分のみスクロールするように変更

## [1.0.2] - 2026-01-13

### Fixed
- プライバシーポリシーのリンク切れを修正（MarkdownファイルをHTML化して同梱）
- 拡張機能バージョン表示がUI上で更新されない問題を修正

## [1.0.1] - 2026-01-13

### Fixed
- 長いサービス名やURLによりレイアウトが崩れ横スクロールが発生する問題を修正
- ポップアップフッターにサイドパネルを開くボタンを追加

### Added
- 初回リリース
- ブックマーク、閲覧履歴、Cookieからデジタル遺産候補を抽出
- 14カテゴリのパターンマッチング（銀行、証券、ゲーム、サブスク等）
- CSV出力機能（AZ-Tokyo Assetモデル互換）
- デジタル庁デザインシステム準拠のUI
- サイドパネル対応
- プライバシーポリシー

[Unreleased]: https://github.com/AZ-Tokyo/digital-heritage-scanner/compare/v1.0.5...HEAD
[1.0.5]: https://github.com/AZ-Tokyo/digital-heritage-scanner/releases/tag/v1.0.5
[1.0.4]: https://github.com/AZ-Tokyo/digital-heritage-scanner/releases/tag/v1.0.4
[1.0.3]: https://github.com/AZ-Tokyo/digital-heritage-scanner/releases/tag/v1.0.3
[1.0.2]: https://github.com/AZ-Tokyo/digital-heritage-scanner/releases/tag/v1.0.2
[1.0.1]: https://github.com/AZ-Tokyo/digital-heritage-scanner/releases/tag/v1.0.1
[1.0.0]: https://github.com/AZ-Tokyo/digital-heritage-scanner/releases/tag/v1.0.0
