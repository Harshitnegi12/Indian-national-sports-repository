// Every Olympic medal won by India at the Summer Games, 1900 to Paris 2024 (41 medals).
// `athletes` are ids of profiles in this directory, when available.

export type Medal = "gold" | "silver" | "bronze"

export interface OlympicMedal {
  year: number
  city: string
  medal: Medal
  sport: string
  event: string
  winner: string
  athletes?: string[]
}

const HOCKEY = "Men's hockey team"

export const OLYMPIC_MEDALS: OlympicMedal[] = [
  { year: 1900, city: "Paris", medal: "silver", sport: "Athletics", event: "Men's 200 m", winner: "Norman Pritchard" },
  { year: 1900, city: "Paris", medal: "silver", sport: "Athletics", event: "Men's 200 m hurdles", winner: "Norman Pritchard" },
  { year: 1928, city: "Amsterdam", medal: "gold", sport: "Hockey", event: "Men's tournament", winner: HOCKEY, athletes: ["dhyan-chand", "jaipal-singh-munda"] },
  { year: 1932, city: "Los Angeles", medal: "gold", sport: "Hockey", event: "Men's tournament", winner: HOCKEY, athletes: ["dhyan-chand"] },
  { year: 1936, city: "Berlin", medal: "gold", sport: "Hockey", event: "Men's tournament", winner: HOCKEY, athletes: ["dhyan-chand"] },
  { year: 1948, city: "London", medal: "gold", sport: "Hockey", event: "Men's tournament", winner: HOCKEY, athletes: ["balbir-singh-sr"] },
  { year: 1952, city: "Helsinki", medal: "gold", sport: "Hockey", event: "Men's tournament", winner: HOCKEY, athletes: ["balbir-singh-sr"] },
  { year: 1952, city: "Helsinki", medal: "bronze", sport: "Wrestling", event: "Men's freestyle bantamweight", winner: "K. D. Jadhav", athletes: ["khashaba-dadasaheb-jadhav"] },
  { year: 1956, city: "Melbourne", medal: "gold", sport: "Hockey", event: "Men's tournament", winner: HOCKEY, athletes: ["balbir-singh-sr"] },
  { year: 1960, city: "Rome", medal: "silver", sport: "Hockey", event: "Men's tournament", winner: HOCKEY },
  { year: 1964, city: "Tokyo", medal: "gold", sport: "Hockey", event: "Men's tournament", winner: HOCKEY, athletes: ["charanjit-singh"] },
  { year: 1968, city: "Mexico City", medal: "bronze", sport: "Hockey", event: "Men's tournament", winner: HOCKEY },
  { year: 1972, city: "Munich", medal: "bronze", sport: "Hockey", event: "Men's tournament", winner: HOCKEY },
  { year: 1980, city: "Moscow", medal: "gold", sport: "Hockey", event: "Men's tournament", winner: HOCKEY, athletes: ["mohammed-shahid", "m-m-somaya", "sylvanus-dung-dung"] },
  { year: 1996, city: "Atlanta", medal: "bronze", sport: "Tennis", event: "Men's singles", winner: "Leander Paes", athletes: ["leander-paes"] },
  { year: 2000, city: "Sydney", medal: "bronze", sport: "Weightlifting", event: "Women's 69 kg", winner: "Karnam Malleswari", athletes: ["karnam-malleswari"] },
  { year: 2004, city: "Athens", medal: "silver", sport: "Shooting", event: "Men's double trap", winner: "Rajyavardhan Singh Rathore", athletes: ["rajyavardhan-singh-rathore"] },
  { year: 2008, city: "Beijing", medal: "gold", sport: "Shooting", event: "Men's 10 m air rifle", winner: "Abhinav Bindra", athletes: ["abhinav-bindra"] },
  { year: 2008, city: "Beijing", medal: "bronze", sport: "Wrestling", event: "Men's freestyle 66 kg", winner: "Sushil Kumar", athletes: ["sushil-kumar"] },
  { year: 2008, city: "Beijing", medal: "bronze", sport: "Boxing", event: "Men's middleweight", winner: "Vijender Singh", athletes: ["vijender-singh"] },
  { year: 2012, city: "London", medal: "silver", sport: "Shooting", event: "Men's 25 m rapid fire pistol", winner: "Vijay Kumar", athletes: ["vijay-kumar"] },
  { year: 2012, city: "London", medal: "silver", sport: "Wrestling", event: "Men's freestyle 66 kg", winner: "Sushil Kumar", athletes: ["sushil-kumar"] },
  { year: 2012, city: "London", medal: "bronze", sport: "Badminton", event: "Women's singles", winner: "Saina Nehwal", athletes: ["saina-nehwal"] },
  { year: 2012, city: "London", medal: "bronze", sport: "Boxing", event: "Women's flyweight", winner: "Mary Kom", athletes: ["mary-kom"] },
  { year: 2012, city: "London", medal: "bronze", sport: "Shooting", event: "Men's 10 m air rifle", winner: "Gagan Narang", athletes: ["gagan-narang"] },
  { year: 2012, city: "London", medal: "bronze", sport: "Wrestling", event: "Men's freestyle 60 kg", winner: "Yogeshwar Dutt", athletes: ["yogeshwar-dutt"] },
  { year: 2016, city: "Rio de Janeiro", medal: "silver", sport: "Badminton", event: "Women's singles", winner: "P. V. Sindhu", athletes: ["pv-sindhu"] },
  { year: 2016, city: "Rio de Janeiro", medal: "bronze", sport: "Wrestling", event: "Women's freestyle 58 kg", winner: "Sakshi Malik", athletes: ["sakshi-malik"] },
  { year: 2021, city: "Tokyo", medal: "gold", sport: "Athletics", event: "Men's javelin throw", winner: "Neeraj Chopra", athletes: ["neeraj-chopra"] },
  { year: 2021, city: "Tokyo", medal: "silver", sport: "Weightlifting", event: "Women's 49 kg", winner: "Mirabai Chanu", athletes: ["mirabai-chanu"] },
  { year: 2021, city: "Tokyo", medal: "silver", sport: "Wrestling", event: "Men's freestyle 57 kg", winner: "Ravi Kumar Dahiya", athletes: ["ravi-kumar-dahiya"] },
  { year: 2021, city: "Tokyo", medal: "bronze", sport: "Badminton", event: "Women's singles", winner: "P. V. Sindhu", athletes: ["pv-sindhu"] },
  { year: 2021, city: "Tokyo", medal: "bronze", sport: "Boxing", event: "Women's welterweight", winner: "Lovlina Borgohain", athletes: ["lovlina-borgohain"] },
  { year: 2021, city: "Tokyo", medal: "bronze", sport: "Wrestling", event: "Men's freestyle 65 kg", winner: "Bajrang Punia", athletes: ["bajrang-punia"] },
  { year: 2021, city: "Tokyo", medal: "bronze", sport: "Hockey", event: "Men's tournament", winner: HOCKEY, athletes: ["sreejesh-pr", "harmanpreet-singh", "manpreet-singh", "rupinder-pal-singh", "simranjeet-singh"] },
  { year: 2024, city: "Paris", medal: "silver", sport: "Athletics", event: "Men's javelin throw", winner: "Neeraj Chopra", athletes: ["neeraj-chopra"] },
  { year: 2024, city: "Paris", medal: "bronze", sport: "Shooting", event: "Women's 10 m air pistol", winner: "Manu Bhaker", athletes: ["manu-bhaker"] },
  { year: 2024, city: "Paris", medal: "bronze", sport: "Shooting", event: "Mixed team 10 m air pistol", winner: "Manu Bhaker & Sarabjot Singh", athletes: ["manu-bhaker", "sarabjot-singh"] },
  { year: 2024, city: "Paris", medal: "bronze", sport: "Shooting", event: "Men's 50 m rifle 3 positions", winner: "Swapnil Kusale", athletes: ["swapnil-kusale"] },
  { year: 2024, city: "Paris", medal: "bronze", sport: "Hockey", event: "Men's tournament", winner: HOCKEY, athletes: ["harmanpreet-singh", "sreejesh-pr", "hardik-singh"] },
  { year: 2024, city: "Paris", medal: "bronze", sport: "Wrestling", event: "Men's freestyle 57 kg", winner: "Aman Sehrawat", athletes: ["aman-sehrawat"] },
]
