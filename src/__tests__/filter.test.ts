import { describe, it, expect } from 'vitest'
import { matchPatterns, normalizeUrl, inferServiceName } from '../filter'
import type { ExtractedItem } from '../extractors/bookmarks'

describe('matchPatterns', () => {
    describe('カテゴリマッチング', () => {
        it('ネット銀行パターンにマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://www.rakuten-bank.co.jp/login', title: '楽天銀行', source: 'bookmark' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('banking')
            expect(result[0].categoryName).toBe('ネット銀行')
        })

        it('証券パターンにマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://www.sbisec.co.jp/ETGate', title: 'SBI証券', source: 'history' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('securities')
        })

        it('ゲームパターンにマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://store.steampowered.com/', title: 'Steam', source: 'history' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('gaming')
        })

        it('動画配信パターンにマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://www.netflix.com/browse', title: 'Netflix', source: 'cookie' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('video_streaming')
        })

        it('暗号資産パターンにマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://bitflyer.com/ja-jp/', title: 'bitFlyer', source: 'bookmark' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('crypto')
        })

        it('インフラパターンにマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://console.aws.amazon.com/console/home', title: 'AWS Console', source: 'history' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('infrastructure')
        })

        it('公営競技パターンにマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://jra.jp/', title: 'JRA', source: 'bookmark' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('gambling')
        })

        it('クラウドソーシングパターンにマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://www.lancers.jp/', title: 'Lancers', source: 'history' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('crowdsourcing')
        })

        it('旅行パターンにマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://travel.rakuten.co.jp/', title: 'Rakuten Travel', source: 'cookie' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('travel')
        })

        it('追加ECパターン(ヤフオク)にマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://auctions.yahoo.co.jp/', title: 'Yahoo Auctions', source: 'history' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('ecommerce')
        })

        it('追加電子マネー(Suica)にマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://www.mobilesuica.com/', title: 'Mobile Suica', source: 'history' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('payment')
        })

        it('追加銀行(ゆうちょ)にマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://direct.jp-bank.japanpost.jp/tp1web/U010101WAK.do', title: 'Yucho Direct', source: 'bookmark' }, // URLはダミー
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('banking')
        })

        it('追加証券(GMOクリック)にマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://www.click-sec.com/corp/guide/kabu/', title: 'GMO Click', source: 'cookie' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('securities')
        })

        it('追加ポイント(dポイント)にマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://dpoint.docomo.ne.jp/', title: 'dPoint', source: 'history' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('points')
        })

        it('追加アダルト(DLsite)にマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://www.dlsite.com/home', title: 'DLsite', source: 'history' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('adult')
        })

        it('追加アダルト(FC2)にマッチする', () => {
            const items: ExtractedItem[] = [
                { url: 'https://video.fc2.com/', title: 'FC2 Video', source: 'cookie' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            expect(result[0].category).toBe('adult')
        })
    })

    describe('重複排除', () => {
        it('同一ドメインのURLは重複排除される', () => {
            const items: ExtractedItem[] = [
                { url: 'https://www.netflix.com/browse', title: 'Netflix', source: 'bookmark' },
                { url: 'https://www.netflix.com/login', title: 'Netflix Login', source: 'history' },
                { url: 'https://www.netflix.com/profiles', title: 'Netflix Profiles', source: 'cookie' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
        })

        it('異なるドメインは別々に記録される', () => {
            const items: ExtractedItem[] = [
                { url: 'https://www.netflix.com/', title: 'Netflix', source: 'bookmark' },
                { url: 'https://www.spotify.com/', title: 'Spotify', source: 'history' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(2)
        })

        it('同一パターンにマッチする異なるサブドメインは集約される', () => {
            const items: ExtractedItem[] = [
                { url: 'https://stock.adobe.com/', title: 'Adobe Stock', source: 'bookmark' },
                { url: 'https://commerce.adobe.com/', title: 'Adobe Commerce', source: 'history' },
                { url: 'https://adobe.com/', title: 'Adobe', source: 'cookie' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
            // より短いURL (adobe.com) が優先されることの確認
            expect(result[0].url).toBe('https://adobe.com')
        })
    })

    describe('ドメイン判定', () => {
        it('後方一致で正しく判定される', () => {
            const items: ExtractedItem[] = [
                { url: 'https://stock.adobe.com/', title: 'Adobe Stock', source: 'bookmark' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
        })

        it('類似ドメイン（完全一致・後方一致でない）はマッチしない', () => {
            const items: ExtractedItem[] = [
                { url: 'https://myadobe.com/', title: 'My Adobe', source: 'bookmark' }, // adobe.com を含むが後方一致ではない
                { url: 'https://adobefake.com/', title: 'Fake', source: 'history' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(0)
        })
    })

    describe('エッジケース', () => {
        it('マッチしないURLは結果に含まれない', () => {
            const items: ExtractedItem[] = [
                { url: 'https://example.com/', title: 'Example', source: 'cookie' },
                { url: 'https://random-site.org/', title: 'Random', source: 'history' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(0)
        })

        it('無効なURLはスキップされる', () => {
            const items: ExtractedItem[] = [
                { url: 'invalid-url', title: 'Invalid', source: 'bookmark' },
                { url: 'https://www.netflix.com/', title: 'Netflix', source: 'history' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(1)
        })

        it('空の入力リストは空の結果を返す', () => {
            const result = matchPatterns([])
            expect(result).toHaveLength(0)
        })
    })

    describe('複数カテゴリ', () => {
        it('複数の異なるカテゴリのサービスを検出する', () => {
            const items: ExtractedItem[] = [
                { url: 'https://www.rakuten-bank.co.jp/', title: '楽天銀行', source: 'bookmark' },
                { url: 'https://store.steampowered.com/', title: 'Steam', source: 'history' },
                { url: 'https://www.netflix.com/', title: 'Netflix', source: 'cookie' },
                { url: 'https://www.spotify.com/', title: 'Spotify', source: 'bookmark' },
            ]
            const result = matchPatterns(items)
            expect(result).toHaveLength(4)

            const categories = result.map((r) => r.category)
            expect(categories).toContain('banking')
            expect(categories).toContain('gaming')
            expect(categories).toContain('video_streaming')
            expect(categories).toContain('music_streaming')
        })
    })
})

describe('normalizeUrl', () => {
    it('パスを除去してホスト名のみにする', () => {
        expect(normalizeUrl('https://www.example.com/path/to/page')).toBe('https://www.example.com')
    })

    it('クエリパラメータを除去する', () => {
        expect(normalizeUrl('https://www.example.com/page?foo=bar')).toBe('https://www.example.com')
    })

    it('プロトコルを維持する', () => {
        expect(normalizeUrl('http://www.example.com/')).toBe('http://www.example.com')
    })
})

describe('inferServiceName', () => {
    it('ホスト名からサービス名を推定する', () => {
        expect(inferServiceName('www.netflix.com')).toBe('Netflix')
    })

    it('wwwプレフィックスを除去する', () => {
        expect(inferServiceName('www.spotify.com')).toBe('Spotify')
    })

    it('サブドメインなしのホスト名を処理する', () => {
        expect(inferServiceName('example.com')).toBe('Example')
    })
})
