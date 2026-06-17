import { LATENCY_SERVICE_CONFIG, type LatencyServiceKey } from '@/api/latency'
import { ref } from 'vue'

type IPInfo = {
  ip: string[]
  ipWithPrivacy: string[]
}

export const ipForChina = ref<IPInfo>({
  ip: [],
  ipWithPrivacy: [],
})
export const ipForGlobal = ref<IPInfo>({
  ip: [],
  ipWithPrivacy: [],
})

export const latencyMap = ref<Record<LatencyServiceKey, string>>(
  Object.fromEntries(
    Object.keys(LATENCY_SERVICE_CONFIG).map((key) => [key, '']),
  ) as Record<LatencyServiceKey, string>,
)

export const latencyStatusMap = ref<Record<LatencyServiceKey, 'idle' | 'checking' | 'available' | 'unavailable'>>(
  Object.fromEntries(
    Object.keys(LATENCY_SERVICE_CONFIG).map((key) => [key, 'idle']),
  ) as Record<LatencyServiceKey, 'idle' | 'checking' | 'available' | 'unavailable'>,
)
