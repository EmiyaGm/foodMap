import type { DistrictSpecialty } from '@/types/specialty'

/** 佛山市各区特产美食与特色产品（adcode 对齐 DataV 区划） */
export const FOSHAN_DISTRICT_SPECIALTIES: Record<string, DistrictSpecialty> = {
  '440604': {
    adcode: '440604',
    name: '禅城区',
    geoIndications: ['保济丸', '佛山木雕', '石湾陶瓷', '佛山彩灯'],
    foods: ['柱侯鸡', '石湾鱼脯', '炸鱼皮', '九层糕', '烧鹅', '砂锅鱼'],
    otherProducts: ['南风古灶', '陶瓷', '童装', '服装', '岭南天地', '祖庙'],
  },
  '440605': {
    adcode: '440605',
    name: '南海区',
    geoIndications: ['翡翠（平洲）', '醒狮文化'],
    foods: ['西樵大饼', '盲公饼'],
    otherProducts: [
      '翡翠手镯全国第一',
      '内衣',
      '卫生巾',
      '纸尿裤',
      '手机壳',
      '汽车车衣',
      '铝材',
      '汽车制造',
    ],
  },
  '440606': {
    adcode: '440606',
    name: '顺德区',
    geoIndications: ['顺德美食', '陈村花卉'],
    foods: [
      '双皮奶',
      '伦教糕',
      '均安蒸猪',
      '桑拿鸡',
      '桑拿鱼',
      '陈村粉',
      '鱼生',
      '烧鹅',
      '粥底火锅',
      '鸡仔饼',
    ],
    otherProducts: ['家电（美的、格兰仕、小熊等）', '家具', '小家电', '花卉'],
  },
  '440607': {
    adcode: '440607',
    name: '三水区',
    geoIndications: ['黑皮冬瓜', '乐平雪梨瓜', '健力宝'],
    foods: ['乐平大包', '臭屁醋'],
    otherProducts: ['PC耐力板', '岗亭', '公厕', '日化用品'],
  },
  '440608': {
    adcode: '440608',
    name: '高明区',
    geoIndications: ['河鲜', '水粉蛤'],
    foods: ['高明濑粉', '吊烧鸡', '水粉蛤', '沙琪玛（大西装/罗星记）'],
    otherProducts: ['床垫', '家居', '遮阳伞', '雨棚', '海天酱油总部'],
  },
}
