<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import * as echarts from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'

import type { GeoJSON, RegionNode } from '@/types/region'
import { loadRegionGeoJSON, normalizeAdcode } from '@/utils/region'
import { hasSpecialtyData } from '@/utils/specialty'

const props = defineProps<{
  adcode: string
}>()

const emit = defineEmits<{
  ready: [payload: { featureCount: number; childLevel: string }]
  regionClick: [region: RegionNode]
  regionHover: [name: string]
  error: [message: string]
}>()

const hostRef = ref<HTMLDivElement | null>(null)
const chart = shallowRef<ECharts | null>(null)
const loading = ref(true)
const errorMessage = ref('')

/** 有特产数据：钴蓝阶；无数据：冷灰雾色 */
const HAS_DATA_PALETTE = ['#8bb3e0', '#6a99d1', '#4f82c4', '#3d6fad']
const NO_DATA_COLOR = '#d5dbe3'
const NO_DATA_BORDER = '#a8b4c4'

function buildOption(geo: GeoJSON): EChartsOption {
  let hasDataIndex = 0
  const data = geo.features.map((feature) => {
    const adcode = normalizeAdcode(feature.properties.adcode)
    const hasData = hasSpecialtyData(adcode)
    const areaColor = hasData
      ? HAS_DATA_PALETTE[hasDataIndex++ % HAS_DATA_PALETTE.length]
      : NO_DATA_COLOR

    return {
      name: feature.properties.name,
      adcode,
      hasData,
      itemStyle: {
        areaColor,
        borderColor: hasData ? '#1b4b8a' : NO_DATA_BORDER,
        borderWidth: hasData ? 1.2 : 0.9,
        shadowColor: hasData ? 'rgba(27, 75, 138, 0.22)' : 'transparent',
        shadowBlur: hasData ? 10 : 0,
      },
      label: {
        color: hasData ? '#0f2444' : '#6b778a',
      },
      emphasis: {
        label: {
          color: '#fffaf5',
          fontSize: 13,
          fontWeight: 600,
        },
        itemStyle: {
          areaColor: hasData ? '#b83b2e' : '#9aa8b8',
          borderColor: hasData ? '#7a241c' : '#7a8799',
          borderWidth: 1.4,
          shadowColor: hasData ? 'rgba(184, 59, 46, 0.35)' : 'rgba(107, 119, 138, 0.25)',
          shadowBlur: 16,
        },
      },
    }
  })

  return {
    animationDuration: 600,
    animationEasing: 'cubicOut',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15, 36, 68, 0.92)',
      borderWidth: 0,
      padding: [10, 14],
      textStyle: {
        color: '#f4f7fb',
        fontFamily: '"Noto Serif SC", serif',
        fontSize: 13,
      },
      formatter: (params: unknown) => {
        const p = params as { name?: string; data?: { hasData?: boolean } }
        if (!p.name) return ''
        const hint = p.data?.hasData ? '有特产数据 · 点击进入' : '暂无特产数据 · 点击进入'
        return `${p.name}<br/><span style="opacity:.7">${hint}</span>`
      },
    },
    series: [
      {
        type: 'map',
        map: 'region',
        roam: true,
        scaleLimit: { min: 0.6, max: 12 },
        data,
        selectedMode: false,
        layoutCenter: ['50%', '52%'],
        layoutSize: '92%',
        label: {
          show: true,
          fontSize: 11,
          fontFamily: '"Noto Serif SC", "Songti SC", serif',
          formatter: (params: { name: string }) => {
            const name = params.name
            return name.length > 4 ? `${name.slice(0, 3)}…` : name
          },
        },
        itemStyle: {
          borderColor: '#1b4b8a',
          borderWidth: 1.1,
        },
      },
    ],
  }
}

async function renderMap(adcode: string) {
  if (!chart.value) return

  loading.value = true
  errorMessage.value = ''

  const geo = await loadRegionGeoJSON(adcode)
  if (!geo) {
    loading.value = false
    errorMessage.value = '地图数据加载失败，请稍后重试'
    emit('error', errorMessage.value)
    return
  }

  echarts.registerMap('region', geo as never)
  chart.value.setOption(buildOption(geo), true)

  const childLevel = geo.features[0]?.properties.level || 'region'

  emit('ready', {
    featureCount: geo.features.length,
    childLevel,
  })
  loading.value = false
}

function handleResize() {
  chart.value?.resize()
}

onMounted(() => {
  if (!hostRef.value) return

  chart.value = echarts.init(hostRef.value, undefined, { renderer: 'canvas' })

  chart.value.on('click', (params) => {
    const data = params.data as { adcode?: string; name?: string } | undefined
    const name = data?.name || params.name
    const adcode = data?.adcode
    if (!adcode || !name) return
    emit('regionClick', { adcode, name })
  })

  chart.value.on('mouseover', (params) => {
    emit('regionHover', params.name || '')
  })

  chart.value.on('mouseout', () => {
    emit('regionHover', '')
  })

  window.addEventListener('resize', handleResize)
  void renderMap(props.adcode)
})

watch(
  () => props.adcode,
  (adcode) => {
    void renderMap(adcode)
  },
)

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart.value?.dispose()
  chart.value = null
})
</script>

<template>
  <div class="region-map">
    <div ref="hostRef" class="region-map__canvas" />
    <div v-if="loading" class="region-map__state">
      <div class="region-map__spinner" />
      <p>正在绘制地图…</p>
    </div>
    <div v-else-if="errorMessage" class="region-map__state is-error">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.region-map {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 420px;
}

.region-map__canvas {
  width: 100%;
  height: 100%;
}

.region-map__state {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  gap: 12px;
  background: rgba(244, 247, 251, 0.72);
  color: #0f2444;
  font-family: 'Noto Serif SC', serif;
  letter-spacing: 0.06em;
  pointer-events: none;
}

.region-map__state.is-error {
  color: #b83b2e;
}

.region-map__spinner {
  width: 36px;
  height: 36px;
  margin: 0 auto;
  border: 2px solid rgba(27, 75, 138, 0.2);
  border-top-color: #1b4b8a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
