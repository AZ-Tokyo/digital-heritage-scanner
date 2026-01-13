export interface ExtractedItem {
    url: string
    title: string
    source: 'bookmark' | 'history' | 'cookie'
}

export async function extractBookmarks(): Promise<ExtractedItem[]> {
    const tree = await chrome.bookmarks.getTree()
    const items: ExtractedItem[] = []

    function traverse(nodes: chrome.bookmarks.BookmarkTreeNode[]) {
        for (const node of nodes) {
            if (node.url) {
                items.push({ url: node.url, title: node.title || '', source: 'bookmark' })
            }
            if (node.children) {
                traverse(node.children)
            }
        }
    }

    traverse(tree)
    return items
}
