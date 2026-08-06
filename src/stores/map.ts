import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { RegionNode } from '@/types/region'
import { ROOT_REGION } from '@/utils/region'

export const useMapStore = defineStore('map', () => {
  const trail = ref<RegionNode[]>([{ ...ROOT_REGION }])
  const hoveredName = ref('')
  const selectedDistrict = ref<RegionNode | null>(null)

  const current = computed(() => trail.value[trail.value.length - 1])

  function resetTrail() {
    trail.value = [{ ...ROOT_REGION }]
    selectedDistrict.value = null
    hoveredName.value = ''
  }

  function pushRegion(region: RegionNode) {
    const exists = trail.value.findIndex((item) => item.adcode === region.adcode)
    if (exists >= 0) {
      trail.value = trail.value.slice(0, exists + 1)
    } else {
      trail.value = [...trail.value, region]
    }
    selectedDistrict.value = null
  }

  function goToIndex(index: number) {
    if (index < 0 || index >= trail.value.length) return
    trail.value = trail.value.slice(0, index + 1)
    selectedDistrict.value = null
  }

  function syncFromRoute(adcode: string, name?: string) {
    if (adcode === ROOT_REGION.adcode) {
      resetTrail()
      return
    }

    const last = trail.value[trail.value.length - 1]
    if (last.adcode === adcode) return

    const found = trail.value.findIndex((item) => item.adcode === adcode)
    if (found >= 0) {
      goToIndex(found)
      return
    }

    pushRegion({
      adcode,
      name: name || adcode,
    })
  }

  return {
    trail,
    hoveredName,
    selectedDistrict,
    current,
    resetTrail,
    pushRegion,
    goToIndex,
    syncFromRoute,
  }
})
