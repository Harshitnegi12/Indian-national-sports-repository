import mapData from "@/lib/data/india-map-shapes.json"

// State and UT boundaries from DataMeet's States/Admin2 dataset (CC BY 4.0,
// https://github.com/datameet/maps), which follows India's official map: 28 states and 8 union
// territories, with Jammu and Kashmir and Ladakh shown in full. Simplified for the web by
// scripts/build-india-map.js.

export interface MapShape {
  regionId: string
  path: string
}

export const MAP_VIEWBOX: string = mapData.viewBox
export const MAP_SHAPES: MapShape[] = mapData.shapes

/** Regions too small to hover on the map get a dot marker (map coordinates). */
export const MAP_MARKERS: { regionId: string; x: number; y: number }[] = mapData.markers
