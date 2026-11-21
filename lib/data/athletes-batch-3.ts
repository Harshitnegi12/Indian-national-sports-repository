import type { AthleteRecord } from "@/lib/athlete-data"
import { rowsToAthletes, type Row } from "@/lib/data/athletes-batch-1"

// Batch 3: more depth for mid-sized states. Same row format as batch 1.
export const BATCH_3_ROWS: Row[] = [
  // Assam
  ["Amlan Borgohain", "assam", "Athletics · Sprint", "Jorhat", "Set national records in the 100 m and 200 m", "I"],

  // Himachal Pradesh
  ["Aanchal Thakur", "himachal-pradesh", "Alpine skiing · Slalom", "Manali", "First Indian to win an international skiing medal (2018)", "I"],

  // Telangana
  ["N. Sikki Reddy", "telangana", "Badminton · Doubles", "Hyderabad", "Commonwealth Games gold in the mixed team event 2018", "I"],
  ["Agasara Nandini", "telangana", "Athletics · Heptathlon", "Hyderabad", "Asian Games bronze in the heptathlon in 2023", "I"],

  // Karnataka
  ["Gundappa Viswanath", "karnataka", "Cricket · Batter", "Bhadravati", "One of India's leading Test batters of the 1970s", "I"],
  ["E. A. S. Prasanna", "karnataka", "Cricket · Off-spinner", "Bengaluru", "Part of India's famed spin quartet | 189 Test wickets", "I", "Erapalli_Prasanna"],
  ["B. S. Chandrasekhar", "karnataka", "Cricket · Leg-spinner", "Mysuru", "Took 6 for 38 to win the 1971 Oval Test", "I", "B._S._Chandrasekhar"],
  ["Syed Kirmani", "karnataka", "Cricket · Wicketkeeper", "Bengaluru", "Kept wicket as India won the 1983 World Cup", "W"],
  ["Robin Uthappa", "karnataka", "Cricket · Batter", "Kodagu", "Won the 2007 T20 World Cup", "W"],
  ["M. M. Somaya", "karnataka", "Hockey · Midfielder", "Kodagu", "Moscow 1980 Olympic gold medal", "O", "M._M._Somaya"],
  ["B. P. Govinda", "karnataka", "Hockey · Forward", "Kodagu", "Member of India's 1975 World Cup-winning team", "W", "B._P._Govinda"],

  // Kerala
  ["Preeja Sreedharan", "kerala", "Athletics · 10,000 m", "Idukki", "Asian Games gold in the 10,000 m in 2010", "I"],
  ["Mayookha Johny", "kerala", "Athletics · Triple jump", "Thrissur", "Asian Championships gold in the triple jump in 2011", "I"],
  ["Sajan Prakash", "kerala", "Swimming · Butterfly", "Idukki", "Rio 2016 and Tokyo 2020 Olympian", "I"],

  // Tamil Nadu
  ["Murali Vijay", "tamil-nadu", "Cricket · Opening batter", "Chennai", "Over 3,900 Test runs for India", "I"],
  ["T. Natarajan", "tamil-nadu", "Cricket · Left-arm pacer", "Chinnappampatti, Salem", "Debuted in all three formats on the 2020–21 Australia tour", "I", "T._Natarajan"],
  ["S. Vijayalakshmi", "tamil-nadu", "Chess · International Master", "Chennai", "First Indian woman to earn the International Master title", "I", "Subbaraman_Vijayalakshmi"],
  ["Krishnan Sasikiran", "tamil-nadu", "Chess · Grandmaster", "Chennai", "Multiple-time national champion and Olympiad medallist", "I"],

  // Odisha
  ["Prabodh Tirkey", "odisha", "Hockey · Midfielder", "Sundargarh", "Former captain of the Indian men's hockey team", "I"],
  ["Sunita Lakra", "odisha", "Hockey · Defender", "Sundargarh", "Played for India at the Rio 2016 Olympics", "I"],

  // West Bengal
  ["Dibyendu Barua", "west-bengal", "Chess · Grandmaster", "Kolkata", "India's second grandmaster (1991)", "I"],
  ["Pankaj Roy", "west-bengal", "Cricket · Opening batter", "Kolkata", "Shared a world-record opening stand of 413 in 1956", "I"],
  ["Richa Ghosh", "west-bengal", "Cricket · Wicketkeeper-batter", "Siliguri", "Wicketkeeper-batter for India's women's team", "I"],
  ["Soumyajit Ghosh", "west-bengal", "Table tennis · Singles", "Siliguri", "London 2012 Olympian", "I"],

  // Jharkhand
  ["Sylvanus Dung Dung", "jharkhand", "Hockey · Defender", "Khunti", "Moscow 1980 Olympic gold medal", "O"],
  ["Saurabh Tiwary", "jharkhand", "Cricket · Batter", "Jamshedpur", "Played ODIs for India in 2010", "I"],

  // Madhya Pradesh
  ["Narendra Hirwani", "madhya-pradesh", "Cricket · Leg-spinner", "Indore", "Took 16 wickets on Test debut in 1988", "I"],

  // Uttarakhand
  ["Anirudh Thapa", "uttarakhand", "Football · Midfielder", "Dehradun", "Midfielder for India and in the Indian Super League", "I"],
]

export const BATCH_3_ATHLETES: AthleteRecord[] = rowsToAthletes(BATCH_3_ROWS)
