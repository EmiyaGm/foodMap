import type { DistrictSpecialty } from '@/types/specialty'

/** 芜湖市各区特产美食与特色产品（adcode 对齐 DataV 区划） */
export const WUHU_DISTRICT_SPECIALTIES: Record<string, DistrictSpecialty> = {
  '340281': {
    adcode: '340281',
    name: '无为市',
    geoIndications: [
      '无为螃蟹',
      '无为草鱼',
      '无为淡水珍珠',
      '严桥花生米',
      '荸荠（鹤毛镇）',
    ],
    foods: ['无为板鸭（非遗）', '无为灶王粑粑', '无为臭干子', '炒米糖'],
    otherProducts: ['雨衣', '纱布袋 / 帆布袋', '羽毛球'],
  },
  '340223': {
    adcode: '340223',
    name: '南陵县',
    geoIndications: ['丫山丹皮', '奎湖鳙鱼'],
    foods: [
      '丫山芋汤',
      '金山老鸭汤',
      '漂鱼',
      '南陵桂花糖',
      '南陵臭干子',
      '百章贡酥',
    ],
    otherProducts: ['佛香 / 熏香 / 檀香', '快递配套机械设备'],
  },
  '340211': {
    adcode: '340211',
    name: '繁昌区',
    geoIndications: ['芜湖刀鱼'],
    foods: ['茶干'],
    otherProducts: ['海螺水泥'],
  },
  '340209': {
    adcode: '340209',
    name: '弋江区',
    geoIndications: ['红皮鸭'],
    foods: ['耿福兴虾子面', '出炉烧饼', '渣肉蒸饭', '蟹黄包', '弋江羊肉'],
    otherProducts: ['傻子瓜子', '三只松鼠'],
  },
  '340210': {
    adcode: '340210',
    name: '湾沚区',
    geoIndications: [],
    foods: ['耿福兴虾子面', '渣肉蒸饭', '蟹黄包'],
    otherProducts: ['茶叶包装', '羽毛球'],
  },
  '340207': {
    adcode: '340207',
    name: '鸠江区',
    geoIndications: ['红皮鸭'],
    foods: ['耿福兴虾子面', '渣肉蒸饭', '蟹黄包', '弋江羊肉'],
    otherProducts: ['傻子瓜子', '三只松鼠', '方特主题乐园'],
  },
  '340202': {
    adcode: '340202',
    name: '镜湖区',
    geoIndications: [],
    foods: ['耿福兴虾子面', '出炉烧饼', '渣肉蒸饭', '蟹黄包'],
    otherProducts: ['傻子瓜子', '三只松鼠', '松鼠小镇'],
  },
}
