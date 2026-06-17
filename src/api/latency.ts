export const LATENCY_SERVICES = [
  { key: 'google', label: 'Google', url: 'https://www.google.com/favicon.ico' },
  { key: 'cloudflare', label: 'Cloudflare', url: 'https://www.cloudflare.com/favicon.ico' },
  { key: 'youtube', label: 'YouTube', url: 'https://yt3.ggpht.com/favicon.ico' },
  { key: 'github', label: 'GitHub', url: 'https://github.githubassets.com/favicon.ico' },
  { key: 'instagram', label: 'Instagram', url: 'https://static.cdninstagram.com/rsrc.php/y4/r/QaBlI0OZiks.ico' },
  { key: 'steam', label: 'Steam', url: 'https://store.cloudflare.steamstatic.com/public/shared/images/responsive/share_steam_logo.png' },
  { key: 'discord', label: 'Discord', url: 'https://cdn.discordapp.com/embed/avatars/0.png' },
  { key: 'telegram', label: 'Telegram', url: 'https://telegram.org/img/website_icon.svg' },
  { key: 'twitch', label: 'Twitch', url: 'https://static.twitchcdn.net/assets/favicon-32-e29e246c157142c94346.png' },
  { key: 'faceit', label: 'Faceit', url: 'https://cdn-frontend.faceit-cdn.net/web/assets/favicon.ico' },
  { key: 'meta', label: 'Meta', url: 'https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico' },
  { key: 'whatsapp', label: 'WhatsApp', url: 'https://static.whatsapp.net/rsrc.php/yZ/r/JvsnINJ2CZv.svg' },
  { key: 'reddit', label: 'Reddit', url: 'https://www.redditstatic.com/shreddit/assets/favicon/64x64.png' },
  { key: 'x', label: 'X', url: 'https://abs.twimg.com/favicons/twitter.3.ico' },
  { key: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/favicon.ico' },
  { key: 'netflix', label: 'Netflix', url: 'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico' },
  { key: 'spotify', label: 'Spotify', url: 'https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png' },
  { key: 'amazon', label: 'Amazon', url: 'https://www.amazon.com/favicon.ico' },
  { key: 'aliexpress', label: 'AliExpress', url: 'https://ae01.alicdn.com/kf/S4f8f1b1b4d7f4f54a42ff3eb2f0f0b66Q.png' },
  { key: 'epicgames', label: 'Epic Games', url: 'https://static-assets-prod.epicgames.com/epic-store/static/favicon.ico' },
  { key: 'battle', label: 'Battle.net', url: 'https://www.battle.net/favicon.ico' },
  { key: 'openai', label: 'OpenAI', url: 'https://chatgpt.com/favicon.ico' },
  { key: 'microsoft', label: 'Microsoft', url: 'https://www.microsoft.com/favicon.ico' },
  { key: 'apple', label: 'Apple', url: 'https://www.apple.com/favicon.ico' },
  { key: 'playstation', label: 'PlayStation', url: 'https://www.playstation.com/favicon.ico' },
  { key: 'xbox', label: 'Xbox', url: 'https://www.xbox.com/favicon.ico' },
  { key: 'zoom', label: 'Zoom', url: 'https://st1.zoom.us/zoom.ico' },
  { key: 'pinterest', label: 'Pinterest', url: 'https://s.pinimg.com/webapp/favicon-16x16.png' },
  { key: 'linkedin', label: 'LinkedIn', url: 'https://static.licdn.com/aero-v1/sc/h/8s162nmbcnfkg7a0k8nq9wwqo' },
  { key: 'wikipedia', label: 'Wikipedia', url: 'https://www.wikipedia.org/static/favicon/wikipedia.ico' },
  { key: 'yandex', label: 'Yandex', url: 'https://yandex.ru/favicon.ico' },
  { key: 'dzen', label: 'Dzen', url: 'https://dzen.ru/favicon.ico' },
  { key: 'vk', label: 'VK', url: 'https://vk.com/images/icons/favicons/fav_logo.ico' },
  { key: 'ok', label: 'OK', url: 'https://ok.ru/favicon.ico' },
  { key: 'mailru', label: 'Mail.ru', url: 'https://mail.ru/favicon.ico' },
  { key: 'rutube', label: 'RuTube', url: 'https://rutube.ru/favicon.ico' },
  { key: 'kinopoisk', label: 'Kinopoisk', url: 'https://www.kinopoisk.ru/favicon.ico' },
  { key: 'yandexmusic', label: 'Yandex Music', url: 'https://music.yandex.ru/favicon.ico' },
  { key: 'ozon', label: 'Ozon', url: 'https://www.ozon.ru/favicon.ico' },
  { key: 'wildberries', label: 'Wildberries', url: 'https://www.wildberries.ru/favicon.ico' },
  { key: 'avito', label: 'Avito', url: 'https://www.avito.ru/favicon.ico' },
  { key: 'gosuslugi', label: 'Gosuslugi', url: 'https://www.gosuslugi.ru/favicon.ico' },
  { key: 'sber', label: 'Sber', url: 'https://www.sberbank.ru/favicon.ico' },
  { key: 'tbank', label: 'T-Bank', url: 'https://www.tbank.ru/favicon.ico' },
  { key: 'rbc', label: 'RBC', url: 'https://www.rbc.ru/favicon.ico' },
  { key: 'lenta', label: 'Lenta', url: 'https://lenta.ru/favicon.ico' },
  { key: 'ria', label: 'RIA', url: 'https://ria.ru/favicon.ico' },
  { key: 'yapogoda', label: 'Yandex Weather', url: 'https://yandex.ru/pogoda/favicon.ico' },
] as const

export type LatencyService = (typeof LATENCY_SERVICES)[number]
export type LatencyServiceKey = LatencyService['key']

export const LATENCY_SERVICE_CONFIG: Record<LatencyServiceKey, LatencyService> =
  Object.fromEntries(LATENCY_SERVICES.map((service) => [service.key, service])) as Record<
    LatencyServiceKey,
    LatencyService
  >

const getLatencyFromUrlAPI = (url: string) => {
  return new Promise<number>((resolve) => {
    const startTime = performance.now()
    const img = document.createElement('img')
    img.src = url + '?_=' + new Date().getTime()
    img.style.display = 'none'
    img.onload = () => {
      const endTime = performance.now()
      img.remove()

      resolve(endTime - startTime)
    }
    img.onerror = () => {
      img.remove()

      resolve(0)
    }

    document.body.appendChild(img)
  })
}

export const getLatencyByServiceAPI = (service: LatencyServiceKey) => {
  return getLatencyFromUrlAPI(LATENCY_SERVICE_CONFIG[service].url)
}
