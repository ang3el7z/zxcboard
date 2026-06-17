<template>
  <div class="relative flex flex-col text-sm">
    <div class="flex items-center gap-2 px-1">
      <div class="indicator">
        <span
          v-if="isUIUpdateAvailable"
          class="indicator-item top-1 -right-1 flex"
        >
          <span class="bg-secondary absolute h-2 w-2 animate-ping rounded-full"></span>
          <span class="bg-secondary h-2 w-2 rounded-full"></span>
        </span>
        <a
          href="https://github.com/ang3el7z/zxcboard"
          target="_blank"
          class="text-lg font-semibold"
        >
          zxcboard
          <span class="text-sm font-normal opacity-50">
            {{ zxcboardVersion }}
            <span
              v-if="commitId"
              class="text-xs"
            >
              {{ commitId }}
            </span>
          </span>
        </a>
      </div>
      <button
        v-if="isUIUpdateAvailable"
        :class="['btn btn-ghost btn-xs btn-circle', isUIUpgrading ? 'animate-pulse' : '']"
        :title="$t('upgradeDashboard')"
        @click="handlerClickUpgradeUI"
      >
        <ArrowPathIcon class="h-4 w-4" />
      </button>
    </div>

    <StyleSettings />
    <GeneralSettings />
  </div>
</template>

<script setup lang="ts">
import { upgradeUIAPI, zxcboardVersion } from '@/api'
import { useSettings } from '@/composables/settings'
import { handlerUpgradeSuccess } from '@/helper'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import GeneralSettings from './GeneralSettings.vue'
import StyleSettings from './StyleSettings.vue'

const commitId = __COMMIT_ID__

const { isUIUpdateAvailable } = useSettings()
const isUIUpgrading = ref(false)

const handlerClickUpgradeUI = async () => {
  if (isUIUpgrading.value) return
  isUIUpgrading.value = true

  try {
    await upgradeUIAPI()
    isUIUpgrading.value = false
    handlerUpgradeSuccess()
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  } catch {
    isUIUpgrading.value = false
  }
}
</script>
