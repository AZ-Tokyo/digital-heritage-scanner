import patterns from '../patterns.json'
import type { ExtractedItem } from './extractors/bookmarks'

export interface MatchedAsset {
    name: string
    url: string
    category: string
    categoryName: string
    source: 'bookmark' | 'history' | 'cookie'
}

interface PatternCategory {
    id: string
    name: string
    patterns: string[]
}

interface PatternsData {
    categories: PatternCategory[]
}

const typedPatterns = patterns as PatternsData

export function matchPatterns(items: ExtractedItem[]): MatchedAsset[] {
    const results: MatchedAsset[] = []
    const seenUrls = new Set<string>()

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
                if (hostname.includes(pattern)) {
                    // URLの重複排除
                    const normalizedUrl = normalizeUrl(item.url)
                    if (seenUrls.has(normalizedUrl)) {
                        matched = true
                        break
                    }
                    seenUrls.add(normalizedUrl)

                    results.push({
                        name: item.title || inferServiceName(hostname),
                        url: normalizedUrl,
                        category: category.id,
                        categoryName: category.name,
                        source: item.source,
                    })
                    matched = true
                    break
                }
            }
            if (matched) break
        }
    }

    return results
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
