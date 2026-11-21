import { MAP_MARKERS, MAP_SHAPES, MAP_VIEWBOX } from "@/lib/india-map"
import { IndiaMapInteractive, type MapRegionInfo } from "@/components/map/india-map-interactive"

/**
 * Choropleth map of India. The SVG paths are rendered on the server (so the shape data never
 * ships as JavaScript); a small client wrapper adds hover, tap and keyboard.
 */
export function IndiaMap({ regions }: { regions: MapRegionInfo[] }) {
  const byId = new Map(regions.map((region) => [region.id, region]))
  const max = Math.max(1, ...regions.map((region) => region.count))
  const fill = (id: string) => {
    const count = byId.get(id)?.count ?? 0
    if (!count) return "var(--map-empty)"
    const strength = Math.log(count + 1) / Math.log(max + 1)
    return `color-mix(in oklch, var(--map-high) ${Math.round(strength * 100)}%, var(--map-low))`
  }

  return (
    <IndiaMapInteractive regions={regions}>
      <svg viewBox={MAP_VIEWBOX} className="india-map h-auto w-full" role="group" aria-label="Map of India. Choose a state or union territory.">
        {MAP_SHAPES.map((shape, index) => {
          const info = byId.get(shape.regionId)
          return (
            <path
              key={shape.regionId}
              d={shape.path}
              data-region={shape.regionId}
              style={{ fill: fill(shape.regionId), ["--i" as string]: index }}
              tabIndex={0}
              role="link"
              aria-label={info ? `${info.name}, ${info.count} athletes` : shape.regionId}
            />
          )
        })}
        {MAP_MARKERS.map((marker) => (
          <circle key={marker.regionId} cx={marker.x} cy={marker.y} r={4.5} data-region={marker.regionId} className="map-marker" style={{ fill: fill(marker.regionId) }} aria-hidden="true" />
        ))}
      </svg>
    </IndiaMapInteractive>
  )
}
