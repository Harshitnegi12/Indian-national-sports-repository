import type { AthleteRecord } from "@/lib/athlete-data"
import { compareAthletes } from "@/lib/athlete-data"
import { athletesByDistrict, getDistrictMap } from "@/lib/district-map"
import { StateMapInteractive, type DistrictInfo } from "@/components/map/state-map-interactive"

/** District map of one state. Shapes render on the server; hover/tap is handled by a small client wrapper. */
export function StateMap({ regionId, athletes, accent }: { regionId: string; athletes: (AthleteRecord & { birthplace?: string })[]; accent: string }) {
  const map = getDistrictMap(regionId)
  if (!map || !map.districts.length) return null
  const groups = athletesByDistrict(regionId, athletes)
  const max = Math.max(1, ...[...groups.values()].map((list) => list.length))
  const info: DistrictInfo[] = map.districts.map((d) => {
    const list = [...(groups.get(d.name) ?? [])].sort(compareAthletes)
    return { name: d.name, count: list.length, top: list.slice(0, 3).map((a) => ({ name: a.name, sport: a.sport.split("·")[0].trim() })) }
  })
  const byName = new Map(info.map((d) => [d.name, d]))
  const fill = (name: string) => {
    const count = byName.get(name)?.count ?? 0
    if (!count) return "var(--state-map-empty)"
    const strength = 0.35 + 0.65 * (Math.log(count + 1) / Math.log(max + 1))
    return `color-mix(in oklch, ${accent} ${Math.round(strength * 100)}%, var(--state-map-empty))`
  }
  const mapped = info.reduce((sum, d) => sum + d.count, 0)

  return (
    <StateMapInteractive districts={info} mapped={mapped} total={athletes.length}>
      <svg viewBox={map.viewBox} className="state-map h-auto max-h-[560px] w-full" role="group" aria-label="District map">
        {map.districts.map((d, index) => (
          <path
            key={d.name + index}
            d={d.path}
            data-district={d.name}
            style={{ fill: fill(d.name), ["--i" as string]: index }}
            tabIndex={0}
            role="button"
            aria-label={`${d.name}: ${byName.get(d.name)?.count ?? 0} athletes`}
          />
        ))}
      </svg>
    </StateMapInteractive>
  )
}
