import { extractBookmarks, extractHistory, extractCookies } from './extractors'
import { matchPatterns, type MatchedAsset } from './filter'

let scannedAssets: MatchedAsset[] = []

// イベントリスナー登録
document.getElementById('start-scan')?.addEventListener('click', startScan)
document.getElementById('export-csv')?.addEventListener('click', exportCsv)
document.getElementById('rescan')?.addEventListener('click', startScan)
document.getElementById('open-sidepanel')?.addEventListener('click', openSidePanel)

// サイドパネル内ではサイドパネルボタンを隠す
if (window.location.pathname.includes('sidepanel.html')) {
    document.getElementById('open-sidepanel')?.classList.add('hidden')
}

async function openSidePanel() {
    const windowId = chrome.windows.WINDOW_ID_CURRENT
    // @ts-ignore: chrome.sidePanel is available in Chrome 116+
    if (chrome.sidePanel && chrome.sidePanel.open) {
        try {
            // @ts-ignore
            await chrome.sidePanel.open({ windowId })
            window.close() // ポップアップを閉じる
        } catch (error) {
            console.error('Failed to open side panel:', error)
        }
    } else {
        alert('このバージョンのChromeではサイドパネルを直接開くことができません。\nブラウザのサイドパネルメニューから開いてください。')
    }
}

async function startScan() {
    showSection('scanning')

    try {
        // 並列でデータ抽出
        const [bookmarks, history, cookies] = await Promise.all([
            extractBookmarks(),
            extractHistory(),
            extractCookies(),
        ])

        // 全データを結合してパターンマッチング
        const allItems = [...bookmarks, ...history, ...cookies]
        scannedAssets = matchPatterns(allItems)

        // カテゴリごとにソート
        scannedAssets.sort((a, b) => a.categoryName.localeCompare(b.categoryName, 'ja'))

        renderResults()
        showSection('result')
    } catch (error) {
        console.error('Scan failed:', error)
        alert('スキャンに失敗しました。権限を確認してください。')
        showSection('consent')
    }
}

function renderResults() {
    const countEl = document.getElementById('result-count')
    const listEl = document.getElementById('result-list')
    if (!countEl || !listEl) return

    countEl.textContent = scannedAssets.length.toString()

    if (scannedAssets.length === 0) {
        listEl.innerHTML = `
      <div class="px-4 py-6 text-center text-solid-gray-500">
        <p>デジタル遺産候補が見つかりませんでした</p>
      </div>
    `
        return
    }

    listEl.innerHTML = scannedAssets
        .map(
            (asset) => `
        <div class="px-3 py-2 border-b border-solid-gray-100 last:border-b-0 hover:bg-solid-gray-50 break-all">
          <div class="font-medium text-sm text-solid-gray-900">${escapeHtml(asset.name)}</div>
          <div class="flex items-center justify-between mt-1">
            <span class="text-xs text-solid-gray-500">${escapeHtml(asset.categoryName)}</span>
            <span class="text-xs px-1.5 py-0.5 rounded" style="${getSourceBadgeStyle(asset.source)}">${getSourceLabel(asset.source)}</span>
          </div>
        </div>
      `
        )
        .join('')
}

function getSourceBadgeStyle(source: 'bookmark' | 'history' | 'cookie'): string {
    switch (source) {
        case 'bookmark':
            return 'background-color: var(--color-blue-100); color: var(--color-blue-700)'
        case 'history':
            return 'background-color: var(--color-green-100); color: var(--color-green-700)'
        case 'cookie':
            return 'background-color: var(--color-yellow-100); color: var(--color-yellow-700)'
    }
}

function getSourceLabel(source: 'bookmark' | 'history' | 'cookie'): string {
    switch (source) {
        case 'bookmark':
            return 'ブックマーク'
        case 'history':
            return '履歴'
        case 'cookie':
            return 'Cookie'
    }
}

function exportCsv() {
    const header = 'name,url,is_inheritable\n'
    const rows = scannedAssets.map((asset) => `"${escapeCsv(asset.name)}","${asset.url}",`).join('\n')

    const csv = header + rows
    const bom = '\uFEFF' // UTF-8 BOM for Excel compatibility
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `digital-heritage-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
}

function showSection(section: 'consent' | 'scanning' | 'result') {
    const sections = ['consent', 'scanning', 'result']
    sections.forEach((s) => {
        const el = document.getElementById(`${s}-section`)
        if (el) {
            el.classList.toggle('hidden', s !== section)
        }
    })
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}

function escapeCsv(str: string): string {
    return str.replace(/"/g, '""')
}
