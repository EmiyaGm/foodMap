export interface RegionNode {
  adcode: string
  name: string
}

export interface GeoFeatureProperties {
  adcode: number | string
  name: string
  level?: string
  parent?: { adcode: number | string }
  childrenNum?: number
}

export interface GeoFeature {
  type: string
  properties: GeoFeatureProperties
  geometry: unknown
}

export interface GeoJSON {
  type: string
  features: GeoFeature[]
}

export type MapLevel = 'country' | 'province' | 'city' | 'district'
