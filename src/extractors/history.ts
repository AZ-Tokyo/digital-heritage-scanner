import type { ExtractedItem } from './bookmarks'

export async function extractHistory(maxResults = 10000): Promise<ExtractedItem[]> {
    const historyItems = await chrome.history.search({
        text: '',
        maxResults,
        startTime: 0,
    })

    return historyItems
        .filter((item) => item.url && item.visitCount && item.visitCount >= 3)
        .map((item) => ({
            url: item.url!,
            title: item.title || '',
            source: 'history' as const,
        }))
}
