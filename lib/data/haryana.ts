import type { AthleteRecord } from "@/lib/athlete-data"
import type { Academy, RegionExtras } from "@/lib/region-extras"

// Content moved from the original Haryana Khiladi page (public/haryana-khiladi) into shared data,
// so the same React template can show it. Source links are the ones the original page used.

const WFI = "https://wrestlingfederationofindia.org/"
const AFI = "https://indianathletics.in/"
const BCCI = "https://www.bcci.tv/"
const HI = "https://hockeyindia.org/"
const PKL = "https://www.prokabaddi.com/"
const NRAI = "https://nrai.org.in/"
const HSD = "https://haryanasports.gov.in/"
const PARA = "https://www.paralympic.org/"
const SAI = "https://sai.gov.in/"
const oly = (slug: string) => "https://olympics.com/en/athletes/" + slug

type NewAthlete = Omit<AthleteRecord, "regionId">

const ATHLETES: NewAthlete[] = [
  // Wrestling
  { id: "yogeshwar-dutt", name: "Yogeshwar Dutt", sport: "Wrestling · Freestyle", hometown: "Bhainswal Kalan, Sonipat", summary: "Freestyle wrestler from Sonipat district.", highlights: ["London 2012 Olympic bronze medal.", "Gold at both the 2014 Commonwealth Games and the 2014 Asian Games."], sources: [{ label: "Olympics.com profile", url: oly("yogeshwar-dutt") }], tier: "olympic-medal" },
  { id: "sakshi-malik", name: "Sakshi Malik", sport: "Wrestling · Freestyle", hometown: "Mokhra, Rohtak", summary: "Freestyle wrestler from Rohtak district.", highlights: ["Rio 2016 Olympic bronze medal.", "First Indian woman wrestler to win an Olympic medal."], sources: [{ label: "Olympics.com profile", url: oly("sakshi-malik") }], tier: "olympic-medal", featured: true },
  { id: "bajrang-punia", name: "Bajrang Punia", sport: "Wrestling · Freestyle", hometown: "Khudan, Jhajjar", summary: "Freestyle wrestler from Jhajjar district.", highlights: ["Tokyo 2020 Olympic bronze medal.", "First Indian wrestler to win four World Championships medals."], sources: [{ label: "Olympics.com profile", url: oly("bajrang-bajrang") }], tier: "olympic-medal", featured: true },
  { id: "vinesh-phogat", name: "Vinesh Phogat", sport: "Wrestling · Freestyle", hometown: "Balali, Charkhi Dadri", summary: "Freestyle wrestler from Charkhi Dadri district.", highlights: ["Three-time Olympian.", "Three Commonwealth Games golds and an Asian Games gold.", "Reached the Olympic final at Paris 2024."], sources: [{ label: "Olympics.com profile", url: oly("vinesh-phogat") }], tier: "international", featured: true },
  { id: "geeta-phogat", name: "Geeta Phogat", sport: "Wrestling · Freestyle", hometown: "Balali, Charkhi Dadri", summary: "Freestyle wrestler from Charkhi Dadri district.", highlights: ["First Indian woman wrestler to win Commonwealth Games gold (2010).", "First Indian woman wrestler to qualify for the Olympics."], sources: [{ label: "WFI federation site", url: WFI }], tier: "international" },
  { id: "babita-phogat", name: "Babita Phogat", sport: "Wrestling · Freestyle", hometown: "Balali, Charkhi Dadri", summary: "Freestyle wrestler from Charkhi Dadri district.", highlights: ["Gold in the 55 kg category at the 2014 Commonwealth Games."], sources: [{ label: "WFI federation site", url: WFI }], tier: "international" },
  { id: "ravi-kumar-dahiya", name: "Ravi Kumar Dahiya", sport: "Wrestling · Freestyle", hometown: "Nahri, Sonipat", summary: "Freestyle wrestler from Sonipat district.", highlights: ["Silver in the 57 kg category at Tokyo 2020."], sources: [{ label: "WFI federation site", url: WFI }], tier: "olympic-medal" },
  { id: "aman-sehrawat", name: "Aman Sehrawat", sport: "Wrestling · Freestyle", hometown: "Jhajjar", summary: "Freestyle wrestler from Jhajjar district.", highlights: ["Bronze in the 57 kg category at Paris 2024."], sources: [{ label: "WFI federation site", url: WFI }], tier: "olympic-medal" },
  { id: "antim-panghal", name: "Antim Panghal", sport: "Wrestling · Freestyle", hometown: "Hisar", summary: "Freestyle wrestler from Hisar district, part of Haryana's new generation of wrestlers.", highlights: ["World U20 champion."], sources: [{ label: "WFI federation site", url: WFI }], tier: "international" },

  // Athletics
  { id: "krishna-poonia", name: "Krishna Poonia", sport: "Athletics · Discus throw", hometown: "Agroha, Hisar", summary: "Discus thrower from Hisar district.", highlights: ["Gold in women's discus throw at the 2010 Commonwealth Games."], sources: [{ label: "AFI federation site", url: AFI }], tier: "international" },
  { id: "seema-punia", name: "Seema Punia", sport: "Athletics · Discus throw", hometown: "Khewra, Sonipat", summary: "Discus thrower from Sonipat district.", highlights: ["India's No. 1 women's discus thrower for many years.", "Commonwealth Games and Asian Games medallist."], sources: [{ label: "AFI federation site", url: AFI }], tier: "international" },

  // Boxing
  { id: "vijender-singh", name: "Vijender Singh", sport: "Boxing · Middleweight", hometown: "Kaluwas, Bhiwani", summary: "Boxer from Bhiwani district.", highlights: ["Beijing 2008 Olympic bronze medal.", "First Indian boxer to win an Olympic medal."], sources: [{ label: "Olympics.com profile", url: oly("vijender-singh") }], tier: "olympic-medal", featured: true },
  { id: "nitu-ghanghas", name: "Nitu Ghanghas", sport: "Boxing · 48 kg", hometown: "Dhanana, Bhiwani", summary: "Boxer from Bhiwani district.", highlights: ["Gold at the 2022 Commonwealth Games.", "48 kg world champion in 2023."], sources: [{ label: "Olympics.com story", url: "https://olympics.com/en/news/who-is-nitu-ghanghas-india-boxing" }], tier: "world-champion" },
  { id: "saweety-boora", name: "Saweety Boora", sport: "Boxing · 81 kg", hometown: "Hisar", summary: "Boxer from Hisar district.", highlights: ["81 kg world champion in 2023."], sources: [{ label: "Haryana Sports Department", url: HSD }], tier: "world-champion" },
  { id: "akhil-kumar", name: "Akhil Kumar", sport: "Boxing · Bantamweight", hometown: "Bhiwani", summary: "Boxer from Bhiwani district.", highlights: ["Gold at the 2006 Commonwealth Games.", "Two-time Olympian."], sources: [{ label: "Haryana Sports Department", url: HSD }], tier: "international" },

  // Shooting
  { id: "anish-bhanwala", name: "Anish Bhanwala", sport: "Shooting · Pistol", hometown: "Karnal", summary: "Pistol shooter from Karnal district.", highlights: ["Won 2018 Commonwealth Games gold in the 25 m rapid fire pistol at the age of 15."], sources: [{ label: "NRAI federation site", url: NRAI }], tier: "international" },

  // Hockey
  { id: "rani-rampal", name: "Rani Rampal", sport: "Hockey · Forward", hometown: "Shahabad Markanda, Kurukshetra", summary: "Hockey forward from Kurukshetra district.", highlights: ["Played the 2010 World Cup at the age of 15.", "Former captain of the Indian women's hockey team."], sources: [{ label: "Olympics.com profile", url: oly("rani-rampal") }], tier: "international", featured: true },
  { id: "savita-punia", name: "Savita Punia", sport: "Hockey · Goalkeeper", hometown: "Jodhkan, Sirsa", summary: "Hockey goalkeeper from Sirsa district.", highlights: ["Most-capped player in Indian women's hockey.", "Arjuna Award recipient."], sources: [{ label: "Olympics.com profile", url: oly("savita-savita") }], tier: "international" },
  { id: "sandeep-singh", name: "Sandeep Singh", sport: "Hockey · Defender", hometown: "Shahabad Markanda, Kurukshetra", summary: "Drag-flicker from Kurukshetra district.", highlights: ["Former captain of the Indian men's hockey team, known for his drag-flick."], sources: [{ label: "Hockey India", url: HI }], tier: "international" },

  // Kabaddi
  { id: "pardeep-narwal", name: "Pardeep Narwal", sport: "Kabaddi · Raider", hometown: "Rindhana, Sonipat", summary: "Kabaddi raider from Sonipat district, known as the 'Dubki King'.", highlights: ["Holds the Pro Kabaddi League record for most raid points.", "Two-time league MVP."], sources: [{ label: "Pro Kabaddi League", url: PKL }], tier: "national", featured: true },

  // Cricket
  { id: "kapil-dev", name: "Kapil Dev", sport: "Cricket · All-rounder", hometown: "Played for Haryana", summary: "All-rounder who played domestic cricket for Haryana, known as the 'Haryana Hurricane'.", highlights: ["Captained India to the 1983 World Cup title."], sources: [{ label: "BCCI", url: BCCI }], tier: "world-champion" },
  { id: "yuzvendra-chahal", name: "Yuzvendra Chahal", sport: "Cricket · Leg-spinner", hometown: "Jind", summary: "Leg-spinner from Jind district.", highlights: ["A regular in India's white-ball sides."], sources: [{ label: "BCCI", url: BCCI }], tier: "international" },
  { id: "shafali-verma", name: "Shafali Verma", sport: "Cricket · Opening batter", hometown: "Rohtak", summary: "Opening batter from Rohtak district.", highlights: ["Reached No. 1 in the women's T20I batting rankings."], sources: [{ label: "BCCI player profile", url: "https://www.bcci.tv/international/women/players/shafali-verma/398" }], tier: "international" },
  { id: "joginder-sharma", name: "Joginder Sharma", sport: "Cricket · Medium pace", hometown: "Rohtak", summary: "Medium-pace bowler from Rohtak district.", highlights: ["Bowled the final over of the 2007 T20 World Cup final."], sources: [{ label: "BCCI", url: BCCI }], tier: "world-champion" },

  // Para sports
  { id: "sumit-antil", name: "Sumit Antil", sport: "Para athletics · Javelin F64", hometown: "Khewra, Sonipat", summary: "Para javelin thrower from Sonipat district.", highlights: ["Paralympic champion in men's javelin F64."], sources: [{ label: "Paralympic.org story", url: "https://www.paralympic.org/feature/india-s-paralympic-champion-antil-shares-secret-his-success-javelin-throwing" }], tier: "paralympic-medal", featured: true },
  { id: "harvinder-singh", name: "Harvinder Singh", sport: "Para archery · Recurve", hometown: "Kaithal", summary: "Para archer from Kaithal district.", highlights: ["Gold in archery at the Paris 2024 Paralympics."], sources: [{ label: "Paralympic.org", url: PARA }], tier: "paralympic-medal" },
  { id: "dharambir", name: "Dharambir", sport: "Para athletics · Club throw F51", hometown: "Haryana", summary: "Para club thrower from Haryana.", highlights: ["Gold in club throw F51 at the Paris 2024 Paralympics."], sources: [{ label: "Paralympic.org", url: PARA }], tier: "paralympic-medal" },
  { id: "pranav-soorma", name: "Pranav Soorma", sport: "Para athletics · Club throw F51", hometown: "Faridabad", summary: "Para club thrower from Faridabad district.", highlights: ["Silver in club throw F51 at the Paris 2024 Paralympics."], sources: [{ label: "Paralympic.org", url: PARA }], tier: "paralympic-medal" },
]

export const HARYANA_ATHLETES: AthleteRecord[] = ATHLETES.map((athlete) => ({ ...athlete, regionId: "haryana" }))

/** Extra details for Haryana athletes already present in the national list. */
export const HARYANA_ENRICHMENT: Record<string, Partial<AthleteRecord>> = {
  "neeraj-chopra": {
    hometown: "Khandra, Panipat",
    tier: "olympic-medal",
    featured: true,
    extraHighlights: ["2023 World Athletics champion."],
    extraSources: [{ label: "Diamond League profile", url: "https://www.diamondleague.com/?p=5744" }],
  },
  "manu-bhaker": {
    hometown: "Goria, Jhajjar",
    tier: "olympic-medal",
    featured: true,
    extraHighlights: ["First Indian athlete to win two medals at a single Olympic Games."],
    extraSources: [{ label: "Olympics.com profile", url: oly("manu-bhaker") }],
  },
  "saina-nehwal": {
    hometown: "Born in Hisar",
    tier: "olympic-medal",
    featured: true,
    extraSources: [{ label: "Olympics.com profile", url: oly("saina-nehwal") }],
  },
}

const ACADEMIES: Academy[] = [
  { name: "SAI National Centre of Excellence, Sonipat", place: "Sonipat", sports: ["Wrestling", "Athletics", "Hockey", "Kabaddi", "Archery"], description: "Sports Authority of India centre training athletes across several sports in one campus.", url: SAI, linkLabel: "SAI official site" },
  { name: "SAI National Centre of Excellence, Rohtak", place: "Rohtak", sports: ["Boxing"], description: "Sports Authority of India's boxing centre of excellence.", url: SAI, linkLabel: "SAI official site" },
  { name: "Motilal Nehru School of Sports", place: "Rai, Sonipat", sports: ["Multi-sport", "Basketball"], description: "Residential sports school, listed among Khelo India accredited academies.", url: HSD, linkLabel: "Haryana Sports Department" },
  { name: "Tau Devi Lal Sports Complex", place: "Panchkula", sports: ["Athletics", "Multi-sport"], description: "Where Neeraj Chopra began training at the age of 13.", url: HSD, linkLabel: "Haryana Sports Department" },
  { name: "Bhiwani Boxing Club", place: "Bhiwani", sports: ["Boxing"], description: "Coach Jagdish Singh's club, where boxers such as Vijender Singh and Nitu Ghanghas trained." },
  { name: "Shahabad Hockey Academy", place: "Shahabad Markanda, Kurukshetra", sports: ["Hockey"], description: "Where Rani Rampal started playing hockey in 2003 under coach Baldev Singh." },
  { name: "Bharat Singh Memorial Sports School", place: "Nidani, Jind", sports: ["Multi-sport"], description: "Listed among Khelo India accredited academies.", url: HSD, linkLabel: "Haryana Sports Department" },
  { name: "Narwal Sports Academy", place: "Haryana", sports: ["Kabaddi"], description: "Pardeep Narwal's kabaddi academy." },
  { name: "SAI Centre, Panipat", place: "Panipat", sports: ["Athletics", "Javelin"], description: "Where Neeraj Chopra first watched javelin throwers train.", url: SAI, linkLabel: "SAI official site" },
  { name: "Khelo India State Centre of Excellence", place: "Haryana", sports: ["Multi-sport"], description: "State sports department programme for athlete selection and training.", url: HSD, linkLabel: "Haryana Sports Department" },
  { name: "Haryana Academy of Adventure Sports", place: "Haryana", sports: ["Adventure"], description: "The state academy for mountaineering and adventure sports.", url: HSD, linkLabel: "Haryana Sports Department" },
]

export const HARYANA_EXTRAS: RegionExtras = {
  headline: "Mitti se medal tak",
  introduction: "From village akhadas to Olympic podiums, Haryana has produced some of India's best-known wrestlers, boxers, shooters, hockey players and para athletes. Browse them by sport, see which districts they come from, and find the academies where they trained.",
  quotes: [
    "Desan mein des Haryana, jit doodh dahi ka khana.",
    "Gaon ki pagdandi se podium tak.",
    "Ek khet, ek akhada, ek sapna.",
  ],
  facts: [
    { title: "About one-third", text: "According to the Haryana Sports Department, roughly a third of India's international medals have been won by athletes from Haryana." },
    { title: "Neeraj Chopra", text: "India's first Olympic gold in athletics, won at Tokyo 2020 by the javelin thrower from Khandra village, Panipat." },
    { title: "Manu Bhaker", text: "The first Indian athlete to win two medals at a single Olympic Games (Paris 2024). From Goria, Jhajjar." },
    { title: "Sakshi Malik", text: "The first Indian woman wrestler to win an Olympic medal (Rio 2016). From Rohtak." },
    { title: "Vijender Singh", text: "The first Indian boxer to win an Olympic medal (Beijing 2008). From Kaluwas, Bhiwani." },
    { title: "Pardeep Narwal", text: "Holds the Pro Kabaddi League record for most raid points. From Rindhana, Sonipat." },
  ],
  districts: [
    { name: "Bhiwani", sports: "Boxing", athletes: "Vijender Singh, Nitu Ghanghas, Akhil Kumar" },
    { name: "Sonipat", sports: "Wrestling, Kabaddi, Para athletics", athletes: "Yogeshwar Dutt, Ravi Dahiya, Pardeep Narwal, Sumit Antil" },
    { name: "Rohtak", sports: "Wrestling, Cricket", athletes: "Sakshi Malik, Shafali Verma, Joginder Sharma" },
    { name: "Jhajjar", sports: "Wrestling, Shooting", athletes: "Bajrang Punia, Manu Bhaker, Aman Sehrawat" },
    { name: "Panipat", sports: "Athletics", athletes: "Neeraj Chopra" },
    { name: "Kurukshetra", sports: "Hockey", athletes: "Rani Rampal, Sandeep Singh" },
    { name: "Hisar", sports: "Badminton, Boxing, Wrestling", athletes: "Saina Nehwal, Saweety Boora, Antim Panghal" },
    { name: "Sirsa", sports: "Hockey", athletes: "Savita Punia" },
    { name: "Jind", sports: "Cricket", athletes: "Yuzvendra Chahal" },
  ],
  academies: ACADEMIES,
  officialLinks: [
    { label: "Haryana Sports Department", url: HSD },
    { label: "Sports Authority of India", url: SAI },
  ],
}
