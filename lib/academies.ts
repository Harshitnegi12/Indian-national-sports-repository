// Training centres and academies across India, with official or reference links.
// Government centres link to the Sports Authority of India; others to their own site or a reference page.

export type AcademyType = "Government" | "Private" | "Corporate" | "Services"

export interface AcademyEntry {
  name: string
  regionId: string
  city: string
  sports: string[]
  type: AcademyType
  description: string
  url: string
  alumni?: string[]
}

const SAI = "https://sportsauthorityofindia.nic.in/"
const wiki = (t: string) => "https://en.wikipedia.org/wiki/" + t

export const ACADEMIES: AcademyEntry[] = [
  // National and government centres
  { name: "Netaji Subhas National Institute of Sports (SAI NCOE Patiala)", regionId: "punjab", city: "Patiala", sports: ["Athletics", "Boxing", "Weightlifting", "Wrestling", "Multi-sport"], type: "Government", description: "India's premier national sports institute and SAI centre of excellence, home to many national camps.", url: wiki("Netaji_Subhas_National_Institute_of_Sports") },
  { name: "SAI National Centre of Excellence, Bengaluru", regionId: "karnataka", city: "Bengaluru", sports: ["Hockey", "Athletics", "Swimming", "Multi-sport"], type: "Government", description: "SAI southern centre that hosts national hockey and athletics camps.", url: SAI },
  { name: "SAI National Centre of Excellence, Gandhinagar", regionId: "gujarat", city: "Gandhinagar", sports: ["Multi-sport"], type: "Government", description: "SAI's western regional centre with training facilities across several sports.", url: SAI },
  { name: "SAI National Centre of Excellence, Kolkata", regionId: "west-bengal", city: "Kolkata (Salt Lake)", sports: ["Archery", "Athletics", "Football", "Multi-sport"], type: "Government", description: "SAI's eastern regional centre.", url: SAI },
  { name: "SAI National Centre of Excellence, Bhopal", regionId: "madhya-pradesh", city: "Bhopal", sports: ["Hockey", "Rowing", "Multi-sport"], type: "Government", description: "SAI centre for central India, including water sports and hockey.", url: SAI },
  { name: "SAI National Centre of Excellence, Lucknow", regionId: "uttar-pradesh", city: "Lucknow", sports: ["Hockey", "Multi-sport"], type: "Government", description: "SAI centre for Uttar Pradesh and a regular base for women's hockey camps.", url: SAI },
  { name: "SAI National Centre of Excellence, Imphal", regionId: "manipur", city: "Imphal", sports: ["Boxing", "Weightlifting", "Archery", "Multi-sport"], type: "Government", description: "SAI centre in the North-East, known for boxing and weightlifting.", url: SAI },
  { name: "SAI National Centre of Excellence, Guwahati", regionId: "assam", city: "Guwahati", sports: ["Multi-sport"], type: "Government", description: "SAI centre for the North-East region.", url: SAI },
  { name: "Lakshmibai National College of Physical Education", regionId: "kerala", city: "Thiruvananthapuram", sports: ["Athletics", "Multi-sport"], type: "Government", description: "SAI college and centre of excellence for physical education and athletics.", url: wiki("Lakshmibai_National_College_of_Physical_Education") },
  { name: "Dr. Karni Singh Shooting Range", regionId: "delhi-nct", city: "New Delhi", sports: ["Shooting"], type: "Government", description: "National shooting range used for national camps and international events.", url: wiki("Dr._Karni_Singh_Shooting_Range") },
  { name: "Krida Prabodhini", regionId: "maharashtra", city: "Pune and other districts", sports: ["Multi-sport"], type: "Government", description: "Maharashtra government's residential sports schools that select talented children through trials.", url: "https://sports.maharashtra.gov.in/" },
  { name: "Guru Gobind Singh Sports College", regionId: "uttar-pradesh", city: "Lucknow", sports: ["Multi-sport", "Hockey"], type: "Government", description: "Residential sports college run by the Uttar Pradesh government.", url: wiki("Guru_Gobind_Singh_Sports_College") },
  { name: "G. V. Raja Sports School", regionId: "kerala", city: "Thiruvananthapuram", sports: ["Athletics", "Football", "Volleyball", "Multi-sport"], type: "Government", description: "Kerala's residential sports school that has produced many national athletes.", url: wiki("G._V._Raja_Sports_School") },
  { name: "Madhya Pradesh State Shooting Academy", regionId: "madhya-pradesh", city: "Bhopal", sports: ["Shooting"], type: "Government", description: "State shooting academy with residential training for young shooters.", url: "https://dsywmp.gov.in/" },

  // Services
  { name: "Army Sports Institute", regionId: "maharashtra", city: "Pune", sports: ["Athletics", "Boxing", "Wrestling", "Archery", "Weightlifting", "Shooting"], type: "Services", description: "The Indian Army's elite training centre under Mission Olympic; Neeraj Chopra is among its athletes.", url: wiki("Army_Sports_Institute"), alumni: ["neeraj-chopra"] },

  // Private and corporate academies
  { name: "Pullela Gopichand Badminton Academy", regionId: "telangana", city: "Hyderabad", sports: ["Badminton"], type: "Private", description: "Founded by former All England champion Pullela Gopichand; the training base of several Olympic medallists.", url: wiki("Pullela_Gopichand_Badminton_Academy"), alumni: ["pv-sindhu", "saina-nehwal", "kidambi-srikanth"] },
  { name: "Prakash Padukone Badminton Academy", regionId: "karnataka", city: "Bengaluru", sports: ["Badminton"], type: "Private", description: "Badminton academy founded by Prakash Padukone, now part of the Centre for Sports Excellence.", url: wiki("Prakash_Padukone_Badminton_Academy"), alumni: ["prakash-padukone"] },
  { name: "Inspire Institute of Sport", regionId: "karnataka", city: "Vijayanagar, Ballari", sports: ["Boxing", "Wrestling", "Athletics", "Judo", "Swimming"], type: "Corporate", description: "High-performance centre run by the JSW Group, supporting Olympic and junior athletes.", url: wiki("Inspire_Institute_of_Sport") },
  { name: "National Cricket Academy (BCCI Centre of Excellence)", regionId: "karnataka", city: "Bengaluru", sports: ["Cricket"], type: "Government", description: "BCCI's national academy for player development, fitness and rehabilitation.", url: wiki("National_Cricket_Academy") },
  { name: "Anju Bobby Sports Foundation", regionId: "karnataka", city: "Bengaluru", sports: ["Athletics"], type: "Private", description: "Athletics academy for young women set up by world medallist Anju Bobby George.", url: wiki("Anju_Bobby_George"), alumni: ["anju-bobby-george"] },
  { name: "Usha School of Athletics", regionId: "kerala", city: "Kinalur, Kozhikode", sports: ["Athletics"], type: "Private", description: "Residential athletics school founded by P. T. Usha for young girls.", url: wiki("Usha_School_of_Athletics"), alumni: ["p-t-usha"] },
  { name: "Gun for Glory", regionId: "maharashtra", city: "Pune", sports: ["Shooting"], type: "Private", description: "Shooting academy network founded by Olympic medallist Gagan Narang.", url: wiki("Gagan_Narang"), alumni: ["gagan-narang"] },
  { name: "Tata Archery Academy", regionId: "jharkhand", city: "Jamshedpur", sports: ["Archery"], type: "Corporate", description: "Tata Steel's archery academy, where Deepika Kumari trained.", url: wiki("Tata_Archery_Academy"), alumni: ["deepika-kumari"] },
  { name: "Tata Football Academy", regionId: "jharkhand", city: "Jamshedpur", sports: ["Football"], type: "Corporate", description: "One of India's oldest football academies, run by Tata Steel.", url: wiki("Tata_Football_Academy") },
  { name: "Naval Tata Hockey Academy", regionId: "jharkhand", city: "Jamshedpur", sports: ["Hockey"], type: "Corporate", description: "Tata Steel's residential hockey academy for young players.", url: wiki("Naval_Tata_Hockey_Academy") },
  { name: "Naval Tata Hockey High Performance Centre", regionId: "odisha", city: "Bhubaneswar", sports: ["Hockey"], type: "Corporate", description: "Hockey high-performance centre at Kalinga Stadium run with the Odisha government.", url: wiki("Kalinga_Stadium") },
  { name: "Odisha Reliance Foundation Athletics High Performance Centre", regionId: "odisha", city: "Bhubaneswar", sports: ["Athletics"], type: "Corporate", description: "Athletics high-performance centre at Kalinga Stadium.", url: wiki("Kalinga_Stadium") },
  { name: "Surjit Hockey Academy", regionId: "punjab", city: "Jalandhar", sports: ["Hockey"], type: "Government", description: "Punjab hockey academy named after Olympian Surjit Singh, a nursery for Indian hockey.", url: wiki("Surjit_Hockey_Academy") },
  { name: "Roundglass Hockey Academy", regionId: "punjab", city: "Mohali", sports: ["Hockey"], type: "Private", description: "Hockey academy network across rural Punjab.", url: "https://roundglasssports.com/" },
  { name: "Chhatrasal Stadium Akhara", regionId: "delhi-nct", city: "New Delhi", sports: ["Wrestling"], type: "Government", description: "Delhi government stadium and wrestling centre where several Olympic medallists trained.", url: wiki("Chhatrasal_Stadium"), alumni: ["sushil-kumar", "ravi-kumar-dahiya", "yogeshwar-dutt"] },
  { name: "Guru Hanuman Akhara", regionId: "delhi-nct", city: "New Delhi", sports: ["Wrestling"], type: "Private", description: "Historic Delhi akhara founded by legendary coach Guru Hanuman.", url: wiki("Guru_Hanuman_Akhara") },
  { name: "Reliance Foundation Young Champs", regionId: "maharashtra", city: "Navi Mumbai", sports: ["Football"], type: "Corporate", description: "Residential football academy for young players.", url: "https://www.reliancefoundation.org/" },
  { name: "Mary Kom Regional Boxing Foundation", regionId: "manipur", city: "Imphal", sports: ["Boxing"], type: "Private", description: "Boxing academy started by six-time world champion Mary Kom.", url: wiki("Mary_Kom"), alumni: ["mary-kom"] },
]

export function getAcademiesForRegion(regionId: string) {
  return ACADEMIES.filter((a) => a.regionId === regionId)
}

export function getAcademiesForSport(sport: string) {
  return ACADEMIES.filter((a) => a.sports.some((s) => s === sport || (sport.startsWith("Para ") && s === sport.slice(5))))
}

/** Steps for a young athlete, with official links. */
export const HOW_TO_START = [
  { title: "Start at school and district level", text: "Join your school team and district-level competitions. District sports officers and school games federations run the first trials." },
  { title: "Join the state association", text: "Register with your state's association for your sport. State championships are the route to national events and selection." },
  { title: "Khelo India and KIRTI talent hunts", text: "Khelo India Youth and University Games and the KIRTI talent identification programme spot young athletes across the country.", link: { label: "Khelo India", url: "https://kheloindia.gov.in/" } },
  { title: "SAI training centres", text: "The Sports Authority of India runs centres of excellence, training centres and Khelo India accredited academies, selecting athletes through trials.", link: { label: "Sports Authority of India", url: SAI } },
  { title: "Scholarships and support", text: "Selected Khelo India athletes receive yearly support for training plus an allowance. Elite athletes can be supported by the Target Olympic Podium Scheme (TOPS).", link: { label: "Khelo India scheme", url: "https://kheloindia.gov.in/" } },
  { title: "Jobs through sport", text: "Railways, the armed forces, police and public companies recruit athletes through sports quotas, giving a stable career while competing." },
]
