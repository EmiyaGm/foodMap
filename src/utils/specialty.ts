import { CHUZHOU_DISTRICT_SPECIALTIES } from '@/data/chuzhou/districts'
import { FOSHAN_DISTRICT_SPECIALTIES } from '@/data/foshan/districts'
import { MAANSHAN_DISTRICT_SPECIALTIES } from '@/data/maanshan/districts'
import { NANJING_DISTRICT_SPECIALTIES } from '@/data/nanjing/districts'
import { WUHU_DISTRICT_SPECIALTIES } from '@/data/wuhu/districts'
import { XUANCHENG_DISTRICT_SPECIALTIES } from '@/data/xuancheng/districts'
import { YANGZHOU_DISTRICT_SPECIALTIES } from '@/data/yangzhou/districts'
import type { DistrictSpecialty } from '@/types/specialty'

const DISTRICT_SPECIALTIES: Record<string, DistrictSpecialty> = {
  ...NANJING_DISTRICT_SPECIALTIES,
  ...FOSHAN_DISTRICT_SPECIALTIES,
  ...YANGZHOU_DISTRICT_SPECIALTIES,
  ...WUHU_DISTRICT_SPECIALTIES,
  ...MAANSHAN_DISTRICT_SPECIALTIES,
  ...CHUZHOU_DISTRICT_SPECIALTIES,
  ...XUANCHENG_DISTRICT_SPECIALTIES,
}

/** 区县及其所属市、省，凡下级有特产数据即计入 */
const REGIONS_WITH_DATA = new Set<string>()
for (const adcode of Object.keys(DISTRICT_SPECIALTIES)) {
  REGIONS_WITH_DATA.add(adcode)
  REGIONS_WITH_DATA.add(`${adcode.slice(0, 4)}00`)
  REGIONS_WITH_DATA.add(`${adcode.slice(0, 2)}0000`)
}

export function getSpecialtyByAdcode(adcode: string): DistrictSpecialty | null {
  return DISTRICT_SPECIALTIES[adcode] ?? null
}

/** 当前行政区或其下级是否有特产数据 */
export function hasSpecialtyData(adcode: string): boolean {
  return REGIONS_WITH_DATA.has(adcode)
}
