import { INDIA_REGIONS } from "@/lib/india-sports-data"

export interface AthleteSource {
  label: string
  url: string
}

export interface AthleteRecord {
  id: string
  name: string
  regionId: string
  sport: string
  summary: string
  highlights: string[]
  sources: AthleteSource[]
}

export const ATHLETES: AthleteRecord[] = [
  {
    id: "neeraj-chopra", name: "Neeraj Chopra", regionId: "haryana",
    sport: "Athletics · Javelin throw",
    summary: "Indian javelin thrower. The Indian Olympic Association describes his journey as beginning in Haryana.",
    highlights: ["Tokyo 2020 Olympic gold in men's javelin throw.", "Paris 2024 Olympic silver in men's javelin throw."],
    sources: [
      { label: "IOA athlete directory", url: "https://olympic.ind.in/athlete/" },
      { label: "IOA Tokyo 2020 results and report", url: "https://olympic.ind.in/tokyo-2020/" },
      { label: "IOA Paris 2024 report", url: "https://olympic.ind.in/paris-2024/" },
      { label: "IOA athlete journeys from Haryana", url: "https://olympic.ind.in/news/glasgow-2026-one-flag-many-dreams-different-journeys-one-identity-team-india/" },
    ],
  },
  {
    id: "manu-bhaker", name: "Manu Bhaker", regionId: "haryana",
    sport: "Shooting · Pistol",
    summary: "Indian pistol shooter. The Sports Authority of India's annual report identifies her as an athlete from Haryana.",
    highlights: ["Won bronze in women's 10m air pistol and mixed team 10m air pistol at Paris 2024."],
    sources: [
      { label: "IOA athlete directory", url: "https://olympic.ind.in/athlete/" },
      { label: "IOA Paris 2024 report", url: "https://olympic.ind.in/paris-2024/" },
      { label: "SAI Annual Report 2017–18", url: "https://sportsauthorityofindia.nic.in/sai/public/assets/pdfs/annualreports/Annual-Report2017-18English.pdf" },
    ],
  },
  {
    id: "lovlina-borgohain", name: "Lovlina Borgohain", regionId: "assam",
    sport: "Boxing",
    summary: "Indian boxer. Public SAI and IOA records connect her sporting journey with Assam.",
    highlights: ["Won bronze in women's welterweight boxing at Tokyo 2020."],
    sources: [
      { label: "IOA athlete directory", url: "https://olympic.ind.in/athlete/" },
      { label: "IOA Tokyo 2020 report", url: "https://olympic.ind.in/tokyo-2020/" },
      { label: "SAI press statement referring to her hometown in Assam", url: "https://sportsauthorityofindia.nic.in/sai/assets/news/1633066940_SAI_15th%20Oct.pdf" },
      { label: "IOA athlete journeys from Assam", url: "https://olympic.ind.in/news/glasgow-2026-one-flag-many-dreams-different-journeys-one-identity-team-india/" },
    ],
  },
  {
    id: "mirabai-chanu", name: "Mirabai Chanu", regionId: "manipur",
    sport: "Weightlifting",
    summary: "Indian weightlifter. The IOA describes her sporting journey as beginning in Manipur.",
    highlights: ["Won silver in the women's 49kg event at Tokyo 2020.", "Won silver in the women's 48kg category at the 2025 World Weightlifting Championships."],
    sources: [
      { label: "IOA athlete directory", url: "https://olympic.ind.in/athlete/" },
      { label: "Ministry of Youth Affairs and Sports Annual Report 2021–22", url: "https://www.yas.nic.in/sites/default/files/Annual%20Reprot%20%28English%29%2C%202021-22.pdf" },
      { label: "IOA World Championships 2025 report", url: "https://olympic.ind.in/news/world-weightlifting-championships-2025-mirabai-chanu-strikes-silver-for-first-medal-in-three-years/" },
      { label: "IOA athlete journeys from Manipur", url: "https://olympic.ind.in/news/glasgow-2026-one-flag-many-dreams-different-journeys-one-identity-team-india/" },
    ],
  },
  {
    id: "pv-sindhu", name: "P. V. Sindhu", regionId: "telangana",
    sport: "Badminton · Singles",
    summary: "Indian badminton player, born in Hyderabad, Telangana.",
    highlights: ["Won silver in women's singles at Rio 2016.", "Won bronze in women's singles at Tokyo 2020."],
    sources: [
      { label: "IOA athlete profile", url: "https://olympic.ind.in/athlete/p-v-sindhu/" },
      { label: "IOA biography and Hyderabad birthplace", url: "https://olympic.ind.in/news/top-medal-contenders-pv-sindhu/" },
      { label: "IOA Rio 2016 results", url: "https://olympic.ind.in/international-game/summer-olympics-games-2016/" },
      { label: "IOA Tokyo 2020 report", url: "https://olympic.ind.in/tokyo-2020/" },
    ],
  },
  {
    id: "bhavina-patel", name: "Bhavina Patel", regionId: "gujarat",
    sport: "Para table tennis",
    summary: "Indian para table tennis player. The Ministry of Youth Affairs and Sports' Tokyo Paralympics medal table lists Gujarat as her state.",
    highlights: ["Won silver in women's singles Class 4 at the Tokyo 2020 Paralympic Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — Annual Report 2021–22, Tokyo Paralympics medal table", url: "https://www.yas.nic.in/sites/default/files/Annual%20Reprot%20%28English%29%2C%202021-22.pdf" },
    ],
  },
  {
    id: "nishad-kumar", name: "Nishad Kumar", regionId: "himachal-pradesh",
    sport: "Para athletics · High jump",
    summary: "Indian para high jumper. The Ministry of Youth Affairs and Sports' Tokyo Paralympics medal table lists Himachal Pradesh as his state.",
    highlights: ["Won silver in men's high jump T47 at the Tokyo 2020 Paralympic Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — Annual Report 2021–22, Tokyo Paralympics medal table", url: "https://www.yas.nic.in/sites/default/files/Annual%20Reprot%20%28English%29%2C%202021-22.pdf" },
    ],
  },
  {
    id: "yogesh-kathuniya", name: "Yogesh Kathuniya", regionId: "haryana",
    sport: "Para athletics · Discus throw",
    summary: "Indian para discus thrower. The Ministry of Youth Affairs and Sports' Tokyo Paralympics medal table lists Haryana as his state.",
    highlights: ["Won silver in men's discus throw F56 at the Tokyo 2020 Paralympic Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — Annual Report 2021–22, Tokyo Paralympics medal table", url: "https://www.yas.nic.in/sites/default/files/Annual%20Reprot%20%28English%29%2C%202021-22.pdf" },
    ],
  },
  {
    id: "avani-lekhara", name: "Avani Lekhara", regionId: "rajasthan",
    sport: "Para shooting",
    summary: "Indian para shooter. The Ministry of Youth Affairs and Sports' Tokyo Paralympics medal table lists Rajasthan as her state.",
    highlights: ["Won gold in the women's 10m air rifle standing SH1 and bronze in the women's 50m rifle 3 positions SH1 at the Tokyo 2020 Paralympic Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — Annual Report 2021–22, Tokyo Paralympics medal table", url: "https://www.yas.nic.in/sites/default/files/Annual%20Reprot%20%28English%29%2C%202021-22.pdf" },
    ],
  },
  {
    id: "saina-nehwal", name: "Saina Nehwal", regionId: "haryana",
    sport: "Badminton · Singles",
    summary: "Indian badminton player. The Ministry's 2022-23 annual report lists Haryana as her state.",
    highlights: ["Won bronze in women's singles at London 2012."],
    sources: [
      { label: "Ministry Annual Report 2022-23 (state and discipline listing)", url: "https://yas.nic.in/sites/default/files/Annual%20Report%202022.pdf" },
      { label: "IOA London 2012 results and report", url: "https://olympic.ind.in/international-game/summer-olympics-games-london-2012/" },
      { label: "IOA athlete profile", url: "https://olympic.ind.in/athlete/saina-nehwal/" },
    ],
  },
  {
    id: "mary-kom", name: "M. C. Mary Kom", regionId: "manipur",
    sport: "Boxing",
    summary: "Indian boxer. The National Sports University prospectus identifies her among Manipur's sport achievers.",
    highlights: ["Won bronze in women's flyweight boxing at London 2012."],
    sources: [
      { label: "National Sports University prospectus (Manipur sport achievers)", url: "https://yas.nic.in/sites/default/files/Prospectus%20of%20National%20Sports%20University.pdf" },
      { label: "IOA London 2012 results and report", url: "https://olympic.ind.in/international-game/summer-olympics-games-london-2012/" },
      { label: "IOA athlete profile", url: "https://olympic.ind.in/athlete/mary-kom/" },
    ],
  },
]
export function getAthleteById(id: string) {
  return ATHLETES.find((athlete) => athlete.id === id)
}

export function getAthletesForRegion(regionId: string) {
  return ATHLETES.filter((athlete) => athlete.regionId === regionId)
}

export function getAthleteStaticParams() {
  return ATHLETES.map((athlete) => ({ slug: athlete.id }))
}

export function getRegionName(regionId: string) {
  return INDIA_REGIONS.find((region) => region.id === regionId)?.name ?? regionId
}



export function getSportCategory(athlete: AthleteRecord | string) {
  const label = typeof athlete === "string" ? athlete : athlete.sport
  return label.split("·")[0].trim()
}

export function getSportSlug(sport: string) {
  return getSportCategory(sport).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export function getAthletesForRegionSport(regionId: string, sportSlug: string) {
  return getAthletesForRegion(regionId).filter((athlete) => getSportSlug(athlete.sport) === sportSlug)
}

export const SPORT_CATEGORIES = [
  "Archery", "Athletics", "Badminton", "Basketball", "Boxing", "Cricket",
  "Football", "Hockey", "Kabaddi", "Shooting", "Swimming", "Table tennis",
  "Tennis", "Volleyball", "Weightlifting", "Wrestling", "Para athletics",
  "Para badminton", "Para shooting", "Para table tennis",
]
