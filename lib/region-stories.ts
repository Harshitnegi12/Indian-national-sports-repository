export interface RegionStory {
  tagline: string
  introduction: string
  motif: "fields" | "phulkari" | "mountains" | "desert" | "regional"
  links: { label: string; url: string }[]
}

const STORIES: Record<string, RegionStory> = {
  haryana: {
    tagline: "Mitti se medal tak",
    introduction: "Haryana Tourism describes the state through its agricultural life, local food, folk stories and craft traditions. This page brings that regional context together with source-linked sporting journeys; it does not present one community as the identity of every resident.",
    motif: "fields",
    links: [
      { label: "Haryana Tourism: culture, food and crafts", url: "https://haryanatourism.gov.in/about-us/" },
      { label: "Haryana Tourism: fairs and festivals", url: "https://haryanatourism.gov.in/fair-and-festivals/" },
    ],
  },
  punjab: {
    tagline: "Virasat di dhadkan, khedan da jazba",
    introduction: "Punjab's public culture includes Punjabi poetry, seasonal festivals and folk forms such as bhangra, jhumar, sammi and giddha. The page reflects this varied heritage through a phulkari-inspired pattern, while keeping sport records and community identities distinct.",
    motif: "phulkari",
    links: [
      { label: "Government of Punjab: culture", url: "https://punjab.gov.in/culture" },
      { label: "Incredible India: phulkari craft", url: "https://www.incredibleindia.gov.in/en/punjab/phulkari" },
    ],
  },
  rajasthan: {
    tagline: "Virsa, veerta aur khel ka hausla",
    introduction: "Rajasthan's public heritage includes historic forts, desert landscapes, crafts and living folk traditions. Its history includes Rajput kingdoms, among many communities and periods that shaped the region; the page uses forts-and-dunes artwork as a heritage cue, not as a description of every resident.",
    motif: "desert",
    links: [
      { label: "Rajasthan Tourism: destinations and heritage", url: "https://www.tourism.rajasthan.gov.in/" },
      { label: "Rajasthan Tourism: culture", url: "https://www.tourism.rajasthan.gov.in/about-rajasthan.html" },
    ],
  },  uttarakhand: {
    tagline: "Pahadon ki raah, hausle ki udaan",
    introduction: "Uttarakhand's landscape spans Himalayan valleys and high-altitude routes. The state tourism portal places Kedarnath in the Garhwal Himalayas and documents the Char Dham circuit; the mountain artwork here is a regional visual cue, not a claim about every resident's life.",
    motif: "mountains",
    links: [
      { label: "Uttarakhand Tourism: Kedarnath", url: "https://www.uttarakhandtourism.gov.in/explore/kedarnath" },
      { label: "Uttarakhand Tourism: Char Dham", url: "https://uttarakhandtourism.gov.in/experiences/char-dham" },
      { label: "Uttarakhand Tourism: voices and culture", url: "https://www.uttarakhandtourism.gov.in/page/voices-and-culture" },
    ],
  },
}

export function getRegionStory(regionId: string): RegionStory {
  return STORIES[regionId] ?? {
    tagline: regionId.split("-").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ") + ": local stories, sporting journeys",
    introduction: "Explore this region's public athlete records, sports, and verified links. Local cultural details and media will be added when a reliable regional source is available.",
    motif: "regional",
    links: [],
  }
}
