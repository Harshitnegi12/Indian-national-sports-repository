import type { AthleteRecord } from "@/lib/athlete-data"
import { rowsToAthletes, type Row } from "@/lib/data/athletes-batch-1"

// Batch 2: fills in smaller states and adds depth to major sports. Same row format as batch 1.
export const BATCH_2_ROWS: Row[] = [
  // Himachal Pradesh
  ["Vijay Kumar", "himachal-pradesh", "Shooting · 25 m rapid fire pistol", "Hamirpur", "London 2012 Olympic silver in the 25 m rapid fire pistol", "O", "Vijay_Kumar_(sport_shooter)"],
  ["Renuka Singh Thakur", "himachal-pradesh", "Cricket · Pace bowler", "Rohru, Shimla", "Commonwealth Games silver with India's women's team in 2022", "I"],
  ["Sushma Verma", "himachal-pradesh", "Cricket · Wicketkeeper", "Shimla", "Kept wicket for India at the 2017 Women's World Cup", "I"],
  ["Ashish Kumar Chaudhary", "himachal-pradesh", "Boxing · Light heavyweight", "Sundernagar, Mandi", "Tokyo 2020 Olympian | Asian Championships silver 2019", "I", "Ashish_Kumar_(boxer)"],
  ["Rishi Dhawan", "himachal-pradesh", "Cricket · All-rounder", "Mandi", "Played ODIs and T20Is for India in 2016", "I"],

  // Chhattisgarh
  ["Renuka Yadav", "chhattisgarh", "Hockey · Midfielder", "Rajnandgaon", "Played for India at the Rio 2016 Olympics", "I"],

  // Nagaland
  ["Hokato Hotozhe Sema", "nagaland", "Para athletics · Shot put F57", "Dimapur", "Paris 2024 Paralympic bronze in shot put F57", "P"],

  // Sikkim
  ["Sanju Pradhan", "sikkim", "Football · Winger", "", "Represented India in international football", "I"],

  // Goa
  ["Samir Naik", "goa", "Football · Defender", "Goa", "Former India defender with over 50 caps", "I"],
  ["Mahesh Gawli", "goa", "Football · Defender", "Goa", "Long-serving India centre-back", "I"],
  ["Romeo Fernandes", "goa", "Football · Winger", "Goa", "Represented India and played in Brazil's Serie A", "I"],
  ["Mandar Rao Dessai", "goa", "Football · Left-back", "Goa", "Represented India and won the Indian Super League", "I"],
  ["Brandon Fernandes", "goa", "Football · Midfielder", "Goa", "Represented India in international football", "I"],

  // Bihar
  ["Shahbaz Nadeem", "bihar", "Cricket · Left-arm spinner", "Muzaffarpur", "Played Test cricket for India", "I"],

  // Mizoram
  ["Lalengmawia Ralte", "mizoram", "Football · Midfielder", "Aizawl", "Midfielder for India, known as Apuia", "I"],

  // Punjab
  ["Sukhjeet Singh", "punjab", "Hockey · Forward", "Jalandhar", "Paris 2024 Olympic bronze medal", "O", "Sukhjeet_Singh"],
  ["Jarmanpreet Singh", "punjab", "Hockey · Defender", "Amritsar", "Paris 2024 Olympic bronze medal", "O"],
  ["Harmilan Bains", "punjab", "Athletics · Middle distance", "Mahilpur, Hoshiarpur", "Asian Games silver in the 800 m and 1500 m in 2023", "I"],

  // Haryana
  ["Navdeep Saini", "haryana", "Cricket · Pace bowler", "Karnal", "Played all three formats for India", "I"],

  // Delhi
  ["Unmukt Chand", "delhi-nct", "Cricket · Batter", "Delhi", "Captained India to the 2012 Under-19 World Cup title, scoring a century in the final", "N"],

  // Karnataka
  ["Arjun Halappa", "karnataka", "Hockey · Forward", "Kodagu", "Former captain of the Indian men's hockey team", "I"],
  ["S. V. Sunil", "karnataka", "Hockey · Forward", "Somwarpet, Kodagu", "Asian Games gold in 2014 | Two-time Olympian", "I", "S._V._Sunil"],
  ["Ashwini Nachappa", "karnataka", "Athletics · Sprint", "Kodagu", "Asian Championships medallist in the 1980s", "I"],

  // Kerala
  ["Anas Edathodika", "kerala", "Football · Defender", "Kondotty, Malappuram", "Centre-back for India at the 2019 Asian Cup", "I"],
  ["Ashique Kuruniyan", "kerala", "Football · Winger", "Malappuram", "Represented India at the 2019 Asian Cup", "I"],

  // Tamil Nadu
  ["Arokia Rajiv", "tamil-nadu", "Athletics · 400 m", "Tiruchirappalli", "Relay runner at Rio 2016 and Tokyo 2020", "I"],

  // Maharashtra
  ["Prithvi Shaw", "maharashtra", "Cricket · Opening batter", "Thane", "Scored a century on Test debut (2018) | Won the 2018 Under-19 World Cup as captain", "I"],
  ["Shardul Thakur", "maharashtra", "Cricket · All-rounder", "Palghar", "Key innings and wickets in the 2021 Gabba Test win", "I"],
  ["Wasim Jaffer", "maharashtra", "Cricket · Opening batter", "Mumbai", "Highest run-scorer in Ranji Trophy history", "I"],
  ["Ruturaj Gaikwad", "maharashtra", "Cricket · Opening batter", "Pune", "Captained India to Asian Games gold in 2023", "I"],

  // Madhya Pradesh
  ["Kapil Parmar", "madhya-pradesh", "Para judo · J1", "Sehore", "Paris 2024 Paralympic bronze, India's first Paralympic judo medal", "P"],

  // Odisha
  ["Debashish Mohanty", "odisha", "Cricket · Pace bowler", "Bhubaneswar", "Played Tests and ODIs for India between 1997 and 2001", "I"],

  // Manipur
  ["Bombayla Devi Laishram", "manipur", "Archery · Recurve", "Imphal", "Three-time Olympian (2012, 2016, 2020)", "I"],
  ["Sushila Likmabam", "manipur", "Judo · 48 kg", "Imphal", "Commonwealth Games silver in 2014 | Tokyo 2020 Olympian", "I"],

  // Gujarat
  ["Munaf Patel", "gujarat", "Cricket · Pace bowler", "Ikhar, Bharuch", "Member of India's 2011 World Cup-winning team", "W"],
  ["Krunal Pandya", "gujarat", "Cricket · All-rounder", "Ahmedabad", "Fastest ODI fifty on debut (2021)", "I"],

  // Rajasthan
  ["Divyansh Singh Panwar", "rajasthan", "Shooting · 10 m air rifle", "Jaipur", "ISSF World Cup gold in 2019 | Tokyo 2020 Olympian", "I"],
]

export const BATCH_2_ATHLETES: AthleteRecord[] = rowsToAthletes(BATCH_2_ROWS)
