<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import DistrictSpecialtyPanel from '@/components/DistrictSpecialtyPanel.vue'
import RegionMap from '@/components/RegionMap.vue'
import { useAppStore } from '@/stores/app'
import { useMapStore } from '@/stores/map'
import type { RegionNode } from '@/types/region'
import { canDrillDown, ROOT_REGION } from '@/utils/region'
import { getSpecialtyByAdcode } from '@/utils/specialty'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const mapStore = useMapStore()

const childLevel = ref('province')

const adcode = computed(() => {
  const param = route.params.adcode
  return typeof param === 'string' && param ? param : ROOT_REGION.adcode
})

const childLevelLabel = computed(() => {
  const labels: Record<string, string> = {
    province: '省',
    city: '市',
    district: '区县',
  }
  return labels[childLevel.value] || '区域'
})

const levelHint = computed(() => {
  if (childLevel.value === 'district') {
    return '点击区县即可选中（已是最末级）'
  }
  return `点击${childLevelLabel.value}级区块进入下一级`
})

const selectedSpecialty = computed(() => {
  const district = mapStore.selectedDistrict
  if (!district) return null
  return getSpecialtyByAdcode(district.adcode)
})

watch(
  () => [adcode.value, route.query.name] as const,
  ([code, name]) => {
    mapStore.syncFromRoute(code, typeof name === 'string' ? name : undefined)
  },
  { immediate: true },
)

async function onRegionClick(region: RegionNode) {
  const drillable = await canDrillDown(region.adcode)
  if (!drillable) {
    mapStore.selectedDistrict = region
    return
  }

  mapStore.pushRegion(region)
  if (region.adcode === ROOT_REGION.adcode) {
    await router.push({ name: 'home' })
    return
  }

  await router.push({
    name: 'region',
    params: { adcode: region.adcode },
    query: { name: region.name },
  })
}

async function goTrail(index: number) {
  mapStore.goToIndex(index)
  const target = mapStore.trail[index]
  if (!target || target.adcode === ROOT_REGION.adcode) {
    await router.push({ name: 'home' })
    return
  }
  await router.push({
    name: 'region',
    params: { adcode: target.adcode },
    query: { name: target.name },
  })
}

function onHover(name: string) {
  mapStore.hoveredName = name
}

function onMapReady(payload: { childLevel: string }) {
  childLevel.value = payload.childLevel
}
</script>

<template>
  <section class="atlas">
    <div class="atlas__atmosphere" aria-hidden="true" />
    <div class="atlas__grain" aria-hidden="true" />

    <header class="atlas__header">
      <div class="atlas__brand-block">
        <p class="atlas__seal">图志</p>
        <h1 class="atlas__brand">{{ appStore.appName }}</h1>
        <p class="atlas__tagline">{{ appStore.tagline }}</p>
      </div>

      <nav class="atlas__trail" aria-label="行政区导航">
        <button
          v-for="(item, index) in mapStore.trail"
          :key="item.adcode"
          type="button"
          class="atlas__crumb"
          :class="{ 'is-current': index === mapStore.trail.length - 1 }"
          :disabled="index === mapStore.trail.length - 1"
          @click="goTrail(index)"
        >
          <span v-if="index > 0" class="atlas__crumb-sep">/</span>
          {{ item.name }}
        </button>
      </nav>
    </header>

    <div class="atlas__stage">
      <aside class="atlas__meta" :class="{ 'has-specialty': !!selectedSpecialty }">
        <p class="atlas__meta-label">当前区域</p>
        <h2 class="atlas__meta-title">
          {{ mapStore.selectedDistrict?.name || mapStore.current.name }}
        </h2>
        <p class="atlas__meta-hint">
          <template v-if="selectedSpecialty">
            本区特产与特色产品一览
          </template>
          <template v-else-if="mapStore.selectedDistrict">
            已选中区县，可从上方路径返回上级
          </template>
          <template v-else>
            {{ levelHint }}
          </template>
        </p>
        <DistrictSpecialtyPanel
          v-if="selectedSpecialty"
          :specialty="selectedSpecialty"
        />
        <ul class="atlas__legend" aria-label="地图图例">
          <li>
            <span class="atlas__swatch atlas__swatch--data" />
            有特产数据
          </li>
          <li>
            <span class="atlas__swatch atlas__swatch--empty" />
            暂无数据
          </li>
        </ul>
        <p
          class="atlas__hover"
          :class="{ 'is-active': !!mapStore.hoveredName }"
          aria-live="polite"
        >
          {{ mapStore.hoveredName || '\u00a0' }}
        </p>
      </aside>

      <div class="atlas__map-shell">
        <RegionMap
          :adcode="adcode"
          @region-click="onRegionClick"
          @region-hover="onHover"
          @ready="onMapReady"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.atlas {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 64px);
  max-height: calc(100dvh - 64px);
  padding: clamp(12px, 2vw, 24px);
  overflow: hidden;
  box-sizing: border-box;
  color: #0f2444;
}

.atlas__atmosphere {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 55% at 15% 10%, rgba(184, 59, 46, 0.1), transparent 55%),
    radial-gradient(ellipse 70% 60% at 85% 20%, rgba(27, 75, 138, 0.16), transparent 50%),
    radial-gradient(ellipse 90% 70% at 50% 100%, rgba(90, 140, 170, 0.14), transparent 55%),
    linear-gradient(165deg, #eef3f8 0%, #e2ebf3 42%, #d7e3ee 100%);
  z-index: 0;
}

.atlas__grain {
  position: absolute;
  inset: 0;
  opacity: 0.35;
  pointer-events: none;
  z-index: 1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
}

.atlas__header,
.atlas__stage {
  position: relative;
  z-index: 2;
}

.atlas__header {
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px 28px;
  margin-bottom: clamp(10px, 1.6vw, 18px);
  animation: rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.atlas__brand-block {
  max-width: 28rem;
}

.atlas__seal {
  display: inline-block;
  margin: 0 0 4px;
  padding: 2px 8px;
  border: 1.5px solid #b83b2e;
  color: #b83b2e;
  font-family: 'ZCOOL XiaoWei', 'Noto Serif SC', serif;
  font-size: 0.7rem;
  letter-spacing: 0.35em;
  line-height: 1.3;
  transform: rotate(-2deg);
  animation: seal-in 0.8s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.atlas__brand {
  margin: 0;
  font-family: 'ZCOOL XiaoWei', 'Noto Serif SC', serif;
  font-size: clamp(1.8rem, 3.6vw, 2.6rem);
  font-weight: 400;
  letter-spacing: 0.12em;
  line-height: 1.1;
  color: #0f2444;
}

.atlas__tagline {
  margin: 6px 0 0;
  max-width: 22rem;
  color: rgba(15, 36, 68, 0.68);
  font-family: 'Noto Serif SC', serif;
  font-size: 0.88rem;
  letter-spacing: 0.08em;
  line-height: 1.5;
  animation: rise 0.8s 0.12s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.atlas__trail {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px 0;
  padding: 4px 0;
  font-family: 'Noto Serif SC', serif;
}

.atlas__crumb {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 2px;
  border: 0;
  background: transparent;
  color: #1b4b8a;
  font: inherit;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: color 0.2s ease;
}

.atlas__crumb:hover:not(:disabled) {
  color: #b83b2e;
}

.atlas__crumb.is-current,
.atlas__crumb:disabled {
  color: #0f2444;
  cursor: default;
  font-weight: 600;
}

.atlas__crumb-sep {
  margin-right: 6px;
  color: rgba(15, 36, 68, 0.35);
}

.atlas__stage {
  display: grid;
  flex: 1;
  grid-template-columns: minmax(200px, 260px) minmax(0, 1fr);
  gap: clamp(12px, 1.8vw, 24px);
  min-height: 0;
  animation: rise 0.85s 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.atlas__meta {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 0;
  padding-bottom: 8px;
  overflow: hidden;
}

.atlas__meta.has-specialty {
  justify-content: flex-start;
  overflow-y: auto;
  padding-right: 4px;
  scrollbar-width: thin;
  scrollbar-color: rgba(27, 75, 138, 0.35) transparent;
}

.atlas__meta-label {
  margin: 0;
  color: rgba(27, 75, 138, 0.7);
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

.atlas__meta-title {
  margin: 8px 0 0;
  font-family: 'ZCOOL XiaoWei', 'Noto Serif SC', serif;
  font-size: clamp(1.35rem, 2.4vw, 1.9rem);
  font-weight: 400;
  letter-spacing: 0.1em;
  line-height: 1.2;
}

.atlas__meta-hint {
  margin: 8px 0 0;
  color: rgba(15, 36, 68, 0.58);
  font-family: 'Noto Serif SC', serif;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  line-height: 1.55;
}

.atlas__legend {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
  color: rgba(15, 36, 68, 0.72);
  font-family: 'Noto Serif SC', serif;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
}

.atlas__legend li {
  display: flex;
  align-items: center;
  gap: 10px;
}

.atlas__swatch {
  width: 18px;
  height: 12px;
  flex-shrink: 0;
  border-radius: 2px;
}

.atlas__swatch--data {
  background: linear-gradient(135deg, #8bb3e0, #3d6fad);
  box-shadow: 0 0 0 1px #1b4b8a;
}

.atlas__swatch--empty {
  background: #d5dbe3;
  box-shadow: 0 0 0 1px #a8b4c4;
}

.atlas__hover {
  margin: 12px 0 0;
  min-height: 1.5em;
  color: #b83b2e;
  font-family: 'Noto Serif SC', serif;
  font-size: 0.95rem;
  letter-spacing: 0.12em;
  line-height: 1.5;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.atlas__hover.is-active {
  opacity: 1;
}

.atlas__map-shell {
  position: relative;
  min-height: 0;
  height: 100%;
  border: 1px solid rgba(27, 75, 138, 0.22);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.28));
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.45),
    0 24px 60px rgba(15, 36, 68, 0.08);
}

.atlas__map-shell::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 1px dashed rgba(27, 75, 138, 0.18);
  pointer-events: none;
  z-index: 1;
}

@media (max-width: 860px) {
  .atlas {
    height: auto;
    max-height: none;
    overflow: visible;
  }

  .atlas__stage {
    grid-template-columns: 1fr;
    flex: none;
  }

  .atlas__meta {
    order: -1;
    padding-bottom: 0;
    overflow: visible;
  }

  .atlas__meta.has-specialty {
    max-height: 40vh;
  }

  .atlas__map-shell {
    height: min(58vh, 520px);
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes seal-in {
  from {
    opacity: 0;
    transform: rotate(-8deg) scale(0.9);
  }
  to {
    opacity: 1;
    transform: rotate(-2deg) scale(1);
  }
}
</style>
