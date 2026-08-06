import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const appName = ref('美食地图')
  const tagline = ref('探索国内各地美食与特产')

  const pageTitle = computed(() => appName.value)

  return {
    appName,
    tagline,
    pageTitle,
  }
})
