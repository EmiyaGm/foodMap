import type { GeoJSON, MapLevel, RegionNode } from '@/types/region'

/** 同源静态边界，避免阿里云 DataV Referer ACL 在 Vercel 上 403 */
const GEO_BASE = '/geo'
const cache = new Map<string, GeoJSON>()

export const ROOT_REGION: RegionNode = {
  adcode: '100000',
  name: '全国',
}

export function normalizeAdcode(adcode: number | string): string {
  return String(adcode)
}

export function getMapLevel(adcode: string): MapLevel {
  if (adcode === '100000') return 'country'
  if (/^\d{2}0000$/.test(adcode)) return 'province'
  if (/^\d{4}00$/.test(adcode)) return 'city'
  return 'district'
}

async function fetchGeoJSON(url: string): Promise<GeoJSON | null> {
  if (cache.has(url)) return cache.get(url)!

  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const data = (await res.json()) as GeoJSON
    if (!data?.features?.length) return null
    cache.set(url, data)
    return data
  } catch {
    return null
  }
}

/** 加载含下级行政区的完整边界；若无下级则退回自身边界 */
export async function loadRegionGeoJSON(adcode: string): Promise<GeoJSON | null> {
  const full = await fetchGeoJSON(`${GEO_BASE}/${adcode}_full.json`)
  if (full) return full
  return fetchGeoJSON(`${GEO_BASE}/${adcode}.json`)
}

/** 是否还能继续下钻到下一级 */
export async function canDrillDown(adcode: string): Promise<boolean> {
  const level = getMapLevel(adcode)
  if (level === 'district') return false

  const full = await fetchGeoJSON(`${GEO_BASE}/${adcode}_full.json`)
  if (!full) return false

  // 有下级且下级不是「仅自身」时才下钻
  if (full.features.length === 1) {
    const only = normalizeAdcode(full.features[0].properties.adcode)
    return only !== adcode
  }
  return full.features.length > 0
}
