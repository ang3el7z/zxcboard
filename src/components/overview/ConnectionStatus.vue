<template>
  <div class="bg-base-200/30 flex flex-col rounded-xl p-4">
    <div class="flex items-center justify-between">
      <div class="text-base-content/60 text-xs font-semibold tracking-wider uppercase">
        {{ $t('serviceAvailability') }}
      </div>
      <div class="flex items-center gap-1">
        <button
          class="btn btn-ghost btn-xs btn-circle"
          @click="showLatency = !showLatency"
          :title="$t(showLatency ? 'hidePing' : 'showPing')"
        >
          <EyeIcon
            v-if="!showLatency"
            class="h-3.5 w-3.5"
          />
          <EyeSlashIcon
            v-else
            class="h-3.5 w-3.5"
          />
        </button>
        <button
          class="btn btn-ghost btn-xs btn-circle"
          @click="getLatency"
        >
          <BoltIcon class="h-3.5 w-3.5" />
        </button>
      </div>
    </div>

    <div class="mt-3 flex flex-col gap-2.5">
      <div
        v-for="item in latencyItems"
        :key="item.key"
        class="flex items-center justify-between"
      >
        <span class="text-base-content/70 text-sm">{{ item.name }}</span>
        <div class="flex items-center gap-2">
          <span
            class="text-sm font-medium"
            :class="getStatusClass(item.status)"
          >
            {{ getStatusLabel(item.status) }}
          </span>
          <span
            v-if="showLatency"
            class="flex min-w-20 items-center justify-end gap-1.5 text-sm font-medium"
            :class="item.value ? getColorForLatency(Number(item.value)) : 'text-base-content/35'"
          >
            <template v-if="item.value">{{ item.value }}ms</template>
            <template v-else>--</template>
            <SignalStrength
              v-if="item.value"
              :latency="Number(item.value)"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getLatencyByServiceAPI,
  LATENCY_SERVICE_CONFIG,
  type LatencyServiceKey,
} from '@/api/latency'
import { latencyMap, latencyStatusMap } from '@/composables/overview'
import { getColorForLatency } from '@/helper'
import { autoConnectionCheck, enabledLatencyServices } from '@/store/settings'
import { BoltIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SignalStrength from './SignalStrength.vue'

const { t } = useI18n()
const showLatency = ref(false)

const latencyItems = computed(() =>
  enabledLatencyServices.value.map((service) => ({
    key: service,
    name: LATENCY_SERVICE_CONFIG[service].label,
    value: latencyMap.value[service],
    status: latencyStatusMap.value[service],
  })),
)

const getLatency = async () => {
  enabledLatencyServices.value.forEach((service: LatencyServiceKey) => {
    latencyStatusMap.value[service] = 'checking'
    latencyMap.value[service] = ''

    getLatencyByServiceAPI(service).then((res) => {
      latencyStatusMap.value[service] = res.available ? 'available' : 'unavailable'
      latencyMap.value[service] = res.latency ? res.latency.toFixed(0) : ''
    })
  })
}

const getStatusClass = (status: 'idle' | 'checking' | 'available' | 'unavailable') => {
  switch (status) {
    case 'available':
      return 'text-success'
    case 'unavailable':
      return 'text-error'
    case 'checking':
      return 'text-warning'
    default:
      return 'text-base-content/35'
  }
}

const getStatusLabel = (status: 'idle' | 'checking' | 'available' | 'unavailable') => {
  switch (status) {
    case 'available':
      return t('available')
    case 'unavailable':
      return t('unavailable')
    case 'checking':
      return t('checkingStatus')
    default:
      return '--'
  }
}

onMounted(() => {
  if (
    autoConnectionCheck.value &&
    enabledLatencyServices.value.some((service) => latencyStatusMap.value[service] === 'idle')
  ) {
    getLatency()
  }
})
</script>
