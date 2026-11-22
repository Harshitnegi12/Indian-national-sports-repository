import type { AthleteRecord, AthleteTier } from "@/lib/athlete-data"

// Batch 1 of nationally known athletes, grouped by state/UT.
// Each row: [name, regionId, "Category · Event", hometown, "highlight | highlight", tier, wikipedia slug?]
// Tier codes: O Olympic medal, P Paralympic medal, W world champion / World Cup winner, I international, N national.
// Every row links to the athlete's Wikipedia biography, which cites the primary records;
// scripts/check-athlete-sources.js verifies each link resolves to the right person.

export type Row = [string, string, string, string, string, "O" | "P" | "W" | "I" | "N", string?]

const TIER: Record<Row[5], AthleteTier> = { O: "olympic-medal", P: "paralympic-medal", W: "world-champion", I: "international", N: "national" }

export const BATCH_1_ROWS: Row[] = [
  // ---------- Punjab ----------
  ["Abhinav Bindra", "punjab", "Shooting · 10 m air rifle", "Zirakpur, Mohali", "Beijing 2008 Olympic gold in the 10 m air rifle | India's first individual Olympic gold medallist", "O"],
  ["Balbir Singh Sr.", "punjab", "Hockey · Forward", "Haripur Khalsa, Jalandhar", "Olympic gold in 1948, 1952 and 1956 | Scored five goals in the 1952 Olympic final", "O"],
  ["Pargat Singh", "punjab", "Hockey · Defender", "Mithapur, Jalandhar", "Captained India at the 1992 and 1996 Olympics", "I"],
  ["Mandeep Singh", "punjab", "Hockey · Forward", "Mithapur, Jalandhar", "Tokyo 2020 Olympic bronze medal", "O", "Mandeep_Singh_(field_hockey)"],
  ["Hardik Singh", "punjab", "Hockey · Midfielder", "Khusropur, Jalandhar", "Olympic bronze at Tokyo 2020 and Paris 2024", "O", "Hardik_Singh"],
  ["Gurjant Singh", "punjab", "Hockey · Forward", "Amritsar", "Olympic bronze at Tokyo 2020 and Paris 2024", "O"],
  ["Shamsher Singh", "punjab", "Hockey · Forward", "Attari, Amritsar", "Olympic bronze at Tokyo 2020 and Paris 2024", "O", "Shamsher_Singh_(field_hockey)"],
  ["Rupinder Pal Singh", "punjab", "Hockey · Defender", "Faridkot", "Tokyo 2020 Olympic bronze medal | Penalty-corner specialist", "O"],
  ["Simranjeet Singh", "punjab", "Hockey · Forward", "", "Scored twice in the Tokyo 2020 bronze-medal match", "O", "Simranjeet_Singh_(field_hockey)"],
  ["Gurjit Kaur", "punjab", "Hockey · Defender", "Miadi Kalan, Amritsar", "Scored the winner against Australia in the Tokyo 2020 quarter-final", "I"],
  ["Harbhajan Singh", "punjab", "Cricket · Off-spinner", "Jalandhar", "Won the 2007 T20 World Cup and the 2011 World Cup | First Indian to take a Test hat-trick", "W"],
  ["Mohinder Amarnath", "punjab", "Cricket · All-rounder", "Patiala", "Player of the Match in the 1983 World Cup semi-final and final", "W"],
  ["Bishan Singh Bedi", "punjab", "Cricket · Left-arm spinner", "Amritsar", "Former India captain | 266 Test wickets", "I"],
  ["Shubman Gill", "punjab", "Cricket · Batter", "Fazilka", "Opening batter for India across formats", "I"],
  ["Arshdeep Singh", "punjab", "Cricket · Left-arm pacer", "Kharar, Mohali", "Joint leading wicket-taker as India won the 2024 T20 World Cup", "W"],
  ["Harmanpreet Kaur", "punjab", "Cricket · Batter", "Moga", "Captain of India's women's team | Scored 171 not out against Australia at the 2017 World Cup", "I"],
  ["Abhishek Sharma", "punjab", "Cricket · Opening batter", "Amritsar", "Attacking opener in India's T20 side", "I", "Abhishek_Sharma_(cricketer)"],
  ["Tajinderpal Singh Toor", "punjab", "Athletics · Shot put", "Khosa Pando, Moga", "Asian Games gold in 2018 and 2022", "I"],
  ["Kamalpreet Kaur", "punjab", "Athletics · Discus throw", "Kabarwala, Sri Muktsar Sahib", "Finished sixth in the Tokyo 2020 Olympic final", "I"],
  ["Heena Sidhu", "punjab", "Shooting · Pistol", "Patiala", "First Indian pistol shooter to reach world No. 1 | 2018 Commonwealth Games gold in the 25 m pistol", "I"],
  ["Arjun Babuta", "punjab", "Shooting · 10 m air rifle", "Jalalabad", "Fourth in the 10 m air rifle final at Paris 2024", "I"],
  ["Manavjit Singh Sandhu", "punjab", "Shooting · Trap", "", "Trap world champion in 2006", "W"],

  // ---------- Chandigarh ----------
  ["Milkha Singh", "chandigarh", "Athletics · 400 m", "Lived in Chandigarh", "400 m gold at the 1958 Commonwealth Games | Fourth in the 400 m at the 1960 Rome Olympics", "I"],
  ["Yuvraj Singh", "chandigarh", "Cricket · All-rounder", "Chandigarh", "Player of the Tournament as India won the 2011 World Cup | Hit six sixes in an over at the 2007 T20 World Cup", "W"],
  ["Anjum Moudgil", "chandigarh", "Shooting · 50 m rifle 3 positions", "Chandigarh", "Silver at the 2018 World Championships | Tokyo 2020 Olympian", "I"],

  // ---------- Haryana (additions) ----------
  ["Sarabjot Singh", "haryana", "Shooting · 10 m air pistol", "Dheen, Ambala", "Paris 2024 Olympic bronze in the mixed team 10 m air pistol with Manu Bhaker", "O"],
  ["Sanjeev Rajput", "haryana", "Shooting · 50 m rifle 3 positions", "Yamunanagar", "Gold at the 2018 Commonwealth Games", "I"],
  ["Deepak Punia", "haryana", "Wrestling · Freestyle", "Chhara, Jhajjar", "Silver at the 2019 World Championships", "I", "Deepak_Punia_(wrestler)"],
  ["Anshu Malik", "haryana", "Wrestling · Freestyle", "Nidani, Jind", "Silver at the 2021 World Championships", "I"],
  ["Sonam Malik", "haryana", "Wrestling · Freestyle", "Madina, Sonipat", "Tokyo 2020 Olympian | Two-time world cadet champion", "I"],
  ["Amit Panghal", "haryana", "Boxing · Flyweight", "Mayna, Rohtak", "Silver at the 2019 World Championships | Gold at the 2022 Commonwealth Games", "I"],
  ["Pooja Rani", "haryana", "Boxing · Middleweight", "Nimriwali, Bhiwani", "Asian champion in 2019 and 2021", "I", "Pooja_Rani"],
  ["Manish Kaushik", "haryana", "Boxing · Lightweight", "Bhiwani", "Silver at the 2018 Commonwealth Games | Tokyo 2020 Olympian", "I", "Manish_Kaushik_(boxer)"],
  ["Jaismine Lamboria", "haryana", "Boxing · Featherweight", "Bhiwani", "Bronze at the 2022 Commonwealth Games", "I"],
  ["Navneet Kaur", "haryana", "Hockey · Forward", "Shahabad Markanda, Kurukshetra", "Forward in the Indian team that finished fourth at Tokyo 2020", "I", "Navneet_Kaur_(field_hockey)"],
  ["Neha Goyal", "haryana", "Hockey · Midfielder", "Sonipat", "Played in India's fourth-placed side at Tokyo 2020", "I"],
  ["Monika Malik", "haryana", "Hockey · Midfielder", "Sonipat", "Rio 2016 and Tokyo 2020 Olympian", "I"],
  ["Sumit Nagal", "haryana", "Tennis · Singles", "Jhajjar", "India's top-ranked men's singles player | Played singles at Paris 2024", "I"],
  ["Anup Kumar", "haryana", "Kabaddi · Raider", "Palra, Gurgaon", "Captained India to the 2016 Kabaddi World Cup title", "W", "Anup_Kumar_(kabaddi)"],
  ["Surender Nada", "haryana", "Kabaddi · Defender", "Sonipat", "India kabaddi defender and Pro Kabaddi League regular", "N"],
  ["Mohit Sharma", "haryana", "Cricket · Pace bowler", "Ballabhgarh, Faridabad", "Played for India at the 2015 World Cup", "I", "Mohit_Sharma"],
  ["Navdeep Singh", "haryana", "Para athletics · Javelin F41", "Buana Lakhu, Panipat", "Paris 2024 Paralympic gold in javelin F41", "P", "Navdeep_Singh_(athlete)"],
  ["Nitesh Kumar", "haryana", "Para badminton · SL3", "Charkhi Dadri", "Paris 2024 Paralympic gold in men's singles SL3", "P", "Kumar_Nitesh"],
  ["Manish Narwal", "haryana", "Para shooting · Pistol", "Ballabhgarh, Faridabad", "Tokyo 2020 Paralympic gold | Paris 2024 Paralympic silver", "P"],
  ["Singhraj Adhana", "haryana", "Para shooting · Pistol", "Bahadurgarh, Faridabad", "Silver and bronze at the Tokyo 2020 Paralympics", "P"],
  ["Amit Kumar Saroha", "haryana", "Para athletics · Club throw F51", "Sonipat", "Asian Para Games gold in club throw", "I"],

  // ---------- Delhi ----------
  ["Sushil Kumar", "delhi-nct", "Wrestling · Freestyle", "Baprola, Delhi", "Olympic bronze at Beijing 2008 and silver at London 2012 | 2010 world champion", "O", "Sushil_Kumar_(wrestler)"],
  ["Virat Kohli", "delhi-nct", "Cricket · Batter", "Delhi", "Won the 2011 World Cup and the 2024 T20 World Cup | Most centuries in men's ODI cricket", "W"],
  ["Virender Sehwag", "delhi-nct", "Cricket · Opening batter", "Najafgarh, Delhi", "First Indian to score a Test triple century | Won the 2007 T20 World Cup and the 2011 World Cup", "W"],
  ["Gautam Gambhir", "delhi-nct", "Cricket · Opening batter", "Delhi", "Top scorer in the finals of the 2007 T20 World Cup and the 2011 World Cup", "W"],
  ["Ashish Nehra", "delhi-nct", "Cricket · Left-arm pacer", "Delhi", "Member of India's 2011 World Cup-winning squad", "W"],
  ["Ishant Sharma", "delhi-nct", "Cricket · Pace bowler", "Delhi", "More than 300 Test wickets for India", "I"],
  ["Shikhar Dhawan", "delhi-nct", "Cricket · Opening batter", "Delhi", "Player of the Tournament at the 2013 Champions Trophy", "I"],
  ["Tania Sachdev", "delhi-nct", "Chess · International Master", "Delhi", "Won gold with India's women's team at the 2024 Chess Olympiad", "I"],

  // ---------- Himachal Pradesh ----------
  ["Ajay Thakur", "himachal-pradesh", "Kabaddi · Raider", "Dabhota, Solan", "Star raider in India's 2016 Kabaddi World Cup win | Asian Games gold 2014", "W"],
  ["Charanjit Singh", "himachal-pradesh", "Hockey · Midfielder", "Una", "Captained India to Olympic gold at Tokyo 1964", "O", "Charanjit_Singh_(field_hockey)"],

  // ---------- Uttarakhand ----------
  ["Rishabh Pant", "uttarakhand", "Cricket · Wicketkeeper-batter", "Roorkee", "Won the 2024 T20 World Cup | Match-winning 89 not out at Brisbane in 2021", "W"],
  ["Jaspal Rana", "uttarakhand", "Shooting · Pistol", "Dehradun", "Asian Games gold in 1994 and 2006", "I"],
  ["Vandana Katariya", "uttarakhand", "Hockey · Forward", "Roshnabad, Haridwar", "First Indian woman to score an Olympic hat-trick (Tokyo 2020)", "I"],
  ["Manish Singh Rawat", "uttarakhand", "Athletics · 20 km race walk", "Chamoli", "Finished 13th in the 20 km walk at Rio 2016", "I"],
  ["Ekta Bisht", "uttarakhand", "Cricket · Left-arm spinner", "Almora", "Took 5 for 18 against Pakistan at the 2017 World Cup", "I"],

  // ---------- Uttar Pradesh ----------
  ["Dhyan Chand", "uttar-pradesh", "Hockey · Forward", "Prayagraj", "Olympic gold in 1928, 1932 and 1936 | India's National Sports Day marks his birthday", "O"],
  ["Mohammed Shahid", "uttar-pradesh", "Hockey · Forward", "Varanasi", "Moscow 1980 Olympic gold medal", "O", "Mohammed_Shahid"],
  ["Lalit Upadhyay", "uttar-pradesh", "Hockey · Forward", "Varanasi", "Olympic bronze at Tokyo 2020 and Paris 2024", "O"],
  ["Rajkumar Pal", "uttar-pradesh", "Hockey · Midfielder", "Karampur, Ghazipur", "Paris 2024 Olympic bronze medal", "O", "Raj_Kumar_Pal"],
  ["Suresh Raina", "uttar-pradesh", "Cricket · Batter", "Muradnagar, Ghaziabad", "Member of India's 2011 World Cup-winning team", "W"],
  ["Kuldeep Yadav", "uttar-pradesh", "Cricket · Left-arm wrist spinner", "Kanpur", "Won the 2024 T20 World Cup", "W"],
  ["Piyush Chawla", "uttar-pradesh", "Cricket · Leg-spinner", "Aligarh", "Member of India's 2007 T20 and 2011 World Cup-winning squads", "W"],
  ["RP Singh", "uttar-pradesh", "Cricket · Left-arm pacer", "Raebareli", "Took 12 wickets as India won the 2007 T20 World Cup", "W", "R._P._Singh"],
  ["Bhuvneshwar Kumar", "uttar-pradesh", "Cricket · Swing bowler", "Meerut", "Took five-wicket hauls in all three international formats", "I"],
  ["Mohammed Shami", "uttar-pradesh", "Cricket · Pace bowler", "Amroha", "Leading wicket-taker at the 2023 World Cup", "I"],
  ["Rinku Singh", "uttar-pradesh", "Cricket · Batter", "Aligarh", "Finisher in India's T20 side", "I", "Rinku_Singh_(cricketer)"],
  ["Sudha Singh", "uttar-pradesh", "Athletics · 3000 m steeplechase", "Raebareli", "Asian Games gold in the steeplechase in 2010", "I"],
  ["Priyanka Goswami", "uttar-pradesh", "Athletics · Race walk", "Muzaffarnagar", "Silver in the 10 km walk at the 2022 Commonwealth Games", "I"],
  ["Divya Kakran", "uttar-pradesh", "Wrestling · Freestyle", "Purbaliyan, Muzaffarnagar", "Bronze at the 2018 and 2022 Commonwealth Games", "I"],
  ["Saurabh Chaudhary", "uttar-pradesh", "Shooting · 10 m air pistol", "Kalina, Meerut", "Asian Games gold in 2018 at the age of 16", "I"],
  ["Shardul Vihan", "uttar-pradesh", "Shooting · Double trap", "Meerut", "Asian Games silver in 2018 at the age of 15", "I"],
  ["Rahul Chaudhari", "uttar-pradesh", "Kabaddi · Raider", "Bijnor", "One of the leading raiders in Pro Kabaddi League history", "N"],
  ["Praveen Kumar", "uttar-pradesh", "Para athletics · High jump T64", "Gautam Buddh Nagar", "Paris 2024 Paralympic gold | Tokyo 2020 Paralympic silver", "P", "Praveen_Kumar_(para-athlete,_born_2003)"],
  ["Ajeet Singh Yadav", "uttar-pradesh", "Para athletics · Javelin F46", "Etawah", "Paris 2024 Paralympic silver in javelin F46", "P"],
  ["Preeti Pal", "uttar-pradesh", "Para athletics · Sprint T35", "Meerut", "Two bronze medals (100 m and 200 m T35) at Paris 2024", "P", "Preethi_Pal"],

  // ---------- Bihar ----------
  ["Ishan Kishan", "bihar", "Cricket · Wicketkeeper-batter", "Patna", "Scored a 210 against Bangladesh in 2022, then the fastest ODI double century", "I"],
  ["Mukesh Kumar", "bihar", "Cricket · Pace bowler", "Gopalganj", "Represents India in all three formats", "I", "Mukesh_Kumar_(cricketer)"],
  ["Kirti Azad", "bihar", "Cricket · All-rounder", "Purnia", "Member of India's 1983 World Cup-winning squad", "W"],
  ["Vaibhav Suryavanshi", "bihar", "Cricket · Batter", "Samastipur", "Youngest centurion in IPL history (2025)", "N"],

  // ---------- Jharkhand ----------
  ["MS Dhoni", "jharkhand", "Cricket · Wicketkeeper-batter", "Ranchi", "Captained India to the 2007 T20 World Cup, 2011 World Cup and 2013 Champions Trophy", "W", "MS_Dhoni"],
  ["Jaipal Singh Munda", "jharkhand", "Hockey · Defender", "Takra, Khunti", "Captained India to Olympic gold at Amsterdam 1928", "O"],
  ["Salima Tete", "jharkhand", "Hockey · Midfielder", "Simdega", "Captain of the Indian women's hockey team | Tokyo 2020 Olympian", "I"],
  ["Nikki Pradhan", "jharkhand", "Hockey · Defender", "Khunti", "First woman hockey player from Jharkhand to play at the Olympics (Rio 2016)", "I"],
  ["Komalika Bari", "jharkhand", "Archery · Recurve", "Jamshedpur", "Under-18 world champion in 2019", "I"],
  ["Varun Aaron", "jharkhand", "Cricket · Pace bowler", "Jamshedpur", "Played Tests and ODIs for India", "I"],

  // ---------- Odisha ----------
  ["Dilip Tirkey", "odisha", "Hockey · Defender", "Sundargarh", "Played at three Olympics and captained India", "I"],
  ["Amit Rohidas", "odisha", "Hockey · Defender", "Sundargarh", "Olympic bronze at Tokyo 2020 and Paris 2024", "O"],
  ["Birendra Lakra", "odisha", "Hockey · Defender", "Sundargarh", "Tokyo 2020 Olympic bronze medal", "O"],
  ["Ignace Tirkey", "odisha", "Hockey · Defender", "Sundargarh", "Represented India in international hockey", "I"],
  ["Deep Grace Ekka", "odisha", "Hockey · Defender", "Sundargarh", "Rio 2016 and Tokyo 2020 Olympian", "I"],
  ["Namita Toppo", "odisha", "Hockey · Midfielder", "Sundargarh", "Rio 2016 and Tokyo 2020 Olympian", "I"],
  ["Lilima Minz", "odisha", "Hockey · Midfielder", "Sundargarh", "Played for India at Rio 2016", "I"],
  ["Srabani Nanda", "odisha", "Athletics · Sprint", "Kandhamal", "200 m at London 2012 and Rio 2016", "I"],
  ["Pramod Bhagat", "odisha", "Para badminton · SL3", "Bargarh", "Tokyo 2020 Paralympic gold in men's singles SL3", "P"],

  // ---------- West Bengal ----------
  ["Sourav Ganguly", "west-bengal", "Cricket · Batter", "Kolkata", "Captained India to the 2003 World Cup final", "I"],
  ["Jhulan Goswami", "west-bengal", "Cricket · Pace bowler", "Chakdaha, Nadia", "Most wickets in women's ODI cricket at her retirement", "I"],
  ["Wriddhiman Saha", "west-bengal", "Cricket · Wicketkeeper", "Siliguri", "Kept wicket in 40 Tests for India", "I"],
  ["Leander Paes", "west-bengal", "Tennis · Doubles", "Kolkata", "Atlanta 1996 Olympic bronze in singles | 18 Grand Slam doubles and mixed doubles titles", "O"],
  ["Saurav Ghosal", "west-bengal", "Squash · Singles", "Kolkata", "First Indian man in the squash world top 10 | Commonwealth Games bronze 2022", "I"],
  ["Chuni Goswami", "west-bengal", "Football · Forward", "Kolkata", "Captained India to Asian Games gold in 1962", "I"],
  ["P. K. Banerjee", "west-bengal", "Football · Forward", "Jalpaiguri", "Asian Games gold 1962 | Captained India at the 1960 Rome Olympics", "I", "P._K._Banerjee"],
  ["Sailen Manna", "west-bengal", "Football · Defender", "Howrah", "Captained India to Asian Games gold in 1951", "I"],
  ["Swapna Barman", "west-bengal", "Athletics · Heptathlon", "Jalpaiguri", "Asian Games gold in the heptathlon in 2018", "I"],
  ["Jyotirmoyee Sikdar", "west-bengal", "Athletics · Middle distance", "Nadia", "Asian Games gold in the 1500 m in 1998", "I"],
  ["Atanu Das", "west-bengal", "Archery · Recurve", "Kolkata", "Rio 2016 and Tokyo 2020 Olympian", "I"],
  ["Ankita Bhakat", "west-bengal", "Archery · Recurve", "Kolkata", "Paris 2024 Olympian", "I"],
  ["Ayhika Mukherjee", "west-bengal", "Table tennis · Singles", "Kolkata", "Asian Games bronze in women's doubles 2023", "I"],
  ["Achinta Sheuli", "west-bengal", "Weightlifting · 73 kg", "Deulpur, Howrah", "Gold at the 2022 Commonwealth Games", "I"],
  ["Mihir Sen", "west-bengal", "Swimming · Open water", "Purulia", "First Indian to swim the English Channel (1958)", "I"],
  ["Arati Saha", "west-bengal", "Swimming · Open water", "Kolkata", "First Asian woman to swim the English Channel (1959)", "I"],
  ["Pranati Nayak", "west-bengal", "Gymnastics · Artistic", "Paschim Medinipur", "Asian Championships bronze in vault 2019 | Tokyo 2020 Olympian", "I"],
  ["Surya Shekhar Ganguly", "west-bengal", "Chess · Grandmaster", "Kolkata", "Six-time national champion", "I"],

  // ---------- Assam ----------
  ["Shiva Thapa", "assam", "Boxing · Bantamweight", "Guwahati", "Boxed at London 2012 and Rio 2016 | Six Asian Championships medals", "I"],
  ["Riyan Parag", "assam", "Cricket · All-rounder", "Guwahati", "Plays for India in T20 internationals", "I"],
  ["Bhogeswar Baruah", "assam", "Athletics · 800 m", "", "Asian Games gold in the 800 m in 1966", "I"],
  ["Jayanta Talukdar", "assam", "Archery · Recurve", "", "London 2012 Olympian | Former world No. 3", "I"],
  ["Somdev Devvarman", "assam", "Tennis · Singles", "Guwahati", "Asian Games gold in men's singles 2010", "I"],
  ["Ankushita Boro", "assam", "Boxing · Lightweight", "Sonitpur", "Youth world champion in 2017", "I"],
  ["Ashmita Chaliha", "assam", "Badminton · Singles", "Guwahati", "Represents India in women's singles", "I"],

  // ---------- Manipur ----------
  ["Dingko Singh", "manipur", "Boxing · Bantamweight", "Sekta, Imphal East", "Asian Games gold in 1998", "I"],
  ["Laishram Sarita Devi", "manipur", "Boxing · Lightweight", "Imphal", "World champion in 2006", "W"],
  ["Kunjarani Devi", "manipur", "Weightlifting · 48 kg", "Imphal", "Seven World Championships silver medals", "I"],
  ["Sanjita Chanu", "manipur", "Weightlifting · 53 kg", "Kakching", "Commonwealth Games gold in 2014 and 2018", "I"],
  ["Ngangom Bala Devi", "manipur", "Football · Forward", "Imphal", "First Indian woman to sign for a European top-flight club (Rangers, 2020)", "I"],
  ["Oinam Bembem Devi", "manipur", "Football · Midfielder", "Imphal", "Long-time captain of the Indian women's team", "I"],
  ["Jeakson Singh", "manipur", "Football · Midfielder", "Haokha Mamang, Thoubal", "Scored India's first goal at a FIFA World Cup (U-17, 2017)", "I", "Jeakson_Singh_Thounaojam"],
  ["Sushila Chanu", "manipur", "Hockey · Midfielder", "Imphal", "Captained India at the Rio 2016 Olympics", "I", "Sushila_Chanu_Pukhrambam"],
  ["Nilakanta Sharma", "manipur", "Hockey · Midfielder", "Imphal", "Tokyo 2020 Olympic bronze medal", "O"],
  ["Chinglensana Singh", "manipur", "Hockey · Midfielder", "Imphal", "Asian Games gold in 2014", "I", "Chinglensana_Singh_Kangujam"],
  ["Devendro Singh", "manipur", "Boxing · Light flyweight", "Imphal", "Reached the quarter-finals at London 2012", "I", "Devendro_Singh"],

  // ---------- Mizoram ----------
  ["Jeremy Lalrinnunga", "mizoram", "Weightlifting · 67 kg", "Aizawl", "Youth Olympic gold in 2018 | Commonwealth Games gold in 2022", "I"],
  ["Jeje Lalpekhlua", "mizoram", "Football · Striker", "Hnahthial", "Among India's all-time top international goalscorers", "I"],
  ["Lalrindika Ralte", "mizoram", "Football · Midfielder", "Aizawl", "Played for India and in the Indian Super League", "I"],
  ["Shylo Malsawmtluanga", "mizoram", "Football · Midfielder", "Aizawl", "Represented India in international football", "I"],

  // ---------- Sikkim ----------
  ["Bhaichung Bhutia", "sikkim", "Football · Striker", "Tinkitam", "Former India captain and first Indian to win 100 caps", "I"],

  // ---------- Goa ----------
  ["Brahmanand Sankhwalkar", "goa", "Football · Goalkeeper", "Taleigao", "Captained India and won the Arjuna Award", "I"],
  ["Bruno Coutinho", "goa", "Football · Forward", "Goa", "Former India captain and Arjuna Award winner", "I", "Bruno_Coutinho_(footballer,_born_1969)"],
  ["Climax Lawrence", "goa", "Football · Midfielder", "Goa", "Over 70 caps for India", "I"],
  ["Dilip Sardesai", "goa", "Cricket · Batter", "Margao", "First Goan-born Test cricketer | Key batter in India's 1971 series wins", "I"],
  ["Leon Mendonca", "goa", "Chess · Grandmaster", "Goa", "Became a grandmaster at the age of 14", "I"],

  // ---------- Gujarat ----------
  ["Jasprit Bumrah", "gujarat", "Cricket · Pace bowler", "Ahmedabad", "Player of the Tournament as India won the 2024 T20 World Cup", "W"],
  ["Hardik Pandya", "gujarat", "Cricket · All-rounder", "Surat", "Bowled the final over as India won the 2024 T20 World Cup", "W"],
  ["Axar Patel", "gujarat", "Cricket · All-rounder", "Nadiad", "Won the 2024 T20 World Cup", "W"],
  ["Ravindra Jadeja", "gujarat", "Cricket · All-rounder", "Navagam-Ghed, Jamnagar", "Won the 2013 Champions Trophy and the 2024 T20 World Cup", "W"],
  ["Cheteshwar Pujara", "gujarat", "Cricket · Batter", "Rajkot", "Over 7,000 Test runs for India", "I"],
  ["Irfan Pathan", "gujarat", "Cricket · All-rounder", "Vadodara", "Player of the Match in the 2007 T20 World Cup final", "W"],
  ["Yusuf Pathan", "gujarat", "Cricket · All-rounder", "Vadodara", "Won the 2007 T20 World Cup and the 2011 World Cup", "W"],
  ["Parthiv Patel", "gujarat", "Cricket · Wicketkeeper", "Ahmedabad", "Youngest wicketkeeper to play Test cricket (2002)", "I"],
  ["Sarita Gayakwad", "gujarat", "Athletics · 400 m", "Dang", "Asian Games gold in the 4x400 m relay in 2018", "I"],
  ["Elavenil Valarivan", "gujarat", "Shooting · 10 m air rifle", "Ahmedabad", "ISSF World Cup gold in 2019 | Paris 2024 Olympian", "I"],
  ["Manav Thakkar", "gujarat", "Table tennis · Singles", "Surat", "Paris 2024 Olympian", "I"],
  ["Maana Patel", "gujarat", "Swimming · Backstroke", "Ahmedabad", "Tokyo 2020 Olympian", "I"],
  ["Ankita Raina", "gujarat", "Tennis · Singles", "Ahmedabad", "Asian Games bronze in women's singles 2018", "I"],

  // ---------- Rajasthan ----------
  ["Rajyavardhan Singh Rathore", "rajasthan", "Shooting · Double trap", "Jaisalmer", "Athens 2004 Olympic silver in double trap", "O"],
  ["Devendra Jhajharia", "rajasthan", "Para athletics · Javelin F46", "Churu", "Paralympic gold in 2004 and 2016, silver in 2020", "P"],
  ["Sundar Singh Gurjar", "rajasthan", "Para athletics · Javelin F46", "Karauli", "Tokyo 2020 Paralympic bronze", "P"],
  ["Krishna Nagar", "rajasthan", "Para badminton · SH6", "Jaipur", "Tokyo 2020 Paralympic gold in men's singles SH6", "P", "Krishna_Nagar_(para-badminton)"],
  ["Mona Agarwal", "rajasthan", "Para shooting · 10 m air rifle", "Sikar", "Paris 2024 Paralympic bronze", "P"],
  ["Apurvi Chandela", "rajasthan", "Shooting · 10 m air rifle", "Jaipur", "Commonwealth Games gold in 2014 | ISSF World Cup gold 2019", "I"],
  ["Limba Ram", "rajasthan", "Archery · Recurve", "Udaipur", "Asian champion in 1992 | Three-time Olympian", "I"],
  ["Ravi Bishnoi", "rajasthan", "Cricket · Leg-spinner", "Jodhpur", "Reached No. 1 in the ICC T20I bowling rankings", "I"],
  ["Khaleel Ahmed", "rajasthan", "Cricket · Left-arm pacer", "Tonk", "Represents India in white-ball cricket", "I"],

  // ---------- Maharashtra ----------
  ["Sachin Tendulkar", "maharashtra", "Cricket · Batter", "Mumbai", "Most runs and centuries in international cricket | Won the 2011 World Cup", "W"],
  ["Sunil Gavaskar", "maharashtra", "Cricket · Opening batter", "Mumbai", "First batter to score 10,000 Test runs | Won the 1983 World Cup", "W"],
  ["Rohit Sharma", "maharashtra", "Cricket · Opening batter", "Nagpur", "Captained India to the 2024 T20 World Cup | Three ODI double centuries", "W"],
  ["Suryakumar Yadav", "maharashtra", "Cricket · Batter", "Mumbai", "Took the decisive catch in the 2024 T20 World Cup final", "W"],
  ["Ajinkya Rahane", "maharashtra", "Cricket · Batter", "Ashwi Khurd, Ahmednagar", "Captained India to the 2021 Test series win in Australia", "I"],
  ["Smriti Mandhana", "maharashtra", "Cricket · Opening batter", "Sangli", "ICC Women's Cricketer of the Year 2018 and 2021", "I"],
  ["Jemimah Rodrigues", "maharashtra", "Cricket · Batter", "Mumbai", "Key batter in India's women's team", "I"],
  ["Dhanraj Pillay", "maharashtra", "Hockey · Forward", "Khadki, Pune", "Played at four Olympics and four World Cups", "I"],
  ["Khashaba Dadasaheb Jadhav", "maharashtra", "Wrestling · Freestyle", "Goleshwar, Satara", "Helsinki 1952 Olympic bronze, independent India's first individual Olympic medal", "O"],
  ["Swapnil Kusale", "maharashtra", "Shooting · 50 m rifle 3 positions", "Kambalwadi, Kolhapur", "Paris 2024 Olympic bronze medal", "O"],
  ["Tejaswini Sawant", "maharashtra", "Shooting · 50 m rifle prone", "Kolhapur", "World champion in 50 m rifle prone (2010)", "W"],
  ["Anjali Bhagwat", "maharashtra", "Shooting · 10 m air rifle", "Mumbai", "Former world No. 1 in 10 m air rifle", "I"],
  ["Lalita Babar", "maharashtra", "Athletics · 3000 m steeplechase", "Mohi, Satara", "Reached the steeplechase final at Rio 2016", "I"],
  ["Avinash Sable", "maharashtra", "Athletics · 3000 m steeplechase", "Mandwa, Beed", "Asian Games gold in 2023 | Commonwealth Games silver 2022", "I"],
  ["Kavita Raut", "maharashtra", "Athletics · 10,000 m", "Nashik", "Commonwealth Games bronze in 2010", "I"],
  ["Aditi Gopichand Swami", "maharashtra", "Archery · Compound", "Satara", "Senior world champion in 2023 at the age of 17", "W", "Aditi_Swami"],
  ["Ojas Deotale", "maharashtra", "Archery · Compound", "Nagpur", "World champion in men's compound in 2023", "W"],
  ["Pravin Jadhav", "maharashtra", "Archery · Recurve", "Sarade, Satara", "Tokyo 2020 and Paris 2024 Olympian", "I"],
  ["Divya Deshmukh", "maharashtra", "Chess · Grandmaster", "Nagpur", "Won the 2025 FIDE Women's World Cup", "W"],
  ["Vidit Gujrathi", "maharashtra", "Chess · Grandmaster", "Nashik", "Won gold with India at the 2024 Chess Olympiad", "I"],
  ["Chirag Shetty", "maharashtra", "Badminton · Doubles", "Mumbai", "Asian Games gold in men's doubles 2023 with Satwiksairaj Rankireddy", "I"],
  ["Sachin Khilari", "maharashtra", "Para athletics · Shot put F46", "Sangli", "Paris 2024 Paralympic silver", "P"],
  ["Virdhawal Khade", "maharashtra", "Swimming · Freestyle", "Kolhapur", "Asian Games bronze in 2010 | Beijing 2008 Olympian", "I"],

  // ---------- Karnataka ----------
  ["Prakash Padukone", "karnataka", "Badminton · Singles", "Bengaluru", "All England champion in 1980 | World Championships bronze 1983", "I"],
  ["Anil Kumble", "karnataka", "Cricket · Leg-spinner", "Bengaluru", "619 Test wickets | Took all 10 wickets in a Test innings (1999)", "I"],
  ["Rahul Dravid", "karnataka", "Cricket · Batter", "Bengaluru", "Over 13,000 Test runs | Coached India to the 2024 T20 World Cup", "W"],
  ["Javagal Srinath", "karnataka", "Cricket · Pace bowler", "Mysuru", "Over 300 ODI wickets for India", "I"],
  ["Roger Binny", "karnataka", "Cricket · All-rounder", "Bengaluru", "Leading wicket-taker as India won the 1983 World Cup", "W"],
  ["KL Rahul", "karnataka", "Cricket · Batter", "Mangaluru", "Centuries in all three formats for India", "I", "KL_Rahul"],
  ["Rohan Bopanna", "karnataka", "Tennis · Doubles", "Madikeri, Kodagu", "Won the 2024 Australian Open men's doubles | Oldest first-time world No. 1", "I"],
  ["Ashwini Akkunji", "karnataka", "Athletics · 400 m hurdles", "Siddapura, Udupi", "Commonwealth and Asian Games gold in the 4x400 m relay (2010)", "I"],
  ["Srihari Nataraj", "karnataka", "Swimming · Backstroke", "Bengaluru", "Tokyo 2020 Olympian", "I"],
  ["Dhinidhi Desinghu", "karnataka", "Swimming · Freestyle", "Bengaluru", "Swam at Paris 2024 at the age of 14", "I"],
  ["Girisha Nagarajegowda", "karnataka", "Para athletics · High jump", "Hassan", "London 2012 Paralympic silver", "P", "H._N._Girisha"],
  ["Suhas Lalinakere Yathiraj", "karnataka", "Para badminton · SL4", "Shivamogga", "Paralympic silver at Tokyo 2020 and Paris 2024", "P", "Suhas_Lalinakere_Yathiraj"],

  // ---------- Kerala ----------
  ["P. T. Usha", "kerala", "Athletics · 400 m hurdles", "Payyoli, Kozhikode", "Fourth in the 400 m hurdles at Los Angeles 1984 | Multiple Asian Games golds", "I"],
  ["Anju Bobby George", "kerala", "Athletics · Long jump", "Changanassery", "Bronze at the 2003 World Championships, India's first world athletics medal", "I"],
  ["Shiny Wilson", "kerala", "Athletics · 800 m", "Thodupuzha", "Asian Championships gold in the 800 m (1985) | Four-time Olympian", "I"],
  ["K. M. Beenamol", "kerala", "Athletics · 800 m", "Idukki", "Asian Games gold in the 800 m in 2002", "I"],
  ["Jinson Johnson", "kerala", "Athletics · 1500 m", "Chakkittapara, Kozhikode", "Asian Games gold in the 1500 m in 2018", "I"],
  ["Muhammed Anas", "kerala", "Athletics · 400 m", "Nilamel, Kollam", "Former national record holder in the 400 m | Olympian at Rio 2016 and Tokyo 2020", "I", "Muhammed_Anas_Yahiya"],
  ["Eldhose Paul", "kerala", "Athletics · Triple jump", "Ernakulam", "Commonwealth Games gold in the triple jump in 2022", "I"],
  ["Abdulla Aboobacker", "kerala", "Athletics · Triple jump", "Kozhikode", "Commonwealth Games silver in the triple jump in 2022", "I"],
  ["Murali Sreeshankar", "kerala", "Athletics · Long jump", "Palakkad", "Commonwealth Games silver in 2022 | Asian Games silver in 2023", "I"],
  ["S. Sreesanth", "kerala", "Cricket · Pace bowler", "Kothamangalam", "Took the final catch of the 2007 T20 World Cup | Won the 2011 World Cup", "W", "Sreesanth"],
  ["Sanju Samson", "kerala", "Cricket · Wicketkeeper-batter", "Thiruvananthapuram", "Scored back-to-back T20I centuries in 2024", "I"],
  ["I. M. Vijayan", "kerala", "Football · Forward", "Thrissur", "Among India's best-known strikers of the 1990s", "I"],
  ["Sahal Abdul Samad", "kerala", "Football · Midfielder", "Payyanur", "Plays for India and in the Indian Super League", "I"],
  ["H. S. Prannoy", "kerala", "Badminton · Singles", "Thiruvananthapuram", "World Championships bronze in 2023 | Thomas Cup gold 2022", "I"],
  ["Jimmy George", "kerala", "Volleyball · Spiker", "Peravoor, Kannur", "Played professionally in Italy and won the Arjuna Award", "I"],
  ["Nihal Sarin", "kerala", "Chess · Grandmaster", "Thrissur", "Shared India's 2020 Online Chess Olympiad gold | Grandmaster at 14", "I"],

  // ---------- Tamil Nadu ----------
  ["Viswanathan Anand", "tamil-nadu", "Chess · Grandmaster", "Chennai", "Five-time world chess champion | India's first grandmaster", "W"],
  ["Gukesh Dommaraju", "tamil-nadu", "Chess · Grandmaster", "Chennai", "World chess champion in 2024, the youngest ever", "W", "Gukesh_Dommaraju"],
  ["R Praggnanandhaa", "tamil-nadu", "Chess · Grandmaster", "Chennai", "Runner-up at the 2023 Chess World Cup", "I", "Praggnanandhaa_Rameshbabu"],
  ["Vaishali Rameshbabu", "tamil-nadu", "Chess · Grandmaster", "Chennai", "Won team gold at the 2024 Chess Olympiad", "I"],
  ["Sharath Kamal", "tamil-nadu", "Table tennis · Singles", "Chennai", "Commonwealth Games gold in men's singles 2006 and 2022", "I", "Sharath_Kamal"],
  ["Sathiyan Gnanasekaran", "tamil-nadu", "Table tennis · Singles", "Chennai", "Commonwealth Games gold in the men's team event (2018, 2022)", "I"],
  ["Dipika Pallikal", "tamil-nadu", "Squash · Singles", "Chennai", "First Indian woman in the squash world top 10 | Commonwealth Games gold 2022 (mixed doubles)", "I", "Dipika_Pallikal_Karthik"],
  ["Joshna Chinappa", "tamil-nadu", "Squash · Singles", "Chennai", "Commonwealth Games gold in women's doubles 2014", "I"],
  ["Ravichandran Ashwin", "tamil-nadu", "Cricket · Off-spinner", "Chennai", "Over 500 Test wickets | Won the 2011 World Cup", "W"],
  ["Dinesh Karthik", "tamil-nadu", "Cricket · Wicketkeeper-batter", "Chennai", "Won the 2007 T20 World Cup", "W"],
  ["Krishnamachari Srikkanth", "tamil-nadu", "Cricket · Opening batter", "Chennai", "Top scorer in the 1983 World Cup final", "W"],
  ["Washington Sundar", "tamil-nadu", "Cricket · All-rounder", "Chennai", "Played a key role in the 2021 Gabba Test win", "I"],
  ["Mariyappan Thangavelu", "tamil-nadu", "Para athletics · High jump T63", "Periyavadagampatti, Salem", "Paralympic gold in 2016, silver in 2020 and bronze in 2024", "P"],
  ["Thulasimathi Murugesan", "tamil-nadu", "Para badminton · SU5", "Kanchipuram", "Paris 2024 Paralympic silver", "P"],
  ["Nithya Sre Sivan", "tamil-nadu", "Para badminton · SH6", "Hosur", "Paris 2024 Paralympic bronze", "P"],
  ["Manisha Ramadass", "tamil-nadu", "Para badminton · SU5", "", "Paris 2024 Paralympic bronze", "P"],
  ["Vithya Ramraj", "tamil-nadu", "Athletics · 400 m hurdles", "Coimbatore", "Equalled P. T. Usha's national 400 m hurdles record in 2023", "I"],
  ["Ramanathan Krishnan", "tamil-nadu", "Tennis · Singles", "Chennai", "Reached the Wimbledon semi-finals in 1960 and 1961", "I"],
  ["Vijay Amritraj", "tamil-nadu", "Tennis · Singles", "Chennai", "Led India to the Davis Cup final in 1974 and 1987", "I"],

  // ---------- Telangana ----------
  ["Sania Mirza", "telangana", "Tennis · Doubles", "Hyderabad", "Six Grand Slam titles | Former women's doubles world No. 1", "I"],
  ["Nikhat Zareen", "telangana", "Boxing · Flyweight", "Nizamabad", "World champion in 2022 and 2023", "W"],
  ["Gagan Narang", "telangana", "Shooting · 10 m air rifle", "Hyderabad", "London 2012 Olympic bronze medal", "O"],
  ["Esha Singh", "telangana", "Shooting · Pistol", "Hyderabad", "Asian Games team gold in 2023", "I", "Esha_Singh"],
  ["Mithali Raj", "telangana", "Cricket · Batter", "Hyderabad", "Leading run-scorer in women's international cricket", "I"],
  ["V. V. S. Laxman", "telangana", "Cricket · Batter", "Hyderabad", "Scored 281 against Australia at Kolkata in 2001", "I"],
  ["Mohammad Azharuddin", "telangana", "Cricket · Batter", "Hyderabad", "Captained India at three World Cups", "I"],
  ["Mohammed Siraj", "telangana", "Cricket · Pace bowler", "Hyderabad", "Won the 2024 T20 World Cup", "W"],
  ["Tilak Varma", "telangana", "Cricket · Batter", "Hyderabad", "Scored back-to-back T20I centuries in 2024", "I"],
  ["Deepthi Jeevanji", "telangana", "Para athletics · 400 m T20", "Warangal", "World champion in 2024 | Paris 2024 Paralympic bronze", "P"],
  ["Arjun Erigaisi", "telangana", "Chess · Grandmaster", "Warangal", "Won individual and team gold at the 2024 Chess Olympiad", "I"],

  // ---------- Andhra Pradesh ----------
  ["Karnam Malleswari", "andhra-pradesh", "Weightlifting · 69 kg", "Voosavanipeta, Srikakulam", "Sydney 2000 Olympic bronze, India's first Olympic medal by a woman", "O"],
  ["Pullela Gopichand", "andhra-pradesh", "Badminton · Singles", "Nagandla, Prakasam", "All England champion in 2001 | Chief national badminton coach", "I"],
  ["Kidambi Srikanth", "andhra-pradesh", "Badminton · Singles", "Guntur", "Former world No. 1 | World Championships silver 2021", "I"],
  ["Satwiksairaj Rankireddy", "andhra-pradesh", "Badminton · Doubles", "Amalapuram", "Asian Games gold in men's doubles 2023 | Former world No. 1 pair", "I"],
  ["Koneru Humpy", "andhra-pradesh", "Chess · Grandmaster", "Gudivada", "Women's World Rapid champion in 2019 and 2024", "W"],
  ["Harika Dronavalli", "andhra-pradesh", "Chess · Grandmaster", "Guntur", "Three Women's World Championship bronze medals | 2024 Olympiad team gold", "I"],
  ["Pentala Harikrishna", "andhra-pradesh", "Chess · Grandmaster", "Guntur", "Won team gold at the 2024 Chess Olympiad", "I"],
  ["Jyothi Yarraji", "andhra-pradesh", "Athletics · 100 m hurdles", "Visakhapatnam", "Asian champion in 2023 | Paris 2024 Olympian", "I"],
  ["Jyothi Surekha Vennam", "andhra-pradesh", "Archery · Compound", "Vijayawada", "Three golds at the 2023 Asian Games", "I"],
  ["Dhiraj Bommadevara", "andhra-pradesh", "Archery · Recurve", "Vijayawada", "Paris 2024 Olympian", "I"],
  ["Ambati Rayudu", "andhra-pradesh", "Cricket · Batter", "Guntur", "Played 55 ODIs for India", "I"],
  ["Nitish Kumar Reddy", "andhra-pradesh", "Cricket · All-rounder", "Visakhapatnam", "Scored a Test century at Melbourne in 2024", "I"],

  // ---------- Madhya Pradesh ----------
  ["Aslam Sher Khan", "madhya-pradesh", "Hockey · Defender", "Bhopal", "Member of India's 1975 World Cup-winning team", "W"],
  ["Aishwary Pratap Singh Tomar", "madhya-pradesh", "Shooting · 50 m rifle 3 positions", "Khargone", "Asian Games team gold in 2023 | Tokyo 2020 Olympian", "I"],
  ["Rubina Francis", "madhya-pradesh", "Para shooting · 10 m air pistol", "Jabalpur", "Paris 2024 Paralympic bronze", "P"],
  ["Venkatesh Iyer", "madhya-pradesh", "Cricket · All-rounder", "Indore", "Represents India in white-ball cricket", "I"],
  ["Avesh Khan", "madhya-pradesh", "Cricket · Pace bowler", "Indore", "Represents India in white-ball cricket", "I"],

  // ---------- Chhattisgarh ----------
  ["Saba Anjum", "chhattisgarh", "Hockey · Forward", "Durg", "Former captain of the Indian women's hockey team", "I", "Saba_Anjum_Karim"],

  // ---------- Jammu and Kashmir ----------
  ["Parvez Rasool", "jammu-kashmir", "Cricket · All-rounder", "Bijbehara, Anantnag", "First cricketer from Jammu and Kashmir to play for India", "I"],
  ["Umran Malik", "jammu-kashmir", "Cricket · Pace bowler", "Jammu", "Among India's fastest bowlers", "I"],
  ["Mehrajuddin Wadoo", "jammu-kashmir", "Football · Defender", "Srinagar", "Played for India and top Indian clubs", "I"],
  ["Sheetal Devi", "jammu-kashmir", "Para archery · Compound", "Loidhar, Kishtwar", "Paris 2024 Paralympic bronze in the mixed team compound", "P"],
  ["Rakesh Kumar", "jammu-kashmir", "Para archery · Compound", "Katra", "Paris 2024 Paralympic bronze in the mixed team compound", "P", "Rakesh_Kumar_(archer)"],
]

function slugify(name: string) {
  return name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export function rowsToAthletes(rows: Row[]): AthleteRecord[] {
  return rows.map(([name, regionId, sport, hometown, highlights, tier, wiki]) => {
  const slug = wiki ?? name.replace(/ /g, "_")
  const category = sport.split("·")[0].trim()
  return {
    id: slugify(name),
    name,
    regionId,
    sport,
    hometown: hometown || undefined,
    summary: `${category} athlete${hometown && !hometown.startsWith("Lived") ? ` from ${hometown}` : ""}.`,
    highlights: highlights.split(" | "),
    sources: [{ label: "Wikipedia biography", url: "https://en.wikipedia.org/wiki/" + encodeURI(slug) }],
    tier: TIER[tier],
  }
})
}

export const BATCH_1_ATHLETES: AthleteRecord[] = rowsToAthletes(BATCH_1_ROWS)
