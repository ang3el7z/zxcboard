<template>
  <!-- overview -->
  <template v-if="!splitOverviewPage">
    <OverviewCard />
  </template>

  <div
    v-if="hasVisibleItems"
    class="flex flex-col gap-3 text-sm"
  >
    <div class="settings-grid">
      <div
        v-if="isVisibleSplitOverviewPage"
        class="setting-item"
      >
        <div class="setting-item-label">
          {{ $t('splitOverviewPage') }}
        </div>
        <input
          class="toggle"
          type="checkbox"
          v-model="splitOverviewPage"
        />
      </div>
      <div
        v-if="isVisibleAutoIPCheckWhenStart"
        class="setting-item"
      >
        <div class="setting-item-label">
          {{ $t('autoIPCheckWhenStart') }}
        </div>
        <input
          class="toggle"
          type="checkbox"
          v-model="autoIPCheck"
        />
      </div>
      <div
        v-if="isVisibleAutoConnectionCheckWhenStart"
        class="setting-item"
      >
        <div class="setting-item-label">
          {{ $t('autoConnectionCheckWhenStart') }}
        </div>
        <input
          class="toggle"
          type="checkbox"
          v-model="autoConnectionCheck"
        />
      </div>
      <div
        v-if="isVisibleLatencyServices"
        class="setting-item"
      >
        <div class="setting-item-label">
          {{ $t('latencyServices') }}
          <template v-if="enabledLatencyServices.length">
            ({{ enabledLatencyServices.length }})
          </template>
        </div>
        <button
          class="btn btn-sm"
          @click="isLatencyServicesDialogOpen = true"
        >
          {{ $t('settings') }}
        </button>
      </div>
      <DialogWrapper
        v-model="isLatencyServicesDialogOpen"
        :title="$t('latencyServices')"
      >
        <div class="flex max-h-[70vh] flex-col gap-3 overflow-y-auto text-sm">
          <div class="setting-item-label">
            {{ enabledLatencyServices.length }} / {{ latencyServicesOptions.length }}
          </div>
          <div class="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
            <label
              v-for="service in latencyServicesOptions"
              :key="service.key"
              class="border-base-border bg-base-150 flex items-center gap-2 rounded-lg border px-3 py-2"
            >
              <input
                :checked="enabledLatencyServices.includes(service.key)"
                type="checkbox"
                class="checkbox checkbox-sm"
                @change="toggleLatencyService(service.key)"
              />
              <span>{{ service.label }}</span>
            </label>
          </div>
        </div>
      </DialogWrapper>
      <div
        v-if="isVisibleShowStatisticsWhenSidebarCollapsed"
        class="setting-item max-md:hidden"
      >
        <div class="setting-item-label">
          {{ $t('showStatisticsWhenSidebarCollapsed') }}
        </div>
        <input
          class="toggle"
          type="checkbox"
          v-model="showStatisticsWhenSidebarCollapsed"
        />
      </div>
      <div
        v-if="isVisibleNumberOfChartsInSidebar"
        class="setting-item max-md:hidden"
      >
        <div class="setting-item-label">
          {{ $t('numberOfChartsInSidebar') }}
        </div>
        <select
          class="select select-sm min-w-24"
          v-model="numberOfChartsInSidebar"
        >
          <option
            v-for="opt in [1, 2, 3]"
            :key="opt"
            :value="opt"
          >
            {{ opt }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LATENCY_SERVICE_CONFIG, type LatencyServiceKey } from '@/api/latency'
import DialogWrapper from '@/components/common/DialogWrapper.vue'
import { useHasAnyVisibleSetting, useIsSettingVisible } from '@/composables/settings'
import { getItemKeysByCategory, OVERVIEW_ITEM_KEYS } from '@/config/settingsItems'
import { SETTINGS_MENU_KEY } from '@/constant'
import {
  autoConnectionCheck,
  autoIPCheck,
  enabledLatencyServices,
  numberOfChartsInSidebar,
  showStatisticsWhenSidebarCollapsed,
  splitOverviewPage,
} from '@/store/settings'
import { computed, ref } from 'vue'
import OverviewCard from './OverviewCard.vue'

const k = OVERVIEW_ITEM_KEYS
const isVisibleSplitOverviewPage = useIsSettingVisible(k.splitOverviewPage)
const isVisibleAutoIPCheckWhenStart = useIsSettingVisible(k.autoIPCheckWhenStart)
const isVisibleAutoConnectionCheckWhenStart = useIsSettingVisible(k.autoConnectionCheckWhenStart)
const isVisibleLatencyServices = useIsSettingVisible(k.latencyServices)
const isVisibleShowStatisticsWhenSidebarCollapsed = useIsSettingVisible(
  k.showStatisticsWhenSidebarCollapsed,
)
const isVisibleNumberOfChartsInSidebar = useIsSettingVisible(k.numberOfChartsInSidebar)
const isLatencyServicesDialogOpen = ref(false)

const latencyServicesOptions = Object.values(LATENCY_SERVICE_CONFIG)

const toggleLatencyService = (service: LatencyServiceKey) => {
  if (enabledLatencyServices.value.includes(service)) {
    enabledLatencyServices.value = enabledLatencyServices.value.filter((item) => item !== service)
    return
  }

  enabledLatencyServices.value = [...enabledLatencyServices.value, service]
}

const overviewGridKeys = getItemKeysByCategory(SETTINGS_MENU_KEY.overview).slice(2)
const hasVisibleItems = useHasAnyVisibleSetting(overviewGridKeys)
</script>
