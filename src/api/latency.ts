export const LATENCY_SERVICES = [
  { key: 'google', label: 'Google', url: 'https://www.google.com/favicon.ico', method: 'fetch' },
  { key: 'cloudflare', label: 'Cloudflare', url: 'https://www.cloudflare.com/favicon.ico', method: 'fetch' },
  { key: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/favicon.ico', method: 'fetch' },
  { key: 'github', label: 'GitHub', url: 'https://github.com/favicon.ico', method: 'fetch' },
  { key: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/favicon.ico', method: 'fetch' },
  { key: 'steam', label: 'Steam', url: 'https://store.steampowered.com/favicon.ico', method: 'fetch' },
  { key: 'discord', label: 'Discord', url: 'https://discord.com/app', method: 'fetch' },
  { key: 'discordvoice', label: 'Discord Voice (est.)', url: 'https://status.discord.com/api/v2/status.json', method: 'fetch' },
  { key: 'telegram', label: 'Telegram', url: 'https://web.telegram.org/', method: 'fetch' },
  { key: 'twitch', label: 'Twitch', url: 'https://www.twitch.tv/favicon.ico', method: 'fetch' },
  { key: 'faceit', label: 'Faceit', url: 'https://www.faceit.com/favicon.ico', method: 'fetch' },
  { key: 'meta', label: 'Meta', url: 'https://www.meta.com/favicon.ico', method: 'fetch' },
  { key: 'whatsapp', label: 'WhatsApp', url: 'https://www.whatsapp.com/favicon.ico', method: 'fetch' },
  { key: 'reddit', label: 'Reddit', url: 'https://www.reddit.com/favicon.ico', method: 'fetch' },
  { key: 'x', label: 'X', url: 'https://x.com/favicon.ico', method: 'fetch' },
  { key: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/favicon.ico', method: 'fetch' },
  { key: 'netflix', label: 'Netflix', url: 'https://www.netflix.com/favicon.ico', method: 'fetch' },
  { key: 'spotify', label: 'Spotify', url: 'https://open.spotify.com/favicon.ico', method: 'fetch' },
  { key: 'amazon', label: 'Amazon', url: 'https://www.amazon.com/favicon.ico', method: 'fetch' },
  { key: 'aliexpress', label: 'AliExpress', url: 'https://www.aliexpress.com/favicon.ico', method: 'fetch' },
  { key: 'epicgames', label: 'Epic Games', url: 'https://www.epicgames.com/favicon.ico', method: 'fetch' },
  { key: 'battle', label: 'Battle.net', url: 'https://www.battle.net/favicon.ico', method: 'fetch' },
  { key: 'openai', label: 'OpenAI', url: 'https://chatgpt.com/favicon.ico', method: 'fetch' },
  { key: 'microsoft', label: 'Microsoft', url: 'https://www.microsoft.com/favicon.ico', method: 'fetch' },
  { key: 'apple', label: 'Apple', url: 'https://www.apple.com/favicon.ico', method: 'fetch' },
  { key: 'playstation', label: 'PlayStation', url: 'https://www.playstation.com/favicon.ico', method: 'fetch' },
  { key: 'xbox', label: 'Xbox', url: 'https://www.xbox.com/favicon.ico', method: 'fetch' },
  { key: 'zoom', label: 'Zoom', url: 'https://zoom.us/favicon.ico', method: 'fetch' },
  { key: 'pinterest', label: 'Pinterest', url: 'https://www.pinterest.com/favicon.ico', method: 'fetch' },
  { key: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/favicon.ico', method: 'fetch' },
  { key: 'wikipedia', label: 'Wikipedia', url: 'https://www.wikipedia.org/static/favicon/wikipedia.ico', method: 'fetch' },
] as const

export type LatencyService = (typeof LATENCY_SERVICES)[number]
export type LatencyServiceKey = LatencyService['key']

export const LATENCY_SERVICE_CONFIG: Record<LatencyServiceKey, LatencyService> =
  Object.fromEntries(LATENCY_SERVICES.map((service) => [service.key, service])) as Record<
    LatencyServiceKey,
    LatencyService
  >

export type LatencyCheckResult = {
  available: boolean
  latency: number | null
}

const checkImageAvailability = (url: string, timeout: number) => {
  return new Promise<LatencyCheckResult>((resolve) => {
    const startTime = performance.now()
    const img = document.createElement('img')
    const timer = window.setTimeout(() => {
      img.remove()
      resolve({ available: false, latency: null })
    }, timeout)
    img.src = url + '?_=' + new Date().getTime()
    img.style.display = 'none'
    img.onload = () => {
      clearTimeout(timer)
      const endTime = performance.now()
      img.remove()

      resolve({ available: true, latency: endTime - startTime })
    }
    img.onerror = () => {
      clearTimeout(timer)
      img.remove()

      resolve({ available: false, latency: null })
    }

    document.body.appendChild(img)
  })
}

const checkFetchAvailability = async (url: string, timeout: number): Promise<LatencyCheckResult> => {
  const startTime = performance.now()
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), timeout)

  try {
    await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    })

    return {
      available: true,
      latency: performance.now() - startTime,
    }
  } catch {
    return checkImageAvailability(url, timeout)
  } finally {
    clearTimeout(timer)
  }
}

export const getLatencyByServiceAPI = (service: LatencyServiceKey) => {
  const target = LATENCY_SERVICE_CONFIG[service]

  if (target.method === 'fetch') {
    return checkFetchAvailability(target.url, 8000)
  }

  return checkImageAvailability(target.url, 8000)
}
