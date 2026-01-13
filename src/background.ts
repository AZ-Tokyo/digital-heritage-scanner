chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'OPEN_SIDE_PANEL') {
        // @ts-ignore
        if (chrome.sidePanel && chrome.sidePanel.open) {
            chrome.windows.getCurrent({ populate: false }, (window) => {
                if (window.id) {
                    // @ts-ignore
                    chrome.sidePanel.open({ windowId: window.id })
                        .then(() => sendResponse({ success: true }))
                        .catch((error) => {
                            console.error('Failed to open side panel:', error)
                            sendResponse({ success: false, error: error.message })
                        })
                }
            })
            return true // 非同期レスポンスを示す
        }
    }
})

// インストール時にサイドパネルの挙動を設定（アイコンクリック時はPopupを開くので、ここでの設定は不要だが念のため）
chrome.runtime.onInstalled.addListener(() => {
    // @ts-ignore
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false })
})
