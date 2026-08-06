import type { DistrictSpecialty } from '@/types/specialty'

/** 宣城市各区特产美食与特色产品（adcode 对齐 DataV 区划） */
export const XUANCHENG_DISTRICT_SPECIALTIES: Record<string, DistrictSpecialty> = {
  '341824': {
    adcode: '341824',
    name: '绩溪县',
    geoIndications: ['金山时雨茶', '绩溪黑猪', '绩溪火腿'],
    foods: ['绩溪一品锅（徽州一品锅）', '臭鳜鱼', '绩溪挞粿', '绩溪菜糕', '糖裹核桃仁'],
    otherProducts: ['徽墨（胡开文）'],
  },
  '341823': {
    adcode: '341823',
    name: '泾县',
    geoIndications: [
      '宣纸',
      '宣笔',
      '涌溪火青',
      '兰花茶',
      '宣州板栗',
      '泾县酱菜',
      '泾县咸鱼干',
    ],
    foods: ['辣子锅巴'],
    otherProducts: ['红纸 / 对联纸', '蜡笺纸'],
  },
  '341825': {
    adcode: '341825',
    name: '旌德县',
    geoIndications: ['桥亭小嘴花生', '旌德梅花鳖', '云乐猕猴桃', '葛根'],
    foods: ['旌德大饼'],
    otherProducts: ['安全帽'],
  },
  '341882': {
    adcode: '341882',
    name: '广德市',
    geoIndications: ['广德黄金芽', '五合茶叶', '广德毛腿鸡'],
    foods: ['梅干菜黄豆', '霉千张卷'],
    otherProducts: ['竹木家具', '竹扇', '地板'],
  },
  '341881': {
    adcode: '341881',
    name: '宁国市',
    geoIndications: [
      '宁国山核桃',
      '宁国牡丹',
      '宣城铁皮石斛',
      '宁国雪梨',
      '宁国板栗',
      '宁国紫砂陶器',
    ],
    foods: ['宁国粑粑', '黄山臭鳜鱼'],
    otherProducts: ['绝缘防火材料', '绝缘套管'],
  },
  '341821': {
    adcode: '341821',
    name: '郎溪县',
    geoIndications: ['南方黄酒', '郎溪雁鹅'],
    foods: ['姚村闷酱'],
    otherProducts: ['气泡袋', '塑料制品', '不锈钢紧固件'],
  },
  '341802': {
    adcode: '341802',
    name: '宣州区',
    geoIndications: ['宣木瓜油', '宣酒', '敬亭绿雪茶', '宣城金丝琥珀蜜枣'],
    foods: ['徽州饼'],
    otherProducts: ['陶瓷卫浴 / 浴缸', '密封橡胶圈', '宠物牵引绳'],
  },
}
