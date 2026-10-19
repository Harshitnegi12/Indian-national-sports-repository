export type RegionMotif =
  | "fields"
  | "phulkari"
  | "mountains"
  | "desert"
  | "coast"
  | "river"
  | "forest"
  | "plateau"
  | "city"
  | "islands"
  | "heritage"
  | "valley"

export interface RegionStory {
  tagline: string
  introduction: string
  motif: RegionMotif
  identityLabel: string
  links: { label: string; url: string }[]
}

const STORIES: Record<string, RegionStory> = {
  "andhra-pradesh": {
    tagline: "Coastal spirit. Sporting ambition.",
    introduction: "A regional sports directory framed by Andhra Pradesh's long Bay of Bengal coastline and river-fed plains. Explore available athlete profiles, sports and source links; records are added only when supporting references are available.",
    motif: "coast", identityLabel: "Coastlines & river plains", links: [],
  },
  "arunachal-pradesh": {
    tagline: "Where the day begins, every journey rises.",
    introduction: "Arunachal Pradesh is known as the Land of the Dawn-Lit Mountains. This mountain-inspired page brings the state's distinctive landscape into the sports directory while keeping athlete details tied to cited records.",
    motif: "mountains", identityLabel: "Dawn-lit mountains", links: [
      { label: "Government of Arunachal Pradesh: about the state", url: "https://www.arunachalpradesh.gov.in/?lang=en" },
    ],
  },
  assam: {
    tagline: "Along the Brahmaputra, new sporting stories flow.",
    introduction: "Assam's page takes its visual cue from the Brahmaputra valley and the landscapes of the Northeast. Browse the athlete profiles currently supported by public records, then follow the linked sources for more context.",
    motif: "river", identityLabel: "Brahmaputra valley", links: [
      { label: "Government of Assam Department of Tourism", url: "https://tourism.assam.gov.in/" },
    ],
  },
  bihar: {
    tagline: "Many roots. One forward-moving sporting story.",
    introduction: "Bihar's page pairs a river-and-heritage visual with a growing sports directory. Athletes and achievements appear only when the project has a source-linked record; explore the official links for regional context.",
    motif: "heritage", identityLabel: "River plains & heritage", links: [
      { label: "Government of Bihar Tourism", url: "https://tourism.bihar.gov.in/" },
    ],
  },
  chhattisgarh: {
    tagline: "From forest trails to the field of play.",
    introduction: "A forest-and-waterfall-inspired setting introduces Chhattisgarh's sports directory. The design reflects the state's varied natural landscapes without assigning a single tradition or identity to all its people.",
    motif: "forest", identityLabel: "Forests & waterfalls", links: [
      { label: "Chhattisgarh Tourism Board", url: "https://tourism.cgstate.gov.in/" },
    ],
  },
  goa: {
    tagline: "A coastal state with a wide-open playing field.",
    introduction: "Goa's page uses a coastal visual palette for its region profile, sports directory and available source-linked athlete records. Cultural notes are kept separate from verified sporting information.",
    motif: "coast", identityLabel: "Coast & open horizons", links: [],
  },
  gujarat: {
    tagline: "A western horizon. A growing roster of achievers.",
    introduction: "Gujarat's profile uses a warm western-coast and salt-desert palette. Explore its sports directory and the athlete profiles currently listed with supporting sources.",
    motif: "desert", identityLabel: "Western coast & salt desert", links: [],
  },
  haryana: {
    tagline: "Mitti se medal tak",
    introduction: "Haryana Tourism describes the state through its agricultural life, local food, folk stories and craft traditions. This page brings that regional context together with source-linked sporting journeys; it does not present one community as the identity of every resident.",
    motif: "fields", identityLabel: "Fields, food & folk traditions", links: [
      { label: "Haryana Tourism: culture, food and crafts", url: "https://haryanatourism.gov.in/about-us/" },
      { label: "Haryana Tourism: fairs and festivals", url: "https://haryanatourism.gov.in/fair-and-festivals/" },
    ],
  },
  "himachal-pradesh": {
    tagline: "Mountain paths. Big-match determination.",
    introduction: "Himachal Pradesh's mountain setting gives this regional sports page its visual identity. The directory brings together available athlete records, sports routes and public-source links without treating the state's many communities as one.",
    motif: "mountains", identityLabel: "Himalayan ranges", links: [],
  },
  jharkhand: {
    tagline: "A strong ground for the next sporting chapter.",
    introduction: "Jharkhand's page draws on a forested plateau palette for its regional profile. Browse the sports directory and source-linked athletes currently listed; any missing profiles are a collection gap, not a claim about local participation.",
    motif: "forest", identityLabel: "Plateau & forest landscapes", links: [],
  },
  karnataka: {
    tagline: "Many landscapes. Many ways to play.",
    introduction: "Karnataka's sports page reflects the state's range of landscapes, from the Deccan plateau to the western coast. Browse by sport and open the available athlete records with their supporting links.",
    motif: "plateau", identityLabel: "Deccan plateau & western coast", links: [
      { label: "Karnataka Tourism", url: "https://karnatakatourism.org/en/" },
    ],
  },
  kerala: {
    tagline: "Along the backwaters, beyond the boundary.",
    introduction: "Kerala's page takes a calm coastal-and-backwater palette into its sports directory. Athlete profiles are shown only where the repository has supporting public records.",
    motif: "coast", identityLabel: "Coast & backwaters", links: [],
  },
  "madhya-pradesh": {
    tagline: "At India's heart, every pursuit has room to grow.",
    introduction: "Madhya Pradesh's central-plateau palette sets the scene for this region's athlete profiles and sports routes. The directory separates available records from areas where source collection is still under way.",
    motif: "plateau", identityLabel: "Central plateau & forests", links: [],
  },
  maharashtra: {
    tagline: "A vast stage for sporting journeys.",
    introduction: "Maharashtra's page brings together a western-coast and Deccan-inspired visual with its sports directory. Follow each listed athlete's profile to view the sources behind their sporting highlights.",
    motif: "city", identityLabel: "Coast, plateau & cities", links: [
      { label: "Government of Maharashtra Tourism", url: "https://maharashtratourism.gov.in/" },
    ],
  },
  manipur: {
    tagline: "A valley of sport, skill and determination.",
    introduction: "Manipur's valley-and-hills visual sets a regional context for its sports listings. Athlete achievements shown here stay connected to the public records cited on each individual profile.",
    motif: "valley", identityLabel: "Valley & surrounding hills", links: [],
  },
  meghalaya: {
    tagline: "Cloud-country landscapes. Grounded sporting stories.",
    introduction: "Meghalaya's hills and cloud-filled skies inspire this page's colour and artwork. Browse its sports routes and any source-linked athlete records currently available.",
    motif: "mountains", identityLabel: "Hills & living root country", links: [],
  },
  mizoram: {
    tagline: "Across the ridgelines, towards new goals.",
    introduction: "Mizoram's ridge-and-forest landscape informs this regional sports page. The design is a visual introduction; athlete achievements and affiliations are presented separately with their sources.",
    motif: "mountains", identityLabel: "Ridges & green hills", links: [],
  },
  nagaland: {
    tagline: "A spirited region. A sporting story still growing.",
    introduction: "Nagaland's page uses a hill-country palette for its sports and regional sections. It welcomes the state's many identities while keeping player details anchored to specific, cited records.",
    motif: "mountains", identityLabel: "Naga hills", links: [
      { label: "Nagaland State Portal", url: "https://www.nagaland.gov.in/" },
    ],
  },
  odisha: {
    tagline: "From the Bay of Bengal to the Eastern Ghats.",
    introduction: "Odisha's coast, river deltas and Eastern Ghats inform this page's visual identity. Explore the sports directory and currently listed athlete records alongside the state's official tourism resources.",
    motif: "coast", identityLabel: "Coast, wetlands & Eastern Ghats", links: [
      { label: "Odisha Tourism: state overview", url: "https://odishatourism.gov.in/en/odisha-at-a-glance" },
      { label: "Odisha Tourism: destinations", url: "https://odishatourism.gov.in/en/iconic-odisha" },
    ],
  },
  punjab: {
    tagline: "Virasat di dhadkan, khedan da jazba",
    introduction: "Punjab's public culture includes Punjabi poetry, seasonal festivals and folk forms such as bhangra, jhumar, sammi and giddha. The page reflects this varied heritage through a phulkari-inspired pattern, while keeping sport records and community identities distinct.",
    motif: "phulkari", identityLabel: "Folk forms & phulkari craft", links: [
      { label: "Government of Punjab: culture", url: "https://punjab.gov.in/culture" },
      { label: "Incredible India: phulkari craft", url: "https://www.incredibleindia.gov.in/en/punjab/phulkari" },
    ],
  },
  rajasthan: {
    tagline: "Virsa, veerta aur khel ka hausla",
    introduction: "Rajasthan's public heritage includes historic forts, desert landscapes, crafts and living folk traditions. Its history includes Rajput kingdoms, among many communities and periods that shaped the region; the page uses forts-and-dunes artwork as a heritage cue, not as a description of every resident.",
    motif: "desert", identityLabel: "Desert landscapes, forts & living heritage", links: [
      { label: "Rajasthan Tourism: destinations and heritage", url: "https://www.tourism.rajasthan.gov.in/" },
      { label: "Rajasthan Tourism: culture", url: "https://www.tourism.rajasthan.gov.in/about-rajasthan.html" },
    ],
  },
  sikkim: {
    tagline: "Where mountain air meets sporting ambition.",
    introduction: "Set in the Eastern Himalayas, Sikkim's mountain and lake landscapes inform this regional profile. Explore the sports directory and available source-linked athletes, with regional context from the state tourism department.",
    motif: "mountains", identityLabel: "Eastern Himalaya & alpine lakes", links: [
      { label: "Sikkim Tourism: about the state", url: "https://www.sikkimtourism.gov.in/about/sikkim" },
    ],
  },
  "tamil-nadu": {
    tagline: "A deep sporting heritage, always in motion.",
    introduction: "Tamil Nadu's page pairs a coastal palette with a regional profile shaped by a long history of sport, arts and public life. Athlete records and achievements are kept linked to their individual supporting sources.",
    motif: "heritage", identityLabel: "Coastal heritage & living arts", links: [],
  },
  telangana: {
    tagline: "Deccan roots. A new generation in play.",
    introduction: "Telangana's Deccan-inspired profile brings the region's sports directory and source-linked athlete stories together. Browse by sport to see which verified records are currently available.",
    motif: "plateau", identityLabel: "Deccan plateau & historic cities", links: [],
  },
  tripura: {
    tagline: "A hill-and-valley home for sporting ambition.",
    introduction: "Tripura's hills and lowland valleys inspire the visual treatment for this region page. Player profiles are added only where public references support the athlete and their regional association.",
    motif: "valley", identityLabel: "Hills, valleys & lakes", links: [],
  },
  "uttar-pradesh": {
    tagline: "Across the heartland, sporting stories take shape.",
    introduction: "Uttar Pradesh's page uses a river-and-heritage visual for a region with many cities, languages and local identities. Browse the sport routes and open athlete profiles to see their cited achievements.",
    motif: "river", identityLabel: "River plains & historic cities", links: [],
  },
  uttarakhand: {
    tagline: "Pahadon ki raah, hausle ki udaan",
    introduction: "Uttarakhand's landscape spans Himalayan valleys and high-altitude routes. The state tourism portal places Kedarnath in the Garhwal Himalayas and documents the Char Dham circuit; the mountain artwork here is a regional visual cue, not a claim about every resident's life.",
    motif: "mountains", identityLabel: "Himalayan landscape & heritage", links: [
      { label: "Uttarakhand Tourism: Kedarnath", url: "https://www.uttarakhandtourism.gov.in/explore/kedarnath" },
      { label: "Uttarakhand Tourism: Char Dham", url: "https://uttarakhandtourism.gov.in/experiences/char-dham" },
      { label: "Uttarakhand Tourism: voices and culture", url: "https://www.uttarakhandtourism.gov.in/page/voices-and-culture" },
    ],
  },
  "west-bengal": {
    tagline: "From the delta to the city, every game has a home.",
    introduction: "West Bengal's visual blends river-delta colours with an urban skyline. This page brings its regional sports routes together with athlete records that have public supporting sources.",
    motif: "river", identityLabel: "Ganga delta & cultural cities", links: [],
  },
  "andaman-nicobar": {
    tagline: "Island horizons. A wider world of sport.",
    introduction: "Andaman and Nicobar Islands' tropical waters and island landscapes inspire this territory page. Explore its sports directory and available athlete records; local details are added only when sources can support them.",
    motif: "islands", identityLabel: "Island chains & marine landscapes", links: [
      { label: "Andaman & Nicobar Islands Tourism", url: "https://tourism.andamannicobar.gov.in/" },
    ],
  },
  chandigarh: {
    tagline: "A planned city with room for every game.",
    introduction: "Chandigarh's modern urban layout and green spaces shape this Union Territory profile. Browse the sports directory and available source-linked athlete records.",
    motif: "city", identityLabel: "Planned city & green spaces", links: [
      { label: "Chandigarh Tourism", url: "https://chandigarhtourism.gov.in/" },
    ],
  },
  "dadra-nagar-haveli-daman-diu": {
    tagline: "Two coasts, a forested interior, many sporting paths.",
    introduction: "This Union Territory brings together distinct coastal enclaves and a forested inland landscape. Its page keeps that geographic variety visible while presenting verified athlete records separately.",
    motif: "coast", identityLabel: "Coastlines & forested interior", links: [
      { label: "Dadra & Nagar Haveli and Daman & Diu: tourism portal listing", url: "https://www.india.gov.in/category/travel-tourism/subcategory/tourism-in-india/details/website-of-dadra-nagar-haveli-and-daman-diu-tourism" },
    ],
  },
  "delhi-nct": {
    tagline: "A capital region where every lane has a playing field.",
    introduction: "Delhi's page uses a layered cityscape to reflect the National Capital Territory's urban character and long public history. Sports and athlete details remain grounded in linked records rather than assumed from the region alone.",
    motif: "city", identityLabel: "Capital city & living heritage", links: [
      { label: "Delhi Tourism: official portal", url: "https://delhitourism.gov.in/" },
    ],
  },
  "jammu-kashmir": {
    tagline: "Valleys and mountain horizons. A sporting spirit that travels.",
    introduction: "Jammu and Kashmir's page draws on its mountain and valley landscapes. It is a regional directory, with athlete biographies and sporting achievements shown only where supporting sources are listed.",
    motif: "valley", identityLabel: "Mountain valleys & lakes", links: [],
  },
  ladakh: {
    tagline: "High-altitude horizons. Boundless determination.",
    introduction: "Ladakh's high-altitude landscape gives this Union Territory page its open, high-desert visual. Browse its sports routes and listed athlete records; the design is editorial context, not a claim about every resident.",
    motif: "desert", identityLabel: "High desert & mountain ranges", links: [],
  },
  lakshadweep: {
    tagline: "Small islands. Open-water horizons.",
    introduction: "Lakshadweep's coral-island and lagoon setting shapes this territory page. Explore the sports directory and any source-linked profiles currently available.",
    motif: "islands", identityLabel: "Coral islands & lagoons", links: [],
  },
  puducherry: {
    tagline: "A coastal townscape with a sporting pulse.",
    introduction: "Puducherry's coastal and historic-town character informs this page's visual identity. Browse the sport routes and currently listed public athlete records.",
    motif: "coast", identityLabel: "Coastal heritage & town life", links: [],
  },
}

export function getRegionStory(regionId: string): RegionStory {
  return STORIES[regionId] ?? {
    tagline: "Local stories. Sporting journeys.",
    introduction: "Explore this region's public athlete records, sports, and verified links. Local cultural details and media will be added when a reliable regional source is available.",
    motif: "plateau",
    identityLabel: "Regional landscapes & sporting life",
    links: [],
  }
}
