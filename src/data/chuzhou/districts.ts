import type { DistrictSpecialty } from '@/types/specialty'

/** 滁州市各区特产美食与特色产品（adcode 对齐 DataV 区划） */
export const CHUZHOU_DISTRICT_SPECIALTIES: Record<string, DistrictSpecialty> = {
  '341126': {
    adcode: '341126',
    name: '凤阳县',
    geoIndications: ['凤阳贡米', '凤阳花生', '凤阳藤茶', '韭山藤茶', '凤阳御膳芝麻油'],
    foods: ['凤阳酿豆腐', '恒玉酱菜', '咸水鸭'],
    otherProducts: ['明太祖酒', '玻璃制品', '塑料 / 玻璃包装瓶'],
  },
  '341125': {
    adcode: '341125',
    name: '定远县',
    geoIndications: ['瓜蒌子', '芡实'],
    foods: ['定远老鹅', '定远三香肉', '定远俏尾子', '定远狮子头', '血糕片'],
    otherProducts: ['电缆线'],
  },
  '341124': {
    adcode: '341124',
    name: '全椒县',
    geoIndications: [],
    foods: [
      '马厂出护牌（非遗）',
      '小马厂羊肉面',
      '古河狮子头',
      '管坝牛肉',
      '糯米炒米糖',
      '板面',
      '辣椒酱',
    ],
    otherProducts: ['网红零食代工', '全柴发动机'],
  },
  '341122': {
    adcode: '341122',
    name: '来安县',
    geoIndications: ['来安花红', '来安三蒜', '半塔芝麻油', '碧玉春酒'],
    foods: ['来安春卷', '雷官板鸭', '十二段大肉面'],
    otherProducts: ['食品添加剂 / 香料化工'],
  },
  '341182': {
    adcode: '341182',
    name: '明光市',
    geoIndications: ['明光绿豆', '明光甜叶菊', '女山湖大闸蟹', '瓜蒌籽', '葫芦籽'],
    foods: ['油炸麻雀'],
    otherProducts: ['老明光大包干酒', '明光特曲', '老明光绿豆酒'],
  },
  '341181': {
    adcode: '341181',
    name: '天长市',
    geoIndications: ['龙岗芡实（鸡头米）', '铜城镇大西瓜', '铜城镇大瓜子'],
    foods: ['天长甘露饼', '金集松花皮蛋', '秦栏卤鹅', '秦栏大鹅'],
    otherProducts: ['颜料', '电动车充电器', '光纤光缆'],
  },
  '341103': {
    adcode: '341103',
    name: '南谯区',
    geoIndications: ['滁州贡菊', '竹编'],
    foods: ['滁州酥糖', '燕尘小花生', '滁州九斤黄鸡'],
    otherProducts: ['墙纸 / 壁纸', '醉翁亭'],
  },
  '341102': {
    adcode: '341102',
    name: '琅琊区',
    geoIndications: ['滁州贡菊'],
    foods: ['滁州酥糖', '燕尘小花生', '滁州九斤黄鸡'],
    otherProducts: ['墙纸 / 壁纸'],
  },
}
