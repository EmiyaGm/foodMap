export interface DistrictSpecialty {
  adcode: string
  name: string
  /** 地理标志 / 特产 */
  geoIndications: string[]
  /** 美食 */
  foods: string[]
  /** 其他特色产品 */
  otherProducts: string[]
}
