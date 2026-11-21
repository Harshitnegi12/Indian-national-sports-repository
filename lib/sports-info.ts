// Short editorial guides for each sport: history in India, basic rules and governing bodies.

export interface SportInfo {
  name: string
  tagline: string
  history: string[]
  rules: string[]
  milestones: string[]
  bodies: { label: string; url: string }[]
}

export const SPORTS_INFO: Record<string, SportInfo> = {
  Cricket: {
    name: "Cricket",
    tagline: "India's most followed sport, from the 1932 Test debut to three World Cup titles.",
    history: [
      "India played its first Test match at Lord's in 1932 and won its first Test in 1952 against England in Madras.",
      "Kapil Dev's side won the 1983 World Cup, a turning point that made cricket a national obsession. India later won the 2007 T20 World Cup, the 2011 World Cup at home and the 2024 T20 World Cup.",
      "The Indian Premier League, launched in 2008, made India the commercial centre of the game.",
    ],
    rules: [
      "Two teams of eleven take turns to bat and bowl; the side with more runs wins.",
      "Formats: Test matches (up to five days), One Day Internationals (50 overs a side) and T20 (20 overs a side).",
      "A batter is out by being bowled, caught, run out, stumped, leg before wicket (LBW) and a few rarer ways.",
      "An over is six legal deliveries; a boundary scores four, or six if it clears the rope on the full.",
    ],
    milestones: ["1932: First Test", "1983: World Cup champions", "2007: First T20 World Cup", "2011: World Cup at home", "2024: T20 World Cup"],
    bodies: [{ label: "BCCI", url: "https://www.bcci.tv/" }, { label: "ICC", url: "https://www.icc-cricket.com/" }],
  },
  Hockey: {
    name: "Hockey",
    tagline: "Eight Olympic golds, more than any other nation.",
    history: [
      "India won Olympic gold in field hockey six times in a row from 1928 to 1956, led by legends such as Dhyan Chand and Balbir Singh Sr., and again in 1964 and 1980.",
      "India won the Hockey World Cup in 1975. The switch to artificial turf in the 1970s changed the game, and India rebuilt over the following decades.",
      "The men's team returned to the Olympic podium with bronze at Tokyo 2020 and again at Paris 2024, while the women's team reached the Tokyo semi-finals.",
    ],
    rules: [
      "Two teams of eleven, including a goalkeeper, play four 15-minute quarters.",
      "The ball may only be played with the flat side of the stick, and goals must be struck from inside the shooting circle.",
      "Penalty corners and penalty strokes are awarded for fouls in or around the circle.",
    ],
    milestones: ["1928: First Olympic gold", "1975: World Cup champions", "1980: Eighth Olympic gold", "2021: Tokyo 2020 bronze", "2024: Paris 2024 bronze"],
    bodies: [{ label: "Hockey India", url: "https://hockeyindia.org/" }, { label: "FIH", url: "https://www.fih.hockey/" }],
  },
  Football: {
    name: "Football",
    tagline: "Asian Games champions in 1951 and 1962, with deep roots in Bengal, Goa, Kerala and the North-East.",
    history: [
      "Football has been played in India since the 19th century; Mohun Bagan's 1911 IFA Shield win over a British side is a landmark of the sport's history.",
      "India won Asian Games gold in 1951 and 1962 and reached the semi-finals of the 1956 Olympics, a golden era under coach Syed Abdul Rahim.",
      "Today the Indian Super League and I-League run the domestic game, and the North-East, Goa, Kerala and West Bengal produce many internationals.",
    ],
    rules: ["Two teams of eleven play two 45-minute halves.", "Only the goalkeeper may handle the ball, inside their own penalty area.", "Offside, fouls and handballs are punished with free kicks or penalties."],
    milestones: ["1911: Mohun Bagan's IFA Shield win", "1951: Asian Games gold", "1956: Olympic semi-final", "1962: Asian Games gold"],
    bodies: [{ label: "AIFF", url: "https://www.the-aiff.com/" }, { label: "FIFA", url: "https://www.fifa.com/" }],
  },
  Athletics: {
    name: "Athletics",
    tagline: "From Milkha Singh and P. T. Usha to Neeraj Chopra's Olympic gold.",
    history: [
      "Milkha Singh's fourth place in the 400 m at Rome 1960 and P. T. Usha's fourth in the 400 m hurdles at Los Angeles 1984 were famous near-misses.",
      "Anju Bobby George won India's first World Championships medal (long jump bronze, 2003).",
      "Neeraj Chopra's javelin gold at Tokyo 2020 was India's first Olympic medal in athletics, followed by world gold in 2023 and Olympic silver in 2024.",
    ],
    rules: ["Track events are races over set distances; field events measure throws and jumps.", "Fouls (stepping over the line or leaving the sector) void an attempt.", "Combined events such as the heptathlon score points across several disciplines."],
    milestones: ["1958: Milkha Singh's Commonwealth gold", "1984: P. T. Usha's Olympic final", "2003: First World Championships medal", "2021: First Olympic gold (Neeraj Chopra)"],
    bodies: [{ label: "Athletics Federation of India", url: "https://indianathletics.in/" }, { label: "World Athletics", url: "https://worldathletics.org/" }],
  },
  Wrestling: {
    name: "Wrestling",
    tagline: "From the akhada to the Olympic podium.",
    history: [
      "Traditional kushti in akhadas has a long history in North India. K. D. Jadhav won independent India's first individual Olympic medal, a bronze at Helsinki 1952.",
      "Sushil Kumar won bronze in 2008 and silver in 2012, starting a run of Olympic medals that includes Yogeshwar Dutt, Sakshi Malik, Ravi Dahiya, Bajrang Punia and Aman Sehrawat.",
    ],
    rules: ["Bouts are two three-minute periods in freestyle and Greco-Roman styles.", "Points come from takedowns, exposures and pushouts; a fall (pin) ends the bout.", "Greco-Roman forbids holds below the waist."],
    milestones: ["1952: K. D. Jadhav's bronze", "2008: Sushil Kumar's bronze", "2012: Sushil Kumar's silver", "2016: Sakshi Malik's bronze", "2024: Aman Sehrawat's bronze"],
    bodies: [{ label: "Wrestling Federation of India", url: "https://wrestlingfederationofindia.org/" }, { label: "United World Wrestling", url: "https://uww.org/" }],
  },
  Boxing: {
    name: "Boxing",
    tagline: "Bhiwani, Manipur and a line of world champions.",
    history: [
      "Vijender Singh's bronze at Beijing 2008 was India's first Olympic boxing medal. Mary Kom (London 2012) and Lovlina Borgohain (Tokyo 2020) followed.",
      "Mary Kom won six world titles; Nikhat Zareen and Nitu Ghanghas are among India's recent world champions.",
    ],
    rules: ["Bouts are three rounds of three minutes.", "Judges score clean punches to the front of the head and body.", "Boxers compete in weight categories."],
    milestones: ["2008: First Olympic medal (Vijender Singh)", "2012: Mary Kom's bronze", "2021: Lovlina Borgohain's bronze"],
    bodies: [{ label: "Boxing Federation of India", url: "https://boxingfederation.in/" }, { label: "World Boxing", url: "https://worldboxing.org/" }],
  },
  Shooting: {
    name: "Shooting",
    tagline: "India's first individual Olympic gold.",
    history: [
      "Rajyavardhan Singh Rathore's double trap silver at Athens 2004 began India's modern Olympic shooting story, and Abhinav Bindra won gold in the 10 m air rifle at Beijing 2008.",
      "Manu Bhaker won two bronze medals at Paris 2024, the first Indian to win two medals at one Games.",
    ],
    rules: ["Disciplines are rifle, pistol and shotgun (trap and skeet).", "Scores are based on the rings hit on the target, with decimal scoring in finals.", "Finals use elimination formats."],
    milestones: ["2004: Rathore's silver", "2008: Bindra's gold", "2012: Narang and Vijay Kumar medals", "2024: Bhaker's two bronzes"],
    bodies: [{ label: "NRAI", url: "https://nrai.org.in/" }, { label: "ISSF", url: "https://www.issf-sports.org/" }],
  },
  Badminton: {
    name: "Badminton",
    tagline: "All England champions and Olympic medallists.",
    history: [
      "Prakash Padukone won the All England title in 1980 and Pullela Gopichand in 2001.",
      "Saina Nehwal won bronze at London 2012 and P. V. Sindhu won silver in 2016 and bronze in 2020. India won the Thomas Cup in 2022.",
    ],
    rules: ["Matches are best of three games to 21 points.", "A point is scored on every rally.", "Events are singles, doubles and mixed doubles."],
    milestones: ["1980: Padukone's All England title", "2012: Saina Nehwal's bronze", "2016: Sindhu's silver", "2022: Thomas Cup win"],
    bodies: [{ label: "Badminton Association of India", url: "https://www.badmintonindia.org/" }, { label: "BWF", url: "https://bwfbadminton.com/" }],
  },
  Tennis: {
    name: "Tennis",
    tagline: "Davis Cup finals and Grand Slam doubles champions.",
    history: [
      "Ramanathan Krishnan reached two Wimbledon semi-finals, and India reached the Davis Cup final in 1966, 1974 and 1987.",
      "Leander Paes won bronze at Atlanta 1996, and with Mahesh Bhupathi, Sania Mirza and Rohan Bopanna India collected many Grand Slam doubles titles.",
    ],
    rules: ["Matches are best of three or five sets.", "Games are scored 15, 30, 40 and game; a set is won by six games with a two-game margin.", "Tie-breaks decide sets at six games all."],
    milestones: ["1996: Paes's Olympic bronze", "1999: Paes and Bhupathi's Wimbledon title", "2024: Bopanna's Australian Open title"],
    bodies: [{ label: "AITA", url: "https://www.aitatennis.com/" }, { label: "ITF", url: "https://www.itftennis.com/" }],
  },
  "Table tennis": {
    name: "Table tennis",
    tagline: "Commonwealth champions and rising Olympic contenders.",
    history: ["Sharath Kamal won Commonwealth Games singles gold in 2006 and 2022, and Manika Batra won four medals at the 2018 Commonwealth Games.", "Bhavina Patel won Paralympic silver at Tokyo 2020."],
    rules: ["Games are played to 11 points, matches best of five or seven.", "Players serve two points each in turn.", "The ball must bounce once on each side."],
    milestones: ["2006: Sharath Kamal's Commonwealth gold", "2018: Manika Batra's Commonwealth golds"],
    bodies: [{ label: "TTFI", url: "https://www.ttfi.org/" }, { label: "ITTF", url: "https://www.ittf.com/" }],
  },
  Chess: {
    name: "Chess",
    tagline: "The game's birthplace and home of world champions.",
    history: [
      "Chess traces its roots to chaturanga in ancient India. Viswanathan Anand became India's first grandmaster in 1988 and won five world titles.",
      "India now has more than 80 grandmasters. Gukesh Dommaraju became the youngest world champion in 2024, and India won both Olympiad golds in 2024.",
    ],
    rules: ["Each player starts with 16 pieces; the aim is to checkmate the opponent's king.", "Games can be classical, rapid or blitz depending on the time control.", "A draw can come from stalemate, repetition or agreement."],
    milestones: ["1988: Anand becomes India's first GM", "2000: Anand's first world title", "2024: Gukesh world champion and double Olympiad gold"],
    bodies: [{ label: "All India Chess Federation", url: "https://aicf.in/" }, { label: "FIDE", url: "https://www.fide.com/" }],
  },
  Archery: {
    name: "Archery",
    tagline: "World Cup champions and Paralympic medallists.",
    history: ["Limba Ram became Asian champion in 1992. Deepika Kumari reached world No. 1 in recurve.", "India's compound archers won world titles in 2023, and Harvinder Singh won Paralympic gold at Paris 2024."],
    rules: ["Recurve (Olympic) and compound bows shoot at 70 m and 50 m targets respectively.", "The target has ten scoring rings.", "Matches use set or cumulative scoring."],
    milestones: ["1992: Limba Ram's Asian title", "2023: Compound world champions", "2024: Harvinder Singh's Paralympic gold"],
    bodies: [{ label: "Archery Association of India", url: "https://www.indianarchery.info/" }, { label: "World Archery", url: "https://www.worldarchery.sport/" }],
  },
  Weightlifting: {
    name: "Weightlifting",
    tagline: "India's first women's Olympic medal.",
    history: ["Karnam Malleswari won bronze at Sydney 2000, the first Olympic medal by an Indian woman.", "Mirabai Chanu won silver at Tokyo 2020, India's first medal of those Games."],
    rules: ["Lifters get three attempts each at the snatch and the clean and jerk.", "The total of the best lifts decides the result.", "Competition is by bodyweight category."],
    milestones: ["2000: Malleswari's bronze", "2021: Mirabai Chanu's silver"],
    bodies: [{ label: "Indian Weightlifting Federation", url: "https://indianweightlifting.com/" }, { label: "IWF", url: "https://iwf.sport/" }],
  },
  Kabaddi: {
    name: "Kabaddi",
    tagline: "A home-grown sport that India has dominated.",
    history: ["Kabaddi is an ancient Indian contact sport. India won every men's Asian Games gold from 1990 to 2014 and again in 2023.", "The Pro Kabaddi League, launched in 2014, turned stars such as Pardeep Narwal and Anup Kumar into household names."],
    rules: ["Two teams of seven take turns to send a raider into the opponent's half.", "The raider scores by touching defenders and returning without being tackled, within 30 seconds.", "Defenders score by stopping the raider."],
    milestones: ["1990: First Asian Games gold", "2014: Pro Kabaddi League launched", "2016: Kabaddi World Cup win"],
    bodies: [{ label: "AKFI", url: "https://www.indiankabaddi.org/" }],
  },
  Swimming: {
    name: "Swimming",
    tagline: "Channel crossers and Olympic qualifiers.",
    history: ["Mihir Sen crossed the English Channel in 1958 and Arati Saha became the first Asian woman to do so in 1959.", "Sajan Prakash and Srihari Nataraj became the first Indians to achieve Olympic 'A' qualifying times in 2021."],
    rules: ["Strokes are freestyle, backstroke, breaststroke and butterfly, plus medley.", "False starts lead to disqualification.", "Races run from 50 m to 1500 m in the pool."],
    milestones: ["1958: Mihir Sen's Channel swim", "2021: First Olympic 'A' cuts"],
    bodies: [{ label: "Swimming Federation of India", url: "https://swimming.org.in/" }, { label: "World Aquatics", url: "https://www.worldaquatics.com/" }],
  },
  Volleyball: {
    name: "Volleyball",
    tagline: "Kerala's favourite indoor game.",
    history: ["India won bronze at the 1958 and 1986 Asian Games. Jimmy George became the first Indian to play professionally in Italy."],
    rules: ["Teams of six; a rally is won by grounding the ball in the opponent's court.", "Each team gets up to three touches.", "Matches are best of five sets to 25 points."],
    milestones: ["1958: Asian Games bronze", "1986: Asian Games bronze"],
    bodies: [{ label: "FIVB", url: "https://www.fivb.com/" }],
  },
  Basketball: {
    name: "Basketball",
    tagline: "A fast-growing game in Punjab, Tamil Nadu and beyond.",
    history: ["India played at the 1980 Moscow Olympics. Satnam Singh became the first Indian drafted by an NBA team in 2015."],
    rules: ["Teams of five play four quarters.", "Baskets score two or three points, free throws one.", "The shot clock is 24 seconds."],
    milestones: ["1980: Olympic appearance", "2015: First Indian NBA draft pick"],
    bodies: [{ label: "FIBA", url: "https://www.fiba.basketball/" }],
  },
  Squash: {
    name: "Squash",
    tagline: "Commonwealth gold and world top-ten players.",
    history: ["Dipika Pallikal and Joshna Chinappa won Commonwealth Games gold in women's doubles in 2014. Saurav Ghosal reached the world top ten."],
    rules: ["Played in a four-walled court; the ball must hit the front wall above the tin.", "Games go to 11 points, matches are best of five."],
    milestones: ["2014: Commonwealth Games doubles gold", "2022: Commonwealth Games medals"],
    bodies: [{ label: "Squash Rackets Federation of India", url: "https://www.indiasquash.com/" }],
  },
  Gymnastics: {
    name: "Gymnastics",
    tagline: "Dipa Karmakar's Produnova and beyond.",
    history: ["Dipa Karmakar became the first Indian female gymnast at an Olympics and finished fourth in the vault at Rio 2016."],
    rules: ["Artistic gymnastics includes vault, bars, beam and floor for women and six apparatus for men.", "Scores combine difficulty and execution."],
    milestones: ["2014: Dipa Karmakar's Commonwealth bronze", "2016: Fourth at Rio 2016"],
    bodies: [{ label: "FIG", url: "https://www.gymnastics.sport/" }],
  },
  Judo: {
    name: "Judo",
    tagline: "Commonwealth medallists and Paralympic history.",
    history: ["Sushila Likmabam won Commonwealth silver in 2014. Kapil Parmar won India's first Paralympic judo medal at Paris 2024."],
    rules: ["Athletes score by throwing or holding the opponent down.", "An ippon (full point) wins the contest."],
    milestones: ["2014: Commonwealth silver", "2024: First Paralympic judo medal"],
    bodies: [{ label: "IJF", url: "https://www.ijf.org/" }],
  },
  "Para sports": {
    name: "Para sports",
    tagline: "India's most successful Paralympic era.",
    history: ["Murlikant Petkar won India's first Paralympic gold in swimming in 1972. Devendra Jhajharia won javelin gold in 2004 and 2016.", "India won 19 medals at Tokyo 2020 and 29 at Paris 2024, its best ever."],
    rules: ["Athletes compete in classes based on their impairment so that competition is fair.", "Most Olympic sports have a Paralympic version, such as para athletics, para shooting and para badminton."],
    milestones: ["1972: First Paralympic gold", "2016: Four medals at Rio", "2021: 19 medals at Tokyo", "2024: 29 medals at Paris"],
    bodies: [{ label: "Paralympic Committee of India", url: "https://www.paralympicindia.org.in/" }, { label: "IPC", url: "https://www.paralympic.org/" }],
  },
}

export function getSportInfo(sport: string): SportInfo | undefined {
  if (SPORTS_INFO[sport]) return SPORTS_INFO[sport]
  if (sport.startsWith("Para ")) return { ...SPORTS_INFO["Para sports"], name: sport }
  if (sport === "Ice hockey" || sport === "Alpine skiing") return undefined
  return undefined
}
