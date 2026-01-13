import type { ExtractedItem } from './bookmarks'

export async function extractCookies(): Promise<ExtractedItem[]> {
    const cookies = await chrome.cookies.getAll({})

    // ドメインごとにユニーク化
    const domains = new Set<string>()
    for (const cookie of cookies) {
        const domain = cookie.domain.replace(/^\./, '')
        domains.add(domain)
    }

    return Array.from(domains).map((domain) => ({
        url: `https://${domain}`,
        title: domain,
        source: 'cookie' as const,
    }))
}
