import type { DistrictSpecialty } from '@/types/specialty'

/** 南京市各区特产美食与特色产品（adcode 对齐 DataV 区划） */
export const NANJING_DISTRICT_SPECIALTIES: Record<string, DistrictSpecialty> = {
  '320118': {
    adcode: '320118',
    name: '高淳区',
    geoIndications: ['固城湖螃蟹', '高淳陶瓷', '羽毛扇', '咸鸭蛋'],
    foods: ['老街豆腐干', '鸭脚包', '冬瓜萝卜干（非遗）', '五米香肠', '熏香豆腐乳'],
    otherProducts: ['口罩'],
  },
  '320117': {
    adcode: '320117',
    name: '溧水区',
    geoIndications: ['草莓', '白马黑莓'],
    foods: ['红蓝玉带糕', '手撕风鱼', '豆腐干', '皮蛋', '咸鸭蛋'],
    otherProducts: ['草莓花素', '黑莓果干', '黑莓果汁'],
  },
  '320115': {
    adcode: '320115',
    name: '江宁区',
    geoIndications: ['南京云锦（国家地理标志）', '横溪西瓜'],
    foods: ['板鸭', '翠冠梨'],
    otherProducts: ['鸽子', '乳鸽', '鸽子蛋', '鸽子制品', '小家电'],
  },
  '320111': {
    adcode: '320111',
    name: '浦口区',
    geoIndications: ['永宁青虾'],
    foods: ['麒麟茶干', '麒麟汤包', '桥林盐水鸭'],
    otherProducts: ['纳米材料'],
  },
  '320116': {
    adcode: '320116',
    name: '六合区',
    geoIndications: ['龙池鲫鱼'],
    foods: ['六合猪头肉', '六合盆牛脯', '活珠子（旺鸡蛋）', '瓜埠赖月饼', '南京锅贴'],
    otherProducts: [],
  },
  '320114': {
    adcode: '320114',
    name: '雨花台区',
    geoIndications: ['雨花石', '雨花茶'],
    foods: ['南京小笼包'],
    otherProducts: ['保温杯', '焖烧罐'],
  },
  '320113': {
    adcode: '320113',
    name: '栖霞区',
    geoIndications: ['八卦洲芦蒿', '新一号莲藕'],
    foods: [],
    otherProducts: ['金箔', '食品级金箔', '金箔酒'],
  },
  '320105': {
    adcode: '320105',
    name: '建邺区',
    geoIndications: [],
    foods: ['皮肚面', '红烧龙虾'],
    otherProducts: [],
  },
  '320104': {
    adcode: '320104',
    name: '秦淮区',
    geoIndications: ['盐水鸭'],
    foods: ['鸭血粉丝', '梅花糕', '臭豆腐', '泰式饼', '盐水鸭', '板鸭'],
    otherProducts: [],
  },
  '320102': {
    adcode: '320102',
    name: '玄武区',
    geoIndications: [],
    foods: ['陈皮糖（俗称「老鼠屎」糖）'],
    otherProducts: [],
  },
  '320106': {
    adcode: '320106',
    name: '鼓楼区',
    geoIndications: [],
    foods: ['牛肉锅贴', '凤尾虾', '赤豆元宵', '藕状元豆'],
    otherProducts: [],
  },
}
