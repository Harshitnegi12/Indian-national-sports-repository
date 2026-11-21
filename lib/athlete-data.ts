import { INDIA_REGIONS } from "@/lib/india-sports-data"
import { HARYANA_ATHLETES, HARYANA_ENRICHMENT } from "@/lib/data/haryana"

export interface AthleteSource {
  label: string
  url: string
}

/** Highest level of achievement, used for badges and for sorting champions first. */
export type AthleteTier = "olympic-medal" | "paralympic-medal" | "world-champion" | "international" | "national"

/**
 * One athlete. Any number of athletes can share a region and sport.
 * `sport` is "Category · Event", e.g. "Athletics · Javelin throw"; the category must be in SPORT_CATEGORIES.
 */
export interface AthleteRecord {
  id: string
  name: string
  regionId: string
  sport: string
  summary: string
  highlights: string[]
  sources: AthleteSource[]
  /** Village, town or district, e.g. "Khandra, Panipat". */
  hometown?: string
  tier?: AthleteTier
  /** Shown in the "Champions" strip of the region page and on the home page. */
  featured?: boolean
  /** Only used by enrichment maps: appended to highlights / sources. */
  extraHighlights?: string[]
  extraSources?: AthleteSource[]
}

const BASE_ATHLETES: AthleteRecord[] = [
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
  {
    id: "deepika-kumari", name: "Deepika Kumari", regionId: "jharkhand",
    sport: "Archery · Recurve",
    summary: "Indian recurve archer. The Jharkhand government records her Commonwealth Games titles and sporting achievements.",
    highlights: ["Won individual and team recurve gold at the 2010 Commonwealth Games.", "Represented India at the London 2012, Rio 2016, Tokyo 2020 and Paris 2024 Olympic Games."],
    sources: [
      { label: "Chief Minister of Jharkhand — athlete profile", url: "https://cm.jharkhand.gov.in/deepika-kumari-0" },
      { label: "Government of Jharkhand — Tokyo Olympic team recognition", url: "https://cm.jharkhand.gov.in/node/13924" },
      { label: "IOA — Paris 2024 athlete list", url: "https://olympic.ind.in/wp-content/uploads/2025/09/385573286.pdf" },
    ],
  },
  {
    id: "hima-das", name: "Hima Das", regionId: "assam",
    sport: "Athletics · Sprint",
    summary: "Indian sprinter from Assam who won medals at the 2018 Asian Games.",
    highlights: ["Won gold in the women's 4 × 400 m relay and silver in the 400 m at the 2018 Asian Games."],
    sources: [
      { label: "IOA — Jakarta–Palembang 2018 results", url: "https://olympic.ind.in/international-game/asian-games-jakarta-and-palembang-indonesia-2018/" },
      { label: "IOA — athlete journeys from different parts of India", url: "https://olympic.ind.in/news/glasgow-2026-one-flag-many-dreams-different-journeys-one-identity-team-india/" },
    ],
  },
  {
    id: "dutee-chand", name: "Dutee Chand", regionId: "odisha",
    sport: "Athletics · Sprint",
    summary: "Indian sprinter listed for Odisha by the Ministry of Youth Affairs and Sports.",
    highlights: ["Won silver in the women's 100 m and 200 m at the 2018 Asian Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — athlete profile", url: "https://www.yas.gov.in/en/dutee-chand" },
      { label: "IOA — Jakarta–Palembang 2018 results", url: "https://olympic.ind.in/international-game/asian-games-jakarta-and-palembang-indonesia-2018/" },
    ],
  },
  {
    id: "kishore-jena", name: "Kishore Jena", regionId: "odisha",
    sport: "Athletics · Javelin throw",
    summary: "Indian javelin thrower representing India at the Paris 2024 Olympic Games; Odisha's sports department lists him among the state's athletes.",
    highlights: ["Finished fifth in men's javelin throw at the 2023 Asian Games.", "Qualified for the Paris 2024 Olympic Games."],
    sources: [
      { label: "Sports & Youth Services Department, Odisha", url: "https://sports.odisha.gov.in/en" },
      { label: "IOA — Paris 2024 athlete list", url: "https://olympic.ind.in/wp-content/uploads/2025/09/385573286.pdf" },
    ],
  },
  {
    id: "sreejesh-pr", name: "P. R. Sreejesh", regionId: "kerala",
    sport: "Hockey · Goalkeeper",
    summary: "Indian hockey goalkeeper and Olympic medallist from Kerala.",
    highlights: ["Won men's hockey bronze at Tokyo 2020 and Paris 2024."],
    sources: [
      { label: "IOA — London 2012 hockey team", url: "https://olympic.ind.in/international-game/summer-olympics-games-london-2012/" },
      { label: "IOA — Paris 2024 athlete list", url: "https://olympic.ind.in/wp-content/uploads/2025/09/385573286.pdf" },
      { label: "IOA — Tokyo 2020 results and report", url: "https://olympic.ind.in/tokyo-2020/" },
    ],
  },
  {
    id: "lakshya-sen", name: "Lakshya Sen", regionId: "uttarakhand",
    sport: "Badminton · Singles",
    summary: "Indian badminton player who hails from Almora district in Uttarakhand.",
    highlights: ["Won men's singles gold at the 2018 Youth Olympic Games.", "Reached the men's singles semi-finals at Paris 2024."],
    sources: [
      { label: "Olympic Gold Quest — athlete background", url: "https://ogq.org/annual-report/OGQ_Annual_Report_2021_22.pdf" },
      { label: "IOA — Youth Olympic Games results", url: "https://olympic.ind.in/international-game/summer-youth-olympic-games-buenos-aires-argentina-2018/" },
      { label: "IOA — Paris 2024 athlete list", url: "https://olympic.ind.in/wp-content/uploads/2025/09/385573286.pdf" },
    ],
  },
  {
    id: "lalremsiami", name: "Lalremsiami", regionId: "mizoram",
    sport: "Hockey · Forward",
    summary: "Indian hockey forward born in Kolasib, Mizoram, and a member of the national team.",
    highlights: ["Represented India at the Tokyo 2020 Olympic Games and multiple FIH international tournaments."],
    sources: [
      { label: "International Hockey Federation — player profile and birthplace", url: "https://www.fih.hockey/general/news/nothing-beats-first-time-representing-your-country-says-rising-star-lalremsiami" },
      { label: "Ministry of Youth Affairs and Sports — athlete profile", url: "https://www.yas.gov.in/en/lalremsiami" },
    ],
  },
  {
    id: "tarundeep-rai", name: "Tarundeep Rai", regionId: "sikkim",
    sport: "Archery · Recurve",
    summary: "Indian archer from Sikkim and a three-time Olympian.",
    highlights: ["Won silver in men's individual archery at the 2010 Asian Games.", "Represented India at the Athens 2004, Beijing 2008 and London 2012 Olympic Games."],
    sources: [
      { label: "Government of Sikkim — Olympian Tarundeep Rai", url: "https://www.sikkim.gov.in/media/news-announcement/news-info?name=Chief%2BMinister%2BMeets%2BOlympian%2BArcher%2BTarundeep%2BRai%2Band%2BCoach%2BSonam%2BTshering%2BBhutia" },
      { label: "IOA — Asian Games 2010 results", url: "https://olympic.ind.in/international-game/asian-games-guangzhau-china-2010/" },
    ],
  },
  {
    id: "annu-rani", name: "Annu Rani", regionId: "uttar-pradesh",
    sport: "Athletics · Javelin throw",
    summary: "Indian javelin thrower from Meerut, Uttar Pradesh, and an Asian Games champion.",
    highlights: ["Won gold in women's javelin throw at the 2023 Asian Games.", "Won bronze in women's javelin throw at the 2022 Commonwealth Games."],
    sources: [
      { label: "Press Information Bureau — athlete profile and hometown", url: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2022/aug/doc20228884401.pdf" },
      { label: "President of India — Arjuna Award 2024", url: "https://www.presidentofindia.gov.in/sites/default/files/2023-06/notice.pdf" },
    ],
  },
  {
    id: "manika-batra", name: "Manika Batra", regionId: "delhi-nct",
    sport: "Table tennis · Singles",
    summary: "Indian table tennis player listed for Delhi by the Ministry of Youth Affairs and Sports.",
    highlights: ["Won two gold medals at the 2018 Commonwealth Games.", "Represented India at the Tokyo 2020 and Paris 2024 Olympic Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — athlete profile", url: "https://www.yas.gov.in/en/manika-batra" },
      { label: "IOA — Paris 2024 athlete list", url: "https://olympic.ind.in/wp-content/uploads/2025/09/385573286.pdf" },
    ],
  },
  {
    id: "vivek-sagar-prasad", name: "Vivek Sagar Prasad", regionId: "madhya-pradesh",
    sport: "Hockey · Midfielder",
    summary: "Indian hockey player recognised by the Madhya Pradesh Sports Department as one of the state's athletes.",
    highlights: ["Won men's hockey bronze at Tokyo 2020 and Paris 2024."],
    sources: [
      { label: "Madhya Pradesh Sports Department — athlete profile", url: "https://dsywmp.gov.in/?attachment_id=14309" },
      { label: "Press Information Bureau — Tokyo 2020 hockey team", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1771348&lang=2&reg=48" },
    ],
  },
  {
    id: "dipa-karmakar", name: "Dipa Karmakar", regionId: "tripura",
    sport: "Gymnastics · Artistic",
    summary: "Indian artistic gymnast and Olympian from Tripura.",
    highlights: ["Finished fourth in the women's vault final at the Rio 2016 Olympic Games.", "Won gold in women's vault at the 2024 Asian Women's Artistic Gymnastics Championships."],
    sources: [
      { label: "Tripura Olympic Association — official profile", url: "https://olympic.ind.in/members/" },
      { label: "International Gymnastics Federation — athlete profile", url: "https://www.gymnastics.sport/site/athletes/bio_detail.php?id=36263" },
    ],
  },
  {
    id: "chekrovolu-swuro", name: "Chekrovolu Swuro", regionId: "nagaland",
    sport: "Archery · Recurve",
    summary: "Indian archer and Olympian from Nagaland.",
    highlights: ["Represented India in women's recurve archery at the London 2012 Olympic Games.", "Received the Arjuna Award for archery."],
    sources: [
      { label: "Department of Information & Public Relations, Nagaland", url: "https://ipr.nagaland.gov.in/NAGALAND-POLICE-1st-INTER-SCHOOL-SPORTS-FESTIVAL-2026-CONCLUDES-AT-CHUMOUKEDIMA" },
      { label: "IOA — London 2012 athlete list", url: "https://olympic.ind.in/international-game/summer-olympics-games-london-2012/" },
    ],
  },
  {
    id: "harmanpreet-singh", name: "Harmanpreet Singh", regionId: "punjab",
    sport: "Hockey · Defender",
    summary: "Indian hockey captain listed for Punjab by the Ministry of Youth Affairs and Sports.",
    highlights: ["Won men's hockey bronze at the Paris 2024 Olympic Games.", "Won bronze in men's hockey at the 2018 Asian Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — athlete profile", url: "https://www.yas.gov.in/en/harmanpreet-singh" },
      { label: "IOA — Paris 2024 athlete list", url: "https://olympic.ind.in/wp-content/uploads/2025/09/385573286.pdf" },
    ],
  },
  {
    id: "manpreet-singh", name: "Manpreet Singh", regionId: "punjab",
    sport: "Hockey · Midfielder",
    summary: "Indian hockey player listed for Punjab by the Ministry of Youth Affairs and Sports.",
    highlights: ["Won men's hockey bronze at Tokyo 2020 and Paris 2024.", "Won bronze in men's hockey at the 2018 Asian Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — athlete profile", url: "https://www.yas.gov.in/en/manpreet-singh-0" },
      { label: "IOA — Paris 2024 athlete list", url: "https://olympic.ind.in/wp-content/uploads/2025/09/385573286.pdf" },
    ],
  },
  {
    id: "monika-chandigarh", name: "Monika", regionId: "chandigarh",
    sport: "Hockey · Midfielder",
    summary: "Indian hockey player listed for Chandigarh in the Ministry of Youth Affairs and Sports athlete records.",
    highlights: ["Won silver in the women's hockey tournament at the 2018 Asian Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — athlete profile", url: "https://www.yas.gov.in/en/monika" },
      { label: "Ministry of Youth Affairs and Sports — Asian Games 2018 medal winners", url: "https://www.yas.gov.in/en/sports/asian-games-2018-medal-winners" },
    ],
  },
  {
    id: "dharun-ayyasamy", name: "Dharun Ayyasamy", regionId: "tamil-nadu",
    sport: "Athletics · 400 m hurdles",
    summary: "Indian hurdler listed for Tamil Nadu by the Ministry of Youth Affairs and Sports.",
    highlights: ["Won silver in the men's 400 m hurdles at the 2018 Asian Games.", "Won silver as part of the men's 4 × 400 m relay team at the 2018 Asian Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — athlete profile", url: "https://www.yas.gov.in/en/dharun-ayyasamy" },
      { label: "IOA — Jakarta–Palembang 2018 results", url: "https://olympic.ind.in/international-game/asian-games-jakarta-and-palembang-indonesia-2018/" },
    ],
  },
  {
    id: "harmeet-desai", name: "Harmeet Rajul Desai", regionId: "gujarat",
    sport: "Table tennis · Singles",
    summary: "Indian table tennis player listed for Gujarat by the Ministry of Youth Affairs and Sports.",
    highlights: ["Won bronze in the men's team event at the 2018 Asian Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — athlete profile", url: "https://www.yas.gov.in/en/harmeet-rajul-desai" },
      { label: "IOA — Jakarta–Palembang 2018 results", url: "https://olympic.ind.in/international-game/asian-games-jakarta-and-palembang-indonesia-2018/" },
    ],
  },
  {
    id: "rajani-etimarpu", name: "Rajani Etimarpu", regionId: "andhra-pradesh",
    sport: "Hockey · Goalkeeper",
    summary: "Indian hockey goalkeeper listed for Andhra Pradesh in the Ministry of Youth Affairs and Sports' Asian Games 2018 medal records.",
    highlights: ["Won silver with India's women's hockey team at the 2018 Asian Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — Asian Games 2018 medal winners", url: "https://www.yas.gov.in/en/sports/asian-games-2018-medal-winners" },
    ],
  },
  {
    id: "duyu-hinda", name: "Duyu Hinda", regionId: "arunachal-pradesh",
    sport: "Athletics · Middle-distance running",
    summary: "Arunachal Pradesh athlete listed in Athletics Federation of India junior championship results.",
    highlights: ["Recorded a 1:58.89 result in the 800 m at the 2026 East Zone Junior Athletics Championships."],
    sources: [
      { label: "Athletics Federation of India — 37th East Zone Junior Athletics Championships 2026 results", url: "https://indianathletics.in/afi_result/37th-east-zone-junior-athletics-championships-2026/" },
    ],
  },
  {
    id: "shreyasi-singh", name: "Shreyasi Singh", regionId: "bihar",
    sport: "Shooting · Trap",
    summary: "Indian sport shooter and Bihar legislator, listed by the Ministry of Youth Affairs and Sports among the 2018 Commonwealth Games medallists.",
    highlights: ["Won gold in women's double trap at the 2018 Commonwealth Games.", "Represented India in women's trap at the Paris 2024 Olympic Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — Commonwealth Games 2018 medallists", url: "https://yas.gov.in/sites/default/files/COMMONWEALTH%202018%20MEDALLIST_1.pdf" },
      { label: "Government of India — Paris 2024 athlete list", url: "https://yas.gov.in/sites/default/files/Participation%20of%20Indian%20Contingent%20in%20Paris%20Olympics%202024-%20Clearance.pdf" },
      { label: "Press Information Bureau — Bihar representative and shooter", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2046919&lang=2&reg=48" },
    ],
  },
  {
    id: "gyaneshwari-yadav", name: "Gyaneshwari Yadav", regionId: "chhattisgarh",
    sport: "Weightlifting",
    summary: "Indian weightlifter from Chhattisgarh whose competition results are recorded by the Khelo India ASMITA programme.",
    highlights: ["Competed in the women's 49 kg weightlifting category at national-level events."],
    sources: [
      { label: "Khelo India — ASMITA athlete and competition records", url: "https://asmita.kheloindia.gov.in/" },
    ],
  },
  {
    id: "mary-dsouza-sequeira", name: "Mary D'Souza Sequeira", regionId: "goa",
    sport: "Hockey · Forward",
    summary: "Goan hockey player and multi-sport athlete from Aldona, recognised by the Goa Legislative Assembly for representing India.",
    highlights: ["Represented India in hockey and athletics.", "Won three Asian Games medals and received the Dhyan Chand Award for lifetime achievement."],
    sources: [
      { label: "Goa Legislative Assembly — congratulatory motion and athlete record", url: "https://www.goavidhansabha.gov.in/printmember.php?mem_id=26" },
    ],
  },
  {
    id: "arif-khan", name: "Arif Mohammad Khan", regionId: "jammu-kashmir",
    sport: "Alpine skiing",
    summary: "Indian alpine skier from Tangmarg in Jammu and Kashmir who represented India at the Winter Olympic Games.",
    highlights: ["Represented India in alpine skiing at the Beijing 2022 Winter Olympic Games."],
    sources: [
      { label: "Jammu and Kashmir Sports Council — athlete record", url: "https://jksportscouncil.in/wp-content/uploads/2018/07/JKSSC-BOOK-CTB.pdf" },
      { label: "Government of India — Winter Olympics participation record", url: "https://sansad.in/getFile/loksabhaquestions/annex/178/AU2146.pdf" },
    ],
  },
  {
    id: "ashwini-ponnappa", name: "Ashwini Ponnappa", regionId: "karnataka",
    sport: "Badminton · Doubles",
    summary: "Indian badminton player associated with Karnataka in Sports Authority of India records.",
    highlights: ["Won gold with India's mixed team at the 2018 Commonwealth Games and earned bronze in women's doubles."],
    sources: [
      { label: "Sports Authority of India — Rio preparations athlete profile", url: "https://sportsauthorityofindia.gov.in/sai_new/public/assets/uploads/news/1632129064_final%20book%201234.pdf" },
      { label: "Ministry of Youth Affairs and Sports — Commonwealth Games 2018 medallists", url: "https://yas.gov.in/sites/default/files/COMMONWEALTH%202018%20MEDALLIST_1.pdf" },
      { label: "Press Information Bureau — Karnataka's National Games contingent", url: "https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1865678&lang=2&reg=48" },
    ],
  },
  {
    id: "rahi-sarnobat", name: "Rahi Jeevan Sarnobat", regionId: "maharashtra",
    sport: "Shooting · Pistol",
    summary: "Indian pistol shooter from Kolhapur, Maharashtra, recognised by the Ministry of Youth Affairs and Sports.",
    highlights: ["Won gold in the women's 25 m pistol event at the 2018 Asian Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — athlete profile", url: "https://www.yas.gov.in/en/rahi-jeevan-sarnobat" },
      { label: "Governor of Maharashtra — athlete recognition", url: "https://rajbhavan-maharashtra.gov.in/en/29-06-2021-governor-koshyari-congratulates-golden-girl-rahi-sarnobat-for-winning-gold-for-india/" },
    ],
  },
  {
    id: "eugeneson-lyngdoh", name: "Eugeneson Lyngdoh", regionId: "meghalaya",
    sport: "Football · Midfielder",
    summary: "Former India international from Shillong, Meghalaya, whose career began in the state's local football system.",
    highlights: ["Earned 24 senior international caps for India.", "Won the AIFF Player of the Year award in 2015."],
    sources: [
      { label: "All India Football Federation — Shillong player profile", url: "https://www.the-aiff.com/article/the-shillong-boy-who-never-gave-up" },
      { label: "All India Football Federation — career and national team record", url: "https://www.the-aiff.com/article/eugeneson-lyngdoh-named-honourary-project-head-for-u-17-mens-team" },
    ],
  },
  {
    id: "ramit-tandon", name: "Ramit Tandon", regionId: "west-bengal",
    sport: "Squash · Singles",
    summary: "Indian squash player listed for West Bengal in the Ministry of Youth Affairs and Sports' Asian Games medal records.",
    highlights: ["Won bronze in the men's team squash event at the 2018 Asian Games."],
    sources: [
      { label: "Ministry of Youth Affairs and Sports — Asian Games 2018 medal winners", url: "https://www.yas.gov.in/en/sports/asian-games-2018-medal-winners" },
    ],
  },
  {
    id: "resanth-khan", name: "Resanth Khan", regionId: "andaman-nicobar",
    sport: "Swimming · Freestyle",
    summary: "Swimmer entered for Andaman and Nicobar in the men's 50 m freestyle start list at the 38th National Games.",
    highlights: ["Listed in the men's 50 m freestyle event at the 2025 National Games."],
    sources: [
      { label: "Swimming Federation of India — 38th National Games Day 3 start list", url: "https://www.swimming.org.in/wp-content/uploads/2025/01/38thng_Day-3_Start_List.pdf" },
    ],
  },
  {
    id: "bishal-banik", name: "Bishal Banik", regionId: "dadra-nagar-haveli-daman-diu",
    sport: "Sepaktakraw · Trio",
    summary: "Sepaktakraw player listed in the Dadra and Nagar Haveli and Daman and Diu contingent for the 2025 Khelo India Beach Games.",
    highlights: ["Selected for the boys' trio team at the 2025 Khelo India Beach Games."],
    sources: [
      { label: "Khelo India — Beach Games 2025 participant list", url: "https://kheloindia.gov.in/uploads/Khelo%20India%20Beach%20Games%202025%20Part.pdf" },
    ],
  },
  {
    id: "stanzin-angchok", name: "Stanzin Angchok", regionId: "ladakh",
    sport: "Ice hockey · Forward",
    summary: "Captain of the Ladakh men's ice hockey team, documented by the Ladakh Administration.",
    highlights: ["Captained Ladakh at the 2024 Khelo India Winter Games and national ice hockey events."],
    sources: [
      { label: "Ladakh Administration — ice hockey team profile and results", url: "https://ladakh.gov.in/ladakh-ice-hockey-teams-bask-in-their-new-found-identities/" },
    ],
  },
  {
    id: "mohammed-sajir-kc", name: "Mohammed Sajir K. C.", regionId: "lakshadweep",
    sport: "Athletics · 800 m",
    summary: "Lakshadweep middle-distance runner listed in the official Khelo India Youth Games 2023 participation record.",
    highlights: ["Entered the boys' 800 m event at the 2023 Khelo India Youth Games."],
    sources: [
      { label: "Khelo India — Youth Games 2023 participant records", url: "https://youth.kheloindia.gov.in/assets/landing_new/participation_certificate.pdf" },
    ],
  },
  {
    id: "penupothu-prem-kumar", name: "Penupothu Prem Kumar", regionId: "puducherry",
    sport: "Swimming · Freestyle",
    summary: "Swimmer listed for Puducherry in the men's 50 m freestyle at the 38th National Games.",
    highlights: ["Entered the men's 50 m freestyle event at the 2025 National Games."],
    sources: [
      { label: "Swimming Federation of India — 38th National Games Day 3 start list", url: "https://www.swimming.org.in/wp-content/uploads/2025/01/38thng_Day-3_Start_List.pdf" },
    ],
  },
]

const ENRICHMENT: Record<string, Partial<AthleteRecord>> = {
  ...HARYANA_ENRICHMENT,
}

function enrich(athlete: AthleteRecord): AthleteRecord {
  const extra = ENRICHMENT[athlete.id]
  if (!extra) return athlete
  const { extraHighlights, extraSources, ...rest } = extra
  return {
    ...athlete,
    ...rest,
    highlights: [...athlete.highlights, ...(extraHighlights ?? [])],
    sources: [...athlete.sources, ...(extraSources ?? [])],
  }
}

const MEDAL = /\b(gold|silver|bronze|medal|champion)\b/i
const OLYMPIC = /\bOlympic|Olympics\b/i

/** Uses the explicit tier, otherwise reads it from a single highlight that names both a medal and the Games. */
export function getAthleteTier(athlete: AthleteRecord): AthleteTier | undefined {
  if (athlete.tier) return athlete.tier
  for (const line of athlete.highlights) {
    if (/Paralympic/i.test(line) && MEDAL.test(line)) return "paralympic-medal"
  }
  for (const line of athlete.highlights) {
    if (OLYMPIC.test(line) && !/Youth|Winter/i.test(line) && MEDAL.test(line)) return "olympic-medal"
  }
  return undefined
}

const seen = new Set<string>()
export const ATHLETES: AthleteRecord[] = [...BASE_ATHLETES, ...HARYANA_ATHLETES]
  .filter((athlete) => (seen.has(athlete.id) ? false : (seen.add(athlete.id), true)))
  .map(enrich)
  .map((athlete) => ({ ...athlete, tier: getAthleteTier(athlete) }))

export const TIER_LABEL: Record<AthleteTier, string> = {
  "olympic-medal": "Olympic medallist",
  "paralympic-medal": "Paralympic medallist",
  "world-champion": "World champion",
  international: "International",
  national: "National",
}

const TIER_RANK: Record<AthleteTier, number> = {
  "olympic-medal": 0,
  "paralympic-medal": 1,
  "world-champion": 2,
  international: 3,
  national: 4,
}

export function compareAthletes(a: AthleteRecord, b: AthleteRecord) {
  const ra = a.tier ? TIER_RANK[a.tier] : 9
  const rb = b.tier ? TIER_RANK[b.tier] : 9
  return ra - rb || a.name.localeCompare(b.name)
}

export function isMedallist(athlete: AthleteRecord) {
  return athlete.tier === "olympic-medal" || athlete.tier === "paralympic-medal"
}

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
  "Alpine skiing", "Archery", "Athletics", "Badminton", "Basketball", "Boxing", "Cricket",
  "Football", "Hockey", "Ice hockey", "Kabaddi", "Shooting", "Sepaktakraw", "Squash", "Swimming", "Table tennis",
  "Tennis", "Volleyball", "Weightlifting", "Wrestling", "Gymnastics", "Para athletics",
  "Para badminton", "Para shooting", "Para table tennis", "Para archery",
]

/** Sport names in Devanagari. */
export const SPORT_HINDI: Record<string, string> = {
  "Alpine skiing": "अल्पाइन स्कीइंग", Archery: "तीरंदाज़ी", Athletics: "एथलेटिक्स", Badminton: "बैडमिंटन",
  Basketball: "बास्केटबॉल", Boxing: "मुक्केबाज़ी", Cricket: "क्रिकेट", Football: "फुटबॉल", Hockey: "हॉकी",
  "Ice hockey": "आइस हॉकी", Kabaddi: "कबड्डी", Shooting: "निशानेबाज़ी", Sepaktakraw: "सेपक टकरॉ", Squash: "स्क्वैश",
  Swimming: "तैराकी", "Table tennis": "टेबल टेनिस", Tennis: "टेनिस", Volleyball: "वॉलीबॉल", Weightlifting: "भारोत्तोलन",
  Wrestling: "कुश्ती", Gymnastics: "जिम्नास्टिक्स", "Para athletics": "पैरा एथलेटिक्स", "Para badminton": "पैरा बैडमिंटन",
  "Para shooting": "पैरा निशानेबाज़ी", "Para table tennis": "पैरा टेबल टेनिस", "Para archery": "पैरा तीरंदाज़ी",
}

export function getSportEvent(athlete: AthleteRecord) {
  return athlete.sport.split("·")[1]?.trim() ?? ""
}

/** Sports that have at least one athlete, with counts, most athletes first. */
export function getSportCounts(athletes: AthleteRecord[]) {
  const counts = new Map<string, number>()
  for (const athlete of athletes) {
    const category = getSportCategory(athlete)
    counts.set(category, (counts.get(category) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([sport, count]) => ({ sport, slug: getSportSlug(sport), count }))
    .sort((a, b) => b.count - a.count || a.sport.localeCompare(b.sport))
}

export function getInitials(name: string) {
  const parts = name.replace(/\./g, " ").trim().split(/\s+/)
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase()
}
