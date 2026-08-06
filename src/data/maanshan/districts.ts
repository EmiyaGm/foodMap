import type { DistrictSpecialty } from '@/types/specialty'

/** 马鞍山市各区特产美食与特色产品（adcode 对齐 DataV 区划） */
export const MAANSHAN_DISTRICT_SPECIALTIES: Record<string, DistrictSpecialty> = {
  '340521': {
    adcode: '340521',
    name: '当涂县',
    geoIndications: ['石臼湖螃蟹', '黄池酱菜', '金菜地茶干'],
    foods: ['肥肠米线', '红烧大肠', '当涂大肉面（205 大肉面）'],
    otherProducts: ['虾酱', '瘦肉酱', '汽车配件', '空调压缩机'],
  },
  '340522': {
    adcode: '340522',
    name: '含山县',
    geoIndications: [
      '含山大米',
      '含山绿茶',
      '含梅绿茶',
      '含山花籽',
      '太湖山鹿茸',
      '含山小兰花',
      '含山红菱角',
      '仙踪虎山黄桃',
    ],
    foods: ['仙踪狗肉', '采石矶茶干', '贝贝南瓜'],
    otherProducts: ['陶瓷', '星威啤酒'],
  },
  '340523': {
    adcode: '340523',
    name: '和县',
    geoIndications: [
      '一品玉带糕',
      '和县辣椒',
      '鸡笼山辣椒酱',
      '和县黄金瓜',
      '和县皮蛋',
      '巢湖白米虾',
      '新桥茶干',
    ],
    foods: ['和县炸牛肉（非遗）'],
    otherProducts: ['乌江霸王酥', '玻璃钢 / 复合材料', 'PVC 地板'],
  },
  '340506': {
    adcode: '340506',
    name: '博望区',
    geoIndications: [],
    foods: ['马鞍山口袋鸭', '黄池米酒'],
    otherProducts: ['机床刀具', '绿松石'],
  },
  '340503': {
    adcode: '340503',
    name: '花山区',
    geoIndications: [],
    foods: ['马鞍山口袋鸭', '黄池米酒'],
    otherProducts: ['绿松石', '采石矶'],
  },
  '340504': {
    adcode: '340504',
    name: '雨山区',
    geoIndications: [],
    foods: ['马鞍山口袋鸭', '黄池米酒'],
    otherProducts: ['绿松石', '南山矿 / 矿坑公园'],
  },
}
