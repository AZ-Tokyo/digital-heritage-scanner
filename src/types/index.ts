export interface ExtractedItem {
    url: string
    title: string
    source: 'bookmark' | 'history' | 'cookie'
}

export interface MatchedAsset {
    name: string
    url: string
    category: string
    categoryName: string
    source: 'bookmark' | 'history' | 'cookie'
}

export interface PatternCategory {
    id: string
    name: string
    patterns: string[]
}

export interface PatternsData {
    categories: PatternCategory[]
}
