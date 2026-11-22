import videos from "@/lib/data/athlete-videos.json"

// Curated YouTube videos from official channels (Olympics, Paralympic Games, federations, broadcasters).
// Built by scripts/find-athlete-videos.js, which only keeps videos whose uploader (checked via
// YouTube's public oEmbed endpoint) is on an allow-list of official channels.

export interface AthleteVideo {
  id: string
  title: string
  channel: string
}

const VIDEOS = videos as Record<string, AthleteVideo[]>

export function getAthleteVideos(athleteId: string): AthleteVideo[] {
  return VIDEOS[athleteId] ?? []
}
