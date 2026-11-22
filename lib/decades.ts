import { ATHLETES, compareAthletes, type AthleteRecord } from "@/lib/athlete-data"
import { getAthleteProfile } from "@/lib/athlete-profiles"

// Indian sport decade by decade since independence. Heroes are placed in the decade they turned 25,
// using birth years from Wikidata.

export interface Decade {
  slug: string
  label: string
  start: number
  title: string
  intro: string
  events: { year: number; text: string }[]
}

export const DECADES: Decade[] = [
  { slug: "1940s", label: "1940s", start: 1940, title: "A new nation takes the field", intro: "Months after independence, India won hockey gold at London 1948, the first Olympic title as a free nation.", events: [{ year: 1948, text: "Hockey gold at the London Olympics" }, { year: 1948, text: "India's first Test series in Australia" }] },
  { slug: "1950s", label: "1950s", start: 1950, title: "Golden years of hockey and football", intro: "Hockey gold at Helsinki and Melbourne, K. D. Jadhav's wrestling bronze and Asian Games football gold made the 1950s a decade of firsts.", events: [{ year: 1951, text: "First Asian Games in New Delhi; football gold" }, { year: 1952, text: "K. D. Jadhav wins wrestling bronze at Helsinki" }, { year: 1952, text: "First Test cricket win, against England in Madras" }, { year: 1956, text: "Football semi-final at the Melbourne Olympics" }, { year: 1958, text: "Milkha Singh wins Commonwealth Games gold" }] },
  { slug: "1960s", label: "1960s", start: 1960, title: "Milkha's Rome and hockey's revival", intro: "Milkha Singh's fourth place at Rome 1960 became a legend, and the hockey team won back Olympic gold in Tokyo 1964.", events: [{ year: 1960, text: "Milkha Singh fourth in the 400 m at Rome" }, { year: 1962, text: "Asian Games football gold in Jakarta" }, { year: 1964, text: "Hockey gold at the Tokyo Olympics" }, { year: 1966, text: "Davis Cup final" }] },
  { slug: "1970s", label: "1970s", start: 1970, title: "World Cup hockey and the spin quartet", intro: "India won the 1975 Hockey World Cup, and a famous spin quartet led overseas Test wins.", events: [{ year: 1971, text: "Test series wins in the West Indies and England" }, { year: 1972, text: "Murlikant Petkar wins India's first Paralympic gold" }, { year: 1975, text: "Hockey World Cup champions" }] },
  { slug: "1980s", label: "1980s", start: 1980, title: "Kapil's Devils and P. T. Usha", intro: "The 1983 cricket World Cup win changed Indian sport. Moscow 1980 brought an eighth hockey gold, and P. T. Usha came within a hundredth of a second of an Olympic medal.", events: [{ year: 1980, text: "Hockey gold at the Moscow Olympics" }, { year: 1980, text: "Prakash Padukone wins the All England title" }, { year: 1982, text: "New Delhi hosts the Asian Games" }, { year: 1983, text: "Cricket World Cup champions" }, { year: 1984, text: "P. T. Usha fourth in the 400 m hurdles" }, { year: 1988, text: "Viswanathan Anand becomes India's first grandmaster" }] },
  { slug: "1990s", label: "1990s", start: 1990, title: "Tendulkar's era and Paes's bronze", intro: "Sachin Tendulkar became the face of a cricket boom, and Leander Paes ended a 44-year wait for an individual Olympic medal.", events: [{ year: 1990, text: "Kabaddi's first Asian Games gold" }, { year: 1996, text: "Leander Paes wins Olympic bronze in Atlanta" }, { year: 1999, text: "Paes and Bhupathi win Wimbledon doubles" }] },
  { slug: "2000s", label: "2000s", start: 2000, title: "First women's medal, first gold", intro: "Karnam Malleswari became the first Indian woman to win an Olympic medal, and Abhinav Bindra won India's first individual Olympic gold.", events: [{ year: 2000, text: "Karnam Malleswari's weightlifting bronze in Sydney" }, { year: 2000, text: "Viswanathan Anand's first world chess title" }, { year: 2003, text: "Anju Bobby George's World Championships bronze" }, { year: 2004, text: "Rajyavardhan Singh Rathore's silver in Athens" }, { year: 2007, text: "First T20 World Cup title" }, { year: 2008, text: "Abhinav Bindra's gold in Beijing" }] },
  { slug: "2010s", label: "2010s", start: 2010, title: "Home World Cup and a medal rush", intro: "India won the 2011 cricket World Cup at home, hosted the 2010 Commonwealth Games and won six medals at London 2012.", events: [{ year: 2010, text: "Delhi hosts the Commonwealth Games" }, { year: 2011, text: "Cricket World Cup win in Mumbai" }, { year: 2012, text: "Six medals at the London Olympics" }, { year: 2014, text: "Pro Kabaddi League launched" }, { year: 2016, text: "P. V. Sindhu and Sakshi Malik win medals in Rio" }] },
  { slug: "2020s", label: "2020s", start: 2020, title: "Neeraj, Paris and a chess world champion", intro: "Neeraj Chopra won India's first Olympic athletics gold, para athletes won record medal hauls, and Gukesh became world chess champion.", events: [{ year: 2021, text: "Seven medals at Tokyo 2020, including Neeraj Chopra's gold" }, { year: 2021, text: "19 medals at the Tokyo Paralympics" }, { year: 2022, text: "Thomas Cup badminton champions" }, { year: 2024, text: "Manu Bhaker's two medals in Paris; 29 Paralympic medals" }, { year: 2024, text: "T20 World Cup title and double Chess Olympiad gold" }, { year: 2024, text: "Gukesh Dommaraju becomes world chess champion" }] },
]

export function getDecade(slug: string) {
  return DECADES.find((d) => d.slug === slug)
}

export function getDecadeHeroes(decade: Decade, limit = 24): AthleteRecord[] {
  return ATHLETES.filter((a) => {
    const born = getAthleteProfile(a.id)?.born
    const year = born ? Number(born.slice(0, 4)) : NaN
    return year && year + 25 >= decade.start && year + 25 < decade.start + 10
  })
    .sort(compareAthletes)
    .slice(0, limit)
}
