import patterns from '../data/patterns.json'
import type { ExtractedItem, MatchedAsset, PatternsData } from '../types'

const typedPatterns = patterns as PatternsData

export function matchPatterns(items: ExtractedItem[]): MatchedAsset[] {
    // パターン+カテゴリIDをキーにして重複排除を行うMap
    const mergedResults = new Map<string, MatchedAsset>()

    for (const item of items) {
        let hostname: string
        try {
            hostname = new URL(item.url).hostname.toLowerCase()
        } catch {
            continue // 無効なURLはスキップ
        }

        for (const category of typedPatterns.categories) {
            let matched = false
            for (const pattern of category.patterns) {
                let isMatch = false

                // パターンにドットが含まれる場合（例: adobe.com）は厳格な後方一致
                // ドットが含まれない場合（例: rakuten-bank）は従来の部分一致
                if (pattern.includes('.')) {
                    if (hostname === pattern || hostname.endsWith('.' + pattern)) {
                        isMatch = true
                    }
                } else {
                    if (hostname.includes(pattern)) {
                        isMatch = true
                    }
                }

                if (isMatch) {
                    // ユニークキー: カテゴリID + パターン文字列
                    // これにより、同じパターンにマッチする異なるサブドメインを1つにまとめる
                    const key = `${category.id}:${pattern}`
                    const normalizedUrl = normalizeUrl(item.url)

                    const existing = mergedResults.get(key)

                    if (!existing) {
                        // 新規登録
                        mergedResults.set(key, {
                            name: item.title || inferServiceName(hostname),
                            url: normalizedUrl,
                            category: category.id,
                            categoryName: category.name,
                            source: item.source,
                        })
                    } else {
                        // 既に存在する場合、より「シンプル」なURL（短いURL）があれば更新する
                        // 例: stock.adobe.com (既存) vs adobe.com (新規) -> adobe.com を採用
                        if (normalizedUrl.length < existing.url.length) {
                            mergedResults.set(key, {
                                name: item.title || inferServiceName(hostname),
                                url: normalizedUrl,
                                category: category.id,
                                categoryName: category.name,
                                source: item.source, // ソースも上書き
                            })
                        }
                    }

                    matched = true
                    break
                }
            }
            if (matched) break
        }
    }

    return Array.from(mergedResults.values())
}

export function normalizeUrl(url: string): string {
    const parsed = new URL(url)
    return `${parsed.protocol}//${parsed.hostname}`
}

export function inferServiceName(hostname: string): string {
    // 主要ドメインからサービス名を推定
    const parts = hostname.replace(/^www\./, '').split('.')
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
}
