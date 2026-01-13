# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
