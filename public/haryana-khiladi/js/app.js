
(function(){
"use strict";

// Links to official sports organizations and athlete profiles
var WFI="https://wrestlingfederationofindia.org/", AFI="https://indianathletics.in/",
    BCCI="https://www.bcci.tv/", HI="https://hockeyindia.org/", PKL="https://www.prokabaddi.com/",
    NRAI="https://nrai.org.in/", HSD="https://haryanasports.gov.in/", PARA="https://www.paralympic.org/",
    SAI="https://sai.gov.in/";
function oly(s){return "https://olympics.com/en/athletes/"+s;}

// Sports, players and text shown on each sport page
var SPORTS=[
{id:"wrestling",hi:"कुश्ती",en:"Wrestling",obj:"gada",sa:"#7A4A2A",sb:"#E6B84A",
 lines:["Mitti se jo yaari kare, aasman uska ho jaye.","Pehle akhada, phir adda, phir Olympic ka jalwa.","Dust on the skin, gold in the mind."],
 fact:"Akhade ki mitti se Olympic mat tak. Yeh list Haryana ke kushti ke naamchin pehalwanon ki hai.",
 players:[
 {n:"Yogeshwar Dutt",pl:"Bhainswal Kalan, Sonipat",nt:"London 2012 Olympic bronze. 2014 mein Commonwealth aur Asian Games dono mein gold.",u:oly("yogeshwar-dutt"),s:"Olympics.com profile"},
 {n:"Sakshi Malik",pl:"Mokhra, Rohtak",nt:"Rio 2016 bronze. Olympic medal jeetne wali pehli Indian mahila pehalwan.",u:oly("sakshi-malik"),s:"Olympics.com profile"},
 {n:"Bajrang Punia",pl:"Khudan, Jhajjar",nt:"Tokyo 2020 bronze. World Championships mein 4 medal jeetne wale pehle Indian pehalwan.",u:oly("bajrang-bajrang"),s:"Olympics.com profile"},
 {n:"Vinesh Phogat",pl:"Balali, Charkhi Dadri",nt:"Teen baar Olympian, teen Commonwealth gold, Asian Games gold. Paris 2024 mein Olympic final tak pahunchi.",u:oly("vinesh-phogat"),s:"Olympics.com profile"},
 {n:"Geeta Phogat",pl:"Balali, Charkhi Dadri",nt:"Commonwealth Games gold jeetne wali pehli Indian mahila pehalwan (2010). Olympic ke liye qualify karne wali pehli Indian mahila pehalwan.",u:WFI,s:"WFI federation site"},
 {n:"Babita Phogat",pl:"Balali, Charkhi Dadri",nt:"2014 Commonwealth Games mein 55 kg gold.",u:WFI,s:"WFI federation site"},
 {n:"Ravi Kumar Dahiya",pl:"Nahri, Sonipat",nt:"Tokyo 2020 Olympics mein 57 kg silver.",u:WFI,s:"WFI federation site"},
 {n:"Aman Sehrawat",pl:"Jhajjar",nt:"Paris 2024 Olympics mein 57 kg bronze.",u:WFI,s:"WFI federation site"},
 {n:"Antim Panghal",pl:"Hisar",nt:"World U20 champion. Haryana ki nayi pehalwan peedhi ka chehra.",u:WFI,s:"WFI federation site"}
 ]},
{id:"athletics",hi:"एथलेटिक्स",en:"Athletics",obj:"javelin",sa:"#B8432A",sb:"#5E8C4A",
 lines:["Daud woh jo thakaan ko peeche chhod de.","Gaon ki pagdandi se podium tak.","Every lap is a letter home."],
 fact:"Panipat ke ek stadium se shuru hui kahani ne bhale ko poori duniya mein pehchan di.",
 players:[
 {n:"Neeraj Chopra",pl:"Khandra, Panipat",nt:"Tokyo 2020 Olympic gold, Paris 2024 Olympic silver, 2023 World Champion. Javelin ka sabse bada Indian naam.",u:"https://www.diamondleague.com/?p=5744",s:"Diamond League profile"},
 {n:"Krishna Poonia",pl:"Agroha, Hisar",nt:"2010 Commonwealth Games mein discus throw gold.",u:AFI,s:"AFI federation site"},
 {n:"Seema Punia",pl:"Khewra, Sonipat",nt:"Discus throw ki lambe samay tak Indian number ek. Commonwealth aur Asian Games medallist.",u:AFI,s:"AFI federation site"}
 ]},
{id:"boxing",hi:"मुक्केबाज़ी",en:"Boxing",obj:"glove",sa:"#C8372D",sb:"#2C3E73",
 lines:["Mukka sirf haath ka nahi, hausle ka bhi hota hai.","Bhiwani: chhoti si jagah, bada sa punch.","Hit hard, stay humble, repeat."],
 fact:"Bhiwani ko log Chhota Cuba bhi kehte hain. Yahan ke clubs se Olympic aur world champion nikle hain.",
 players:[
 {n:"Vijender Singh",pl:"Kaluwas, Bhiwani",nt:"Beijing 2008 Olympic bronze. Olympic medal jeetne wale pehle Indian boxer.",u:oly("vijender-singh"),s:"Olympics.com profile"},
 {n:"Nitu Ghanghas",pl:"Dhanana, Bhiwani",nt:"2022 Commonwealth Games gold aur 2023 mein 48 kg World Champion.",u:"https://olympics.com/en/news/who-is-nitu-ghanghas-india-boxing",s:"Olympics.com story"},
 {n:"Saweety Boora",pl:"Hisar",nt:"2023 mein 81 kg World Champion.",u:HSD,s:"Haryana Sports Dept"},
 {n:"Akhil Kumar",pl:"Bhiwani",nt:"2006 Commonwealth Games gold. Do baar Olympian.",u:HSD,s:"Haryana Sports Dept"}
 ]},
{id:"shooting",hi:"निशानेबाज़ी",en:"Shooting",obj:"target",sa:"#2B2F36",sb:"#E8B83A",
 lines:["Ek nishana, ek saans, ek Haryana.","Steady hands, loud results.","Dil dhadke tez, haath rahe sthir."],
 fact:"Shooting range mein shor nahi hota, par jeet ki goonj door tak jaati hai.",
 players:[
 {n:"Manu Bhaker",pl:"Goria, Jhajjar",nt:"Paris 2024 mein do Olympic bronze. Ek hi Olympics mein do medal jeetne wali pehli Indian athlete.",u:oly("manu-bhaker"),s:"Olympics.com profile"},
 {n:"Anish Bhanwala",pl:"Karnal",nt:"15 saal ki umar mein 2018 Commonwealth Games gold (25 m rapid fire pistol).",u:NRAI,s:"NRAI federation site"}
 ]},
{id:"hockey",hi:"हॉकी",en:"Hockey",obj:"hockey",sa:"#2F8A4B",sb:"#3FA05C",
 lines:["Stick se likhti hain ladkiyan nayi kahaniyan.","Shahbad se Olympic tak, ek hi dhun.","Pass, press, power."],
 fact:"Shahabad Markanda ki hockey academy ne desh ko kai international khiladi diye hain.",
 players:[
 {n:"Rani Rampal",pl:"Shahabad Markanda, Kurukshetra",nt:"15 saal ki umar mein 2010 World Cup khela. Indian mahila hockey team ki purvi captain.",u:oly("rani-rampal"),s:"Olympics.com profile"},
 {n:"Savita Punia",pl:"Jodhkan, Sirsa",nt:"Goalkeeper, Indian mahila hockey ki sabse zyada match khelne wali khiladi. Arjuna Award.",u:oly("savita-savita"),s:"Olympics.com profile"},
 {n:"Sandeep Singh",pl:"Shahabad Markanda, Kurukshetra",nt:"Drag-flicker, Indian hockey team ke purv captain.",u:HI,s:"Hockey India"}
 ]},
{id:"kabaddi",hi:"कबड्डी",en:"Kabaddi",obj:"ring",sa:"#C9692B",sb:"#7B3F1C",
 lines:["Kabaddi kabaddi, saans ka imtihaan, jeet ka elaan.","Dubki maar, daav laga.","Hold your breath, hold the line."],
 fact:"Haryana ke gaon ka mitti ka circle, Pro Kabaddi ke bade stage tak pahunch chuka hai.",
 players:[
 {n:"Pardeep Narwal",pl:"Rindhana, Sonipat",nt:"Dubki King. Pro Kabaddi League mein sabse zyada raid points ka record. Do baar league MVP.",u:PKL,s:"Pro Kabaddi League"}
 ]},
{id:"cricket",hi:"क्रिकेट",en:"Cricket",obj:"bat",sa:"#3E8E41",sb:"#C9A15B",
 lines:["Haryana Hurricane ki aandhi aaj bhi chalti hai.","Gaon ke maidan se duniya ke stage tak.","Short ball ho ya long, shot apna hi hoga."],
 fact:"1983 World Cup jeetne wali team ke captain se lekar aaj ke T20 stars tak.",
 players:[
 {n:"Kapil Dev",pl:"Haryana ke liye khele",nt:"1983 World Cup jeetne wali Indian team ke captain. Haryana Hurricane.",u:BCCI,s:"BCCI"},
 {n:"Yuzvendra Chahal",pl:"Jind",nt:"Leg-spinner, Indian white-ball cricket ke regular chehre.",u:BCCI,s:"BCCI"},
 {n:"Shafali Verma",pl:"Rohtak",nt:"Aggressive opener. Mahila T20I batters ki ranking mein world number ek tak pahunchi.",u:"https://www.bcci.tv/international/women/players/shafali-verma/398",s:"BCCI player profile"},
 {n:"Joginder Sharma",pl:"Rohtak",nt:"2007 T20 World Cup final ka aakhri over unhone phenka tha.",u:BCCI,s:"BCCI"}
 ]},
{id:"badminton",hi:"बैडमिंटन",en:"Badminton",obj:"shuttle",sa:"#2D7D5A",sb:"#1E5C44",
 lines:["Shuttle udti hai, sapne bhi.","Ek smash mein poora desh jhoom gaya.","Quick feet, quicker dreams."],
 fact:"Hisar mein janme ek khiladi ne Indian badminton ko Olympic podium tak pahunchaya.",
 players:[
 {n:"Saina Nehwal",pl:"Hisar mein janam",nt:"London 2012 Olympic bronze. Olympic badminton medal jeetne wali pehli Indian khiladi.",u:oly("saina-nehwal"),s:"Olympics.com profile"}
 ]},
{id:"para",hi:"पैरा खेल",en:"Para Sports",obj:"medal",sa:"#2F5FA8",sb:"#E3A400",
 lines:["Zid ho toh sharir kya cheez hai.","Limits are just starting lines.","Jo haar nahi maanta, wahi jeet ka naam hai."],
 fact:"Paralympic stage par bhi Haryana ke khiladi sabse upar khade dikhte hain.",
 players:[
 {n:"Sumit Antil",pl:"Khewra, Sonipat",nt:"Paralympic javelin (F64) champion.",u:"https://www.paralympic.org/feature/india-s-paralympic-champion-antil-shares-secret-his-success-javelin-throwing",s:"Paralympic.org story"},
 {n:"Harvinder Singh",pl:"Kaithal",nt:"Paris 2024 Paralympics mein archery gold.",u:PARA,s:"Paralympic.org"},
 {n:"Dharambir",pl:"Haryana",nt:"Paris 2024 Paralympics mein club throw (F51) gold.",u:PARA,s:"Paralympic.org"},
 {n:"Pranav Soorma",pl:"Faridabad",nt:"Paris 2024 Paralympics mein club throw (F51) silver.",u:PARA,s:"Paralympic.org"}
 ]}
];

var FEATURED=["Neeraj Chopra","Manu Bhaker","Vinesh Phogat","Bajrang Punia","Sakshi Malik","Pardeep Narwal"];

var HOME_LINES=[
 "Desan mein des Haryana, jit doodh dahi ka khana.",
 "Mitti ka tilak, mehnat ka mukut.",
 "Pasine ki har boond mein tiranga lehrata hai, Haryana ka beta medal ghar laata hai.",
 "खेत से खेल तक, हरियाणा का हर कदम गोल्ड की तरफ़।",
 "Born in the dust of akhadas. Raised on milk, grit and morning runs.",
 "Gaon ki pagdandi se podium tak.",
 "Ek khet, ek akhada, ek sapna."
];

var ACADEMIES=[
 {n:"SAI NCOE, Sonipat",w:"Sonipat",sp:["Wrestling","Athletics","Hockey","Kabaddi","Archery"],d:"Sports Authority of India ka National Centre of Excellence. Kai khelon ki training ek jagah.",u:SAI,l:"SAI official site"},
 {n:"SAI NCOE, Rohtak",w:"Rohtak",sp:["Boxing"],d:"Boxing ke liye SAI ka National Centre of Excellence.",u:SAI,l:"SAI official site"},
 {n:"Motilal Nehru School of Sports",w:"Rai, Sonipat",sp:["Multi-sport","Basketball"],d:"Residential sports school. Khelo India ke tahat accredited academies mein shaamil.",u:HSD,l:"Haryana Sports Dept"},
 {n:"Tau Devi Lal Sports Complex",w:"Panchkula",sp:["Athletics","Multi-sport"],d:"Yahin 13 saal ki umar mein Neeraj Chopra ne training shuru ki thi.",u:HSD,l:"Haryana Sports Dept"},
 {n:"Bhiwani Boxing Club",w:"Bhiwani",sp:["Boxing"],d:"Coach Jagdish Singh ne yahan Vijender Singh aur Nitu Ghanghas jaise boxers ko tarasha.",u:null},
 {n:"Shahabad Hockey Academy",w:"Shahabad Markanda, Kurukshetra",sp:["Hockey"],d:"Rani Rampal ne yahin 2003 mein hockey shuru ki. Coach Baldev Singh.",u:null},
 {n:"Bharat Singh Memorial Sports School",w:"Nidani, Jind",sp:["Multi-sport"],d:"Khelo India ki accredited academies ki list mein Haryana ka naam.",u:HSD,l:"Haryana Sports Dept"},
 {n:"Narwal Sports Academy",w:"Haryana",sp:["Kabaddi"],d:"Pardeep Narwal ki kabaddi academy.",u:null},
 {n:"SAI Centre, Panipat",w:"Panipat",sp:["Athletics","Javelin"],d:"Neeraj Chopra ne yahin pehli baar javelin throw karte hue khiladiyon ko dekha tha.",u:SAI,l:"SAI official site"},
 {n:"Khelo India State Centre of Excellence",w:"Haryana",sp:["Multi-sport"],d:"Haryana sports department ki taraf se athletes ka selection aur training.",u:HSD,l:"Haryana Sports Dept"},
 {n:"Haryana Academy of Adventure Sports",w:"Haryana",sp:["Adventure"],d:"Mountaineering aur adventure sports ke liye state ka academy.",u:HSD,l:"Haryana Sports Dept"}
];

var FACTS=[
 {b:"Lagbhag 1/3",t:"Haryana Sports Department ke mutabiq desh ke lagbhag ek-tihai international medal Haryana ke khiladiyon ne jeete hain."},
 {b:"Neeraj Chopra",t:"Olympics mein athletics ka pehla Indian gold. Panipat ke Khandra gaon ke ladke ne Tokyo mein itihaas likha."},
 {b:"Manu Bhaker",t:"Ek hi Olympics mein do medal jeetne wali pehli Indian athlete (Paris 2024). Jhajjar ke Goria gaon se."},
 {b:"Sakshi Malik",t:"Olympic medal jeetne wali pehli Indian mahila pehalwan (Rio 2016). Rohtak se."},
 {b:"Vijender Singh",t:"Olympic medal jeetne wale pehle Indian boxer (Beijing 2008). Bhiwani ke Kaluwas se."},
 {b:"Savita Punia",t:"Indian mahila hockey mein sabse zyada international match khelne wali khiladi. Sirsa se."},
 {b:"Pardeep Narwal",t:"Pro Kabaddi League mein sabse zyada raid points ka record. Sonipat ke Rindhana gaon se."},
 {b:"Vinesh Phogat",t:"Olympic wrestling final tak pahunchne wali pehli Indian mahila (Paris 2024)."}
];

var DISTRICTS=[
 {d:"Bhiwani",k:"Boxing",p:"Vijender Singh, Nitu Ghanghas, Akhil Kumar"},
 {d:"Sonipat",k:"Wrestling, Kabaddi, Para",p:"Yogeshwar Dutt, Ravi Dahiya, Pardeep Narwal, Sumit Antil"},
 {d:"Rohtak",k:"Wrestling, Cricket",p:"Sakshi Malik, Shafali Verma, Joginder Sharma"},
 {d:"Jhajjar",k:"Wrestling, Shooting",p:"Bajrang Punia, Manu Bhaker, Aman Sehrawat"},
 {d:"Panipat",k:"Athletics",p:"Neeraj Chopra"},
 {d:"Kurukshetra",k:"Hockey",p:"Rani Rampal, Sandeep Singh"},
 {d:"Hisar",k:"Badminton, Boxing, Wrestling",p:"Saina Nehwal, Saweety Boora, Antim Panghal"},
 {d:"Sirsa",k:"Hockey",p:"Savita Punia"},
 {d:"Jind",k:"Cricket",p:"Yuzvendra Chahal"}
];

// Small helpers used by the page sections
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function ini(n){var p=n.trim().split(/\s+/);return (p[0][0]+(p.length>1?p[p.length-1][0]:"")).toUpperCase();}
function byId(id){for(var i=0;i<SPORTS.length;i++)if(SPORTS[i].id===id)return SPORTS[i];return null;}
function findPlayer(name){for(var i=0;i<SPORTS.length;i++)for(var j=0;j<SPORTS[i].players.length;j++)if(SPORTS[i].players[j].n===name)return SPORTS[i].players[j];return null;}
function pcard(p){
  return '<a class="pcard" href="'+esc(p.u)+'" target="_blank" rel="noopener noreferrer">'+
    '<span class="pc-top"><span class="pc-ini" aria-hidden="true">'+esc(ini(p.n))+'</span><span class="pc-place">'+esc(p.pl)+'</span></span>'+
    '<h3>'+esc(p.n)+'</h3><p>'+esc(p.nt)+'</p>'+
    '<span class="pc-go"><span>'+esc(p.s)+'</span><span aria-hidden="true">&#8599;</span></span></a>';
}
function stile(s){
  return '<a class="stile" href="#sport-'+s.id+'"><span class="hi">'+s.hi+'</span><span class="en">'+esc(s.en)+'</span><span class="ct">'+s.players.length+(s.players.length===1?' khiladi':' khiladi')+'</span></a>';
}

// Draws a court background for each sport
function bg(id){
  var o='<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">';
  var i;
  if(id==="athletics"){
    o+='<rect width="1200" height="800" fill="var(--sa)"/>';
    for(i=0;i<6;i++){var w=960-i*80,h=600-i*80;o+='<rect x="'+(120+i*40)+'" y="'+(100+i*40)+'" width="'+w+'" height="'+h+'" rx="'+Math.min(260-i*30,h/2)+'" fill="none" stroke="#fff" stroke-width="3"/>';}
    o+='<rect x="360" y="340" width="480" height="120" rx="60" fill="var(--sb)"/>';
    o+='<line x1="600" y1="100" x2="600" y2="260" stroke="#fff" stroke-width="6"/>';
  }else if(id==="wrestling"){
    o+='<rect width="1200" height="800" fill="var(--sa)"/>';
    o+='<defs><pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="2" fill="#000" opacity=".18"/><circle cx="20" cy="18" r="1.5" fill="#000" opacity=".14"/></pattern></defs>';
    o+='<rect width="1200" height="800" fill="url(#dots)"/>';
    o+='<circle cx="600" cy="400" r="380" fill="#B8321F" opacity=".85"/><circle cx="600" cy="400" r="300" fill="var(--sb)"/><circle cx="600" cy="400" r="300" fill="none" stroke="#fff" stroke-width="5"/><circle cx="600" cy="400" r="120" fill="none" stroke="#fff" stroke-width="3"/><circle cx="600" cy="400" r="14" fill="#fff"/>';
  }else if(id==="boxing"){
    o+='<rect width="1200" height="800" fill="var(--sb)"/>';
    o+='<polygon points="40,800 1160,800 1010,470 190,470" fill="#0000001f" stroke="#fff" stroke-width="3"/>';
    o+='<ellipse cx="600" cy="640" rx="170" ry="60" fill="none" stroke="#fff" stroke-width="4"/>';
    for(i=0;i<3;i++){var y=300+i*62;o+='<line x1="60" y1="'+y+'" x2="1140" y2="'+y+'" stroke="var(--sa)" stroke-width="'+(12-i*2)+'" stroke-linecap="round"/>';}
    for(i=0;i<3;i++){var y2=240+i*40;o+='<line x1="190" y1="'+y2+'" x2="1010" y2="'+y2+'" stroke="var(--sa)" stroke-width="5" opacity=".6"/>';}
    o+='<rect x="40" y="200" width="30" height="330" rx="8" fill="#fff"/><rect x="1130" y="200" width="30" height="330" rx="8" fill="#fff"/>';
  }else if(id==="shooting"){
    o+='<rect width="1200" height="800" fill="var(--sa)"/>';
    var cols=["#F4F1EA","#222","#2B6CB0","#C0262D","var(--sb)","#222"];var rs=[360,300,240,180,120,50];
    for(i=0;i<rs.length;i++)o+='<circle cx="820" cy="400" r="'+rs[i]+'" fill="'+cols[i]+'" stroke="#fff" stroke-width="2"/>';
    o+='<line x1="420" y1="400" x2="1200" y2="400" stroke="#fff" stroke-width="2" opacity=".6"/><line x1="820" y1="0" x2="820" y2="800" stroke="#fff" stroke-width="2" opacity=".6"/>';
    var holes=[[840,380],[800,420],[860,410],[815,360],[900,430],[760,370]];
    for(i=0;i<holes.length;i++)o+='<circle cx="'+holes[i][0]+'" cy="'+holes[i][1]+'" r="9" fill="#000" opacity=".8"/>';
  }else if(id==="hockey"){
    o+='<rect width="1200" height="800" fill="var(--sa)"/>';
    for(i=0;i<8;i++)o+='<rect x="'+(80+i*140)+'" y="120" width="70" height="560" fill="var(--sb)" opacity=".5"/>';
    o+='<rect x="80" y="120" width="1040" height="560" fill="none" stroke="#fff" stroke-width="5"/>';
    o+='<line x1="600" y1="120" x2="600" y2="680" stroke="#fff" stroke-width="4"/><line x1="340" y1="120" x2="340" y2="680" stroke="#fff" stroke-width="3" stroke-dasharray="14 12"/><line x1="860" y1="120" x2="860" y2="680" stroke="#fff" stroke-width="3" stroke-dasharray="14 12"/>';
    o+='<path d="M80 230 A170 170 0 0 1 80 570" fill="none" stroke="#fff" stroke-width="4"/><path d="M1120 230 A170 170 0 0 0 1120 570" fill="none" stroke="#fff" stroke-width="4"/><circle cx="600" cy="400" r="8" fill="#fff"/>';
  }else if(id==="kabaddi"){
    o+='<rect width="1200" height="800" fill="var(--sb)"/>';
    o+='<rect x="130" y="190" width="940" height="420" fill="var(--sa)" stroke="#fff" stroke-width="5"/>';
    o+='<rect x="130" y="190" width="940" height="38" fill="#00000026"/><rect x="130" y="572" width="940" height="38" fill="#00000026"/>';
    o+='<line x1="600" y1="190" x2="600" y2="610" stroke="#fff" stroke-width="5"/><line x1="440" y1="190" x2="440" y2="610" stroke="#fff" stroke-width="3"/><line x1="760" y1="190" x2="760" y2="610" stroke="#fff" stroke-width="3"/><line x1="380" y1="190" x2="380" y2="610" stroke="#fff" stroke-width="3" stroke-dasharray="10 10"/><line x1="820" y1="190" x2="820" y2="610" stroke="#fff" stroke-width="3" stroke-dasharray="10 10"/>';
  }else if(id==="cricket"){
    o+='<rect width="1200" height="800" fill="var(--sa)"/>';
    for(i=0;i<10;i++)o+='<rect x="'+(i*120)+'" y="0" width="60" height="800" fill="#fff" opacity=".06"/>';
    o+='<ellipse cx="600" cy="400" rx="520" ry="330" fill="none" stroke="#fff" stroke-width="5"/><ellipse cx="600" cy="400" rx="300" ry="190" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="14 12"/>';
    o+='<rect x="565" y="190" width="70" height="420" fill="var(--sb)"/>';
    o+='<line x1="550" y1="236" x2="650" y2="236" stroke="#fff" stroke-width="4"/><line x1="550" y1="564" x2="650" y2="564" stroke="#fff" stroke-width="4"/><line x1="565" y1="198" x2="635" y2="198" stroke="#fff" stroke-width="3"/><line x1="565" y1="602" x2="635" y2="602" stroke="#fff" stroke-width="3"/>';
    for(i=0;i<3;i++)o+='<rect x="'+(588+i*10)+'" y="190" width="4" height="14" fill="#fff"/><rect x="'+(588+i*10)+'" y="596" width="4" height="14" fill="#fff"/>';
  }else if(id==="badminton"){
    o+='<rect width="1200" height="800" fill="var(--sb)"/>';
    o+='<rect x="150" y="195" width="900" height="410" fill="var(--sa)" stroke="#fff" stroke-width="5"/>';
    o+='<line x1="150" y1="226" x2="1050" y2="226" stroke="#fff" stroke-width="4"/><line x1="150" y1="574" x2="1050" y2="574" stroke="#fff" stroke-width="4"/>';
    o+='<line x1="467" y1="195" x2="467" y2="605" stroke="#fff" stroke-width="4"/><line x1="733" y1="195" x2="733" y2="605" stroke="#fff" stroke-width="4"/><line x1="201" y1="195" x2="201" y2="605" stroke="#fff" stroke-width="4"/><line x1="999" y1="195" x2="999" y2="605" stroke="#fff" stroke-width="4"/>';
    o+='<line x1="150" y1="400" x2="467" y2="400" stroke="#fff" stroke-width="4"/><line x1="733" y1="400" x2="1050" y2="400" stroke="#fff" stroke-width="4"/><line x1="600" y1="170" x2="600" y2="630" stroke="#fff" stroke-width="8"/>';
  }else{ /* Para sports: throwing circle and landing sector */
    o+='<rect width="1200" height="800" fill="var(--sa)"/>';
    o+='<polygon points="250,400 1200,60 1200,740" fill="var(--sb)" opacity=".5"/>';
    o+='<line x1="250" y1="400" x2="1200" y2="60" stroke="#fff" stroke-width="5"/><line x1="250" y1="400" x2="1200" y2="740" stroke="#fff" stroke-width="5"/>';
    for(i=1;i<=4;i++)o+='<path d="M'+(250+i*210)+' '+(400-i*72)+' A'+(i*210+10)+' '+(i*210+10)+' 0 0 1 '+(250+i*210)+' '+(400+i*72)+'" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="12 10"/>';
    o+='<circle cx="250" cy="400" r="62" fill="#00000030" stroke="#fff" stroke-width="5"/>';
  }
  return o+'</svg>';
}

// Builds the page sections
var view=document.getElementById("view"), rotTimer=null;

function viewHome(){
  var feat=FEATURED.map(findPlayer).filter(Boolean).map(pcard).join("");
  view.innerHTML=
  '<div class="home-glow" aria-hidden="true"></div>'+
  '<section class="hero"><div class="wrap"><div class="hero-copy">'+
    '<p class="eyebrow">Khiladiyon ki dharti</p>'+
    '<h1>हरियाणा<span>Khiladi</span></h1>'+
    '<p class="sub">Mitti se medal tak</p>'+
    '<p class="rot" id="rot" aria-live="off">'+esc(HOME_LINES[0])+'</p>'+
    '<div class="hero-cta"><a class="btn pri" href="#sports">Khel chuno</a><a class="btn" href="#academies">Academies</a></div>'+
  '</div></div></section>'+
  '<section class="sec"><div class="wrap">'+
    '<div class="sec-head"><p class="eyebrow">Famous khiladi</p><h2 class="h-sec">Jinke naam se Haryana jaana jaata hai</h2><p>Kisi bhi card par click karo, uska official profile page khul jayega.</p></div>'+
    '<div class="pgrid">'+feat+'</div></div></section>'+
  '<section class="band"><div class="wrap sec band-in"><blockquote>Jaat ki akad, Gujjar ka josh, kisan ki mehnat. Mitti ek, naam Haryana.</blockquote>'+
    '<div><div class="tags"><span class="tag">Kisan ka beta</span><span class="tag">Jawan ka bhai</span><span class="tag">Khiladi ka naam</span></div>'+
    '<p>Khet ki medh se akhade ki mitti tak, har gaon mein koi na koi sapna subah chhe baje daud raha hota hai.</p></div></div></section>'+
  '<section class="sec" id="sports"><div class="wrap">'+
    '<div class="sec-head"><p class="eyebrow">Sab khel</p><h2 class="h-sec">Apna khel chuno</h2><p>Upar menu mein Sports par hover karo ya yahan se chuno. Har khel ka apna maidan aur apne khiladi hain.</p></div>'+
    '<div class="stiles">'+SPORTS.map(stile).join("")+'</div></div></section>'+
  '<section class="sec"><div class="wrap">'+
    '<div class="sec-head"><p class="eyebrow">Kya aap jaante the</p><h2 class="h-sec">Apne Haryana ka khiladi</h2></div>'+
    '<div class="fgrid">'+FACTS.slice(0,3).map(function(f){return '<div class="fcard"><span class="big">'+esc(f.b)+'</span><p>'+esc(f.t)+'</p></div>';}).join("")+'</div>'+
    '<div class="hero-cta" style="margin-top:22px"><a class="btn" href="#jaano">Aur jaano</a></div></div></section>';
  var el=document.getElementById("rot"), n=0;
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  rotTimer=setInterval(function(){
    n=(n+1)%HOME_LINES.length;
    if(reduce){el.textContent=HOME_LINES[n];return;}
    el.classList.add("out");
    setTimeout(function(){el.textContent=HOME_LINES[n];el.classList.remove("out");},350);
  },4800);
}

function viewSport(s){
  var others=SPORTS.filter(function(x){return x.id!==s.id;}).map(function(x){return '<a class="chip" href="#sport-'+x.id+'">'+x.hi+' &middot; '+esc(x.en)+'</a>';}).join("");
  view.innerHTML=
  '<section class="sp-hero"><div class="wrap">'+
    '<p class="eyebrow">Haryana &middot; '+esc(s.en)+'</p>'+
    '<h1 class="sp-hi">'+s.hi+'</h1><p class="sp-en">'+esc(s.en)+'</p>'+
    '<blockquote class="sp-line">'+esc(s.lines[0])+'</blockquote>'+
    '<div class="bol">'+s.lines.slice(1).map(function(l){return '<span>'+esc(l)+'</span>';}).join("")+'</div>'+
    '<p class="sp-fact">'+esc(s.fact)+'</p></div></section>'+
  '<section class="sec"><div class="wrap"><p class="count">'+s.players.length+' khiladi &middot; card par click karo, official page khulega</p>'+
    '<div class="pgrid">'+s.players.map(pcard).join("")+
    '<a class="pcard add" href="#players"><h3>Aapka naam yahan?</h3><p>Player ho? Player Corner mein apna card banao.</p><span class="pc-go"><span>Player Corner</span><span aria-hidden="true">&rarr;</span></span></a>'+
    '</div></div></section>'+
  '<section class="sec" style="padding-top:0"><div class="wrap"><p class="count">Doosre khel</p><div class="chips">'+others+'</div></div></section>';
}

function viewAcademies(){
  view.innerHTML=
  '<section class="sec"><div class="wrap">'+
    '<div class="sec-head"><p class="eyebrow">Academies</p><h1 class="h-sec">Jahan se champion nikalte hain</h1><p>Haryana ke sports centres, schools aur clubs. Jahan official page mila wahan link hai.</p></div>'+
    '<div class="agrid">'+ACADEMIES.map(function(a){
      return '<article class="acard"><span class="where">'+esc(a.w)+'</span><h3>'+esc(a.n)+'</h3>'+
        '<div class="sp">'+a.sp.map(function(x){return '<span>'+esc(x)+'</span>';}).join("")+'</div><p>'+esc(a.d)+'</p>'+
        (a.u?'<a class="go" href="'+esc(a.u)+'" target="_blank" rel="noopener noreferrer">'+esc(a.l)+' &#8599;</a>':'<span class="nolink">Official website nahi mili</span>')+'</article>';
    }).join("")+'</div>'+
    '<div class="officials"><a class="btn pri" href="'+HSD+'" target="_blank" rel="noopener noreferrer">Haryana Sports Department &#8599;</a><a class="btn" href="'+SAI+'" target="_blank" rel="noopener noreferrer">Sports Authority of India &#8599;</a></div>'+
  '</div></section>';
}

function viewJaano(){
  view.innerHTML=
  '<section class="sec"><div class="wrap">'+
    '<div class="sec-head"><p class="eyebrow">Jaano</p><h1 class="h-sec">Apne Haryana ka khiladi hai, yeh jaano</h1><p>Agar aap khiladi nahi hain, tab bhi yeh dekhne layak hai. Itihaas banane wale kuch naam.</p></div>'+
    '<div class="fgrid">'+FACTS.map(function(f){return '<div class="fcard"><span class="big">'+esc(f.b)+'</span><p>'+esc(f.t)+'</p></div>';}).join("")+'</div></div></section>'+
  '<section class="sec" style="padding-top:0"><div class="wrap">'+
    '<div class="sec-head"><p class="eyebrow">Jile aur khel</p><h2 class="h-sec">Kahan se kaun</h2></div>'+
    '<div class="dgrid">'+DISTRICTS.map(function(d){return '<div class="dcell"><span class="k">'+esc(d.k)+'</span><h3>'+esc(d.d)+'</h3><p>'+esc(d.p)+'</p></div>';}).join("")+'</div>'+
    '<div class="hero-cta" style="margin-top:24px"><a class="btn pri" href="#sports">Khel dekho</a><a class="btn" href="#players">Player ho? Judo</a></div></div></section>';
  var s=document.getElementById("sports"); if(s) s.removeAttribute("id");
}

var KEY="hk-player";
function loadCard(){try{var r=localStorage.getItem(KEY);return r?JSON.parse(r):null;}catch(e){return null;}}
function saveCard(c){try{localStorage.setItem(KEY,JSON.stringify(c));return true;}catch(e){return false;}}
function clearCard(){try{localStorage.removeItem(KEY);}catch(e){}}

function viewPlayers(){
  var opts=SPORTS.map(function(s){return '<option value="'+s.id+'">'+esc(s.en)+'</option>';}).join("");
  view.innerHTML=
  '<section class="sec"><div class="wrap">'+
    '<div class="sec-head"><p class="eyebrow">Player Corner</p><h1 class="h-sec">Khiladi ho? Apna card banao</h1><p>Naam, khel aur jila bharo. Card turant ban jayega.</p></div>'+
    '<div class="pc-wrap"><form class="panel" id="pcForm" novalidate><h2>Player login</h2>'+
      '<p class="note">Demo version: yeh sab sirf aapke is browser mein save hota hai. Asli login aur sabko dikhne wali profile ke liye backend jodna padega.</p>'+
      '<div class="field"><label for="pcName">Naam</label><input id="pcName" autocomplete="name" maxlength="60" required></div>'+
      '<div class="field"><label for="pcSport">Khel</label><select id="pcSport">'+opts+'</select></div>'+
      '<div class="field"><label for="pcPlace">Gaon / Jila</label><input id="pcPlace" maxlength="60"></div>'+
      '<div class="field"><label for="pcNote">Ek line apni uplabdhi</label><textarea id="pcNote" maxlength="160"></textarea></div>'+
      '<button class="btn pri" type="submit">Card banao</button> <span id="pcMsg" role="status" style="margin-left:10px;color:var(--muted);font-size:15px"></span></form>'+
    '<div class="panel"><h2>Aapka card</h2><div id="pcOut"></div></div></div></div></section>';
  var form=document.getElementById("pcForm"), out=document.getElementById("pcOut"), msg=document.getElementById("pcMsg");
  function draw(){
    var c=loadCard(); out.textContent="";
    if(!c){var e=document.createElement("div");e.className="empty";e.textContent="Abhi koi card nahi bana. Form bharo aur Card banao dabao.";out.appendChild(e);return;}
    var sp=byId(c.sport);
    var box=document.createElement("div");box.className="myc";
    var nm=document.createElement("span");nm.className="nm";nm.textContent=c.name;
    var mt=document.createElement("span");mt.className="mt";mt.textContent=(sp?sp.en:"")+(c.place?" · "+c.place:"");
    var nt=document.createElement("p");nt.textContent=c.note||"";
    var ls=document.createElement("div");ls.className="ls";
    if(sp){var a=document.createElement("a");a.className="btn";a.href="#sport-"+sp.id;a.textContent=sp.en+" page";ls.appendChild(a);}
    var del=document.createElement("button");del.type="button";del.className="btn";del.textContent="Logout";
    del.addEventListener("click",function(){clearCard();msg.textContent="";draw();});
    ls.appendChild(del);
    box.appendChild(nm);box.appendChild(mt);box.appendChild(nt);box.appendChild(ls);out.appendChild(box);
  }
  var c0=loadCard();
  if(c0){document.getElementById("pcName").value=c0.name||"";document.getElementById("pcSport").value=c0.sport||"wrestling";document.getElementById("pcPlace").value=c0.place||"";document.getElementById("pcNote").value=c0.note||"";}
  form.addEventListener("submit",function(ev){
    ev.preventDefault();
    var name=document.getElementById("pcName").value.trim();
    if(!name){msg.textContent="Pehle naam likho.";return;}
    var ok=saveCard({name:name,sport:document.getElementById("pcSport").value,place:document.getElementById("pcPlace").value.trim(),note:document.getElementById("pcNote").value.trim()});
    msg.textContent=ok?"Card ban gaya.":"Card bana, par is browser mein save nahi ho paya.";
    draw();
  });
  draw();
}

// Loads the section selected by the URL hash
var navLinks=document.querySelectorAll(".nav>a[data-r]"), sportsBtn=document.getElementById("sportsBtn");
function route(){
  if(rotTimer){clearInterval(rotTimer);rotTimer=null;}
  var h=(location.hash||"#home").slice(1);
  var body=document.body, bgEl=document.getElementById("sportbg"), r="home", sp=null;
  body.classList.remove("is-home","is-sport","is-page");
  if(h==="sports"){ if(!view.querySelector("#sports")){ r="home"; } }
  if(h.indexOf("sport-")===0){sp=byId(h.slice(6));}
  if(sp){
    r="sport"; viewSport(sp); body.classList.add("is-sport");
    bgEl.style.setProperty("--sa",sp.sa);bgEl.style.setProperty("--sb",sp.sb);bgEl.innerHTML=bg(sp.id);
    if(GL)GL.set("sport",sp.obj);
  }else if(h==="academies"){r="academies";viewAcademies();body.classList.add("is-page");if(GL)GL.set("home");}
  else if(h==="jaano"){r="jaano";viewJaano();body.classList.add("is-page");if(GL)GL.set("home");}
  else if(h==="players"){r="players";viewPlayers();body.classList.add("is-page");if(GL)GL.set("home");}
  else{
    r="home"; viewHome(); body.classList.add("is-home"); if(GL)GL.set("home");
    if(h==="sports"){var t=document.getElementById("sports");if(t)setTimeout(function(){t.scrollIntoView({behavior:"smooth"});},60);}
  }
  if(!(r==="home"&&h==="sports"))window.scrollTo(0,0);
  for(var i=0;i<navLinks.length;i++){
    if(navLinks[i].getAttribute("data-r")===r)navLinks[i].setAttribute("aria-current","page");else navLinks[i].removeAttribute("aria-current");
  }
  sportsBtn.classList.toggle("on",r==="sport");
  closeMenus();
}

// Navigation menu behavior
var nav=document.getElementById("nav"), menuBtn=document.getElementById("menuBtn"), sItem=document.getElementById("sportsItem");
document.getElementById("megaIn").innerHTML=SPORTS.map(function(s){return '<a href="#sport-'+s.id+'"><span class="hi">'+s.hi+'</span><span class="en">'+esc(s.en)+'</span></a>';}).join("");
function closeMenus(){nav.classList.remove("open");menuBtn.setAttribute("aria-expanded","false");sItem.classList.remove("open");sportsBtn.setAttribute("aria-expanded","false");}
menuBtn.addEventListener("click",function(){var o=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",o?"true":"false");});
sportsBtn.addEventListener("click",function(){var o=sItem.classList.toggle("open");sportsBtn.setAttribute("aria-expanded",o?"true":"false");});
document.addEventListener("click",function(e){if(!sItem.contains(e.target))sItem.classList.remove("open");});
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeMenus();});

// Theme selection
var root=document.documentElement, themeBtn=document.getElementById("themeBtn");
function curTheme(){var t=root.getAttribute("data-theme");if(t)return t;return (window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches)?"dark":"light";}
function syncTheme(){var t=curTheme();themeBtn.setAttribute("data-mode",t);themeBtn.setAttribute("aria-label",t==="dark"?"Light mode lagao":"Dark mode lagao");if(GL)GL.theme(t);}
try{var st=localStorage.getItem("hk-theme");if(st==="dark"||st==="light")root.setAttribute("data-theme",st);}catch(e){}
themeBtn.addEventListener("click",function(){var n=curTheme()==="dark"?"light":"dark";root.setAttribute("data-theme",n);try{localStorage.setItem("hk-theme",n);}catch(e){}syncTheme();});
if(window.matchMedia){try{matchMedia("(prefers-color-scheme: dark)").addEventListener("change",syncTheme);}catch(e){}}

// Three.js scene and sports equipment models
var GL=(function(){
  if(typeof THREE==="undefined")return null;
  var cv=document.getElementById("gl"), renderer;
  try{renderer=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});}catch(e){cv.style.display="none";return null;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));
  renderer.setClearColor(0x000000,0);
  var scene=new THREE.Scene(), cam=new THREE.PerspectiveCamera(40,1,0.1,100);
  cam.position.set(0,0,10);
  var amb=new THREE.AmbientLight(0xffffff,0.75); scene.add(amb);
  var dl=new THREE.DirectionalLight(0xffffff,0.95); dl.position.set(3,5,6); scene.add(dl);
  var pl=new THREE.PointLight(0xffc247,0.9,40); pl.position.set(-5,-2,6); scene.add(pl);
  function M(c,m,r){return new THREE.MeshStandardMaterial({color:c,metalness:m==null?0.4:m,roughness:r==null?0.5:r});}
  function mesh(g,m,x,y,z){var o=new THREE.Mesh(g,m);o.position.set(x||0,y||0,z||0);return o;}
  var gold=M(0xE2A81B,0.65,0.32), wood=M(0x7A4A24,0.1,0.7), steel=M(0xC8D0D8,0.8,0.3), white=M(0xF2EFE6,0.05,0.8), red=M(0xC0262D,0.15,0.55), dark=M(0x1d1d22,0.3,0.6);

  var B={};
  B.gada=function(){var g=new THREE.Group();
    g.add(mesh(new THREE.CylinderGeometry(0.1,0.14,2.6,16),wood,0,-0.4,0));
    var h=mesh(new THREE.SphereGeometry(0.75,28,18),gold,0,1.2,0);h.scale.set(1,1.15,1);g.add(h);
    [0.85,1.2,1.55].forEach(function(y){var t=mesh(new THREE.TorusGeometry(0.76,0.06,10,36),gold,0,y,0);t.rotation.x=Math.PI/2;g.add(t);});
    g.add(mesh(new THREE.SphereGeometry(0.18,14,12),gold,0,2.12,0));g.add(mesh(new THREE.SphereGeometry(0.2,14,12),gold,0,-1.72,0));
    g.position.y=-0.2;var w=new THREE.Group();w.add(g);return w;};
  B.javelin=function(){var g=new THREE.Group();
    g.add(mesh(new THREE.CylinderGeometry(0.055,0.055,5,12),steel,0,0,0));
    g.add(mesh(new THREE.ConeGeometry(0.07,0.55,12),steel,0,2.75,0));
    g.add(mesh(new THREE.CylinderGeometry(0.085,0.085,0.7,12),red,0,-0.1,0));
    g.add(mesh(new THREE.TorusGeometry(0.075,0.02,8,16),white,0,1.4,0));
    g.rotation.z=0.95;var w=new THREE.Group();w.add(g);return w;};
  B.medal=function(){var g=new THREE.Group();
    var d=mesh(new THREE.CylinderGeometry(1,1,0.16,48),gold);d.rotation.x=Math.PI/2;g.add(d);
    var r=mesh(new THREE.TorusGeometry(1,0.07,12,48),gold);g.add(r);
    var r2=mesh(new THREE.TorusGeometry(0.68,0.03,10,40),M(0xB98812,0.7,0.35),0,0,0.09);g.add(r2);
    [[0xFF9933,-0.3],[0xF4F1EA,0],[0x138808,0.3]].forEach(function(c){g.add(mesh(new THREE.BoxGeometry(0.3,1.4,0.03),M(c[0],0.05,0.8),c[1],1.75,-0.02));});
    g.position.y=-0.4;var w=new THREE.Group();w.add(g);return w;};
  B.hockey=function(){var g=new THREE.Group();
    var s=mesh(new THREE.CylinderGeometry(0.055,0.065,3.3,12),M(0xC58B4E,0.1,0.6),0,0.2,0);g.add(s);
    var t=mesh(new THREE.TorusGeometry(0.38,0.07,10,20,Math.PI/2),M(0xC58B4E,0.1,0.6),0.38,-1.45,0);t.rotation.z=Math.PI;g.add(t);
    g.add(mesh(new THREE.CylinderGeometry(0.08,0.08,0.7,12),dark,0,1.4,0));
    g.add(mesh(new THREE.SphereGeometry(0.2,18,14),white,1.15,-1.55,0.3));
    g.rotation.z=0.45;var w=new THREE.Group();w.add(g);return w;};
  B.glove=function(){var g=new THREE.Group();
    var b=mesh(new THREE.SphereGeometry(0.8,24,18),red,0,0.3,0);b.scale.set(1,1,0.9);g.add(b);
    var th=mesh(new THREE.SphereGeometry(0.32,16,12),red,-0.72,0,0.28);g.add(th);
    g.add(mesh(new THREE.CylinderGeometry(0.55,0.62,0.7,20),dark,0,-0.78,0));
    var tp=mesh(new THREE.TorusGeometry(0.58,0.05,8,24),white,0,-0.42,0);tp.rotation.x=Math.PI/2;g.add(tp);
    g.rotation.z=-0.35;var w=new THREE.Group();w.add(g);return w;};
  B.wheat=function(){var g=new THREE.Group();
    [-0.5,-0.25,0,0.25,0.5].forEach(function(a,i){var st=new THREE.Group();
      st.add(mesh(new THREE.CylinderGeometry(0.025,0.03,3,8),M(0xB59A3A,0.05,0.8),0,0,0));
      for(var j=0;j<9;j++){var s=j%2?1:-1;var gr=mesh(new THREE.SphereGeometry(0.09,10,8),gold,s*0.09,0.6+j*0.19,0);gr.scale.set(1,1.9,1);gr.rotation.z=s*-0.4;st.add(gr);}
      st.add(mesh(new THREE.ConeGeometry(0.07,0.3,8),gold,0,2.5,0));
      st.rotation.z=a;st.position.x=a*0.9;g.add(st);});
    g.position.y=-1.3;var w=new THREE.Group();w.add(g);return w;};
  B.pagdi=function(){var g=new THREE.Group();
    for(var i=0;i<6;i++){var t=mesh(new THREE.TorusGeometry(0.8-i*0.025,0.27,14,36),i%2?white:M(0xE9E4D4,0.05,0.85),0,i*0.24,0);t.rotation.x=Math.PI/2;t.rotation.z=i*0.5;g.add(t);}
    g.add(mesh(new THREE.CylinderGeometry(0.72,0.72,0.3,24),white,0,-0.15,0));
    var tail=mesh(new THREE.BoxGeometry(0.34,1.3,0.05),white,0.95,-0.5,0);tail.rotation.z=0.18;g.add(tail);
    g.position.y=-0.6;var w=new THREE.Group();w.add(g);return w;};
  B.target=function(){var g=new THREE.Group();
    var rs=[1.3,1.05,0.8,0.55,0.3], cs=[0xF4F1EA,0x222222,0x2B6CB0,0xC0262D,0xE8B83A];
    rs.forEach(function(r,i){var d=mesh(new THREE.CylinderGeometry(r,r,0.05,48),M(cs[i],0.1,0.6),0,0,i*0.03);d.rotation.x=Math.PI/2;g.add(d);});
    return g;};
  B.bat=function(){var g=new THREE.Group();
    g.add(mesh(new THREE.BoxGeometry(0.62,2.3,0.15),M(0xD9B27A,0.05,0.7),0,-0.2,0));
    g.add(mesh(new THREE.CylinderGeometry(0.08,0.08,1,12),dark,0,1.45,0));
    g.add(mesh(new THREE.CylinderGeometry(0.1,0.1,0.5,12),red,0,1.5,0));
    var bl=mesh(new THREE.SphereGeometry(0.3,20,16),red,1.05,-0.8,0.2);g.add(bl);
    var sm=mesh(new THREE.TorusGeometry(0.3,0.015,6,24),white,1.05,-0.8,0.2);g.add(sm);
    g.rotation.z=0.4;var w=new THREE.Group();w.add(g);return w;};
  B.shuttle=function(){var g=new THREE.Group();
    var m=new THREE.MeshStandardMaterial({color:0xF7F7F2,metalness:0,roughness:0.9,side:THREE.DoubleSide});
    var c=mesh(new THREE.ConeGeometry(0.55,1.3,22,1,true),m,0,0.3,0);c.rotation.x=Math.PI;g.add(c);
    g.add(mesh(new THREE.TorusGeometry(0.55,0.025,8,30),white,0,0.95,0).rotateX(Math.PI/2));
    g.add(mesh(new THREE.SphereGeometry(0.24,16,12),M(0xD8B27A,0.1,0.6),0,-0.45,0));
    g.rotation.z=0.5;var w=new THREE.Group();w.add(g);return w;};
  B.ring=function(){var g=new THREE.Group();
    var d=mesh(new THREE.CylinderGeometry(1.35,1.35,0.06,48),M(0xD9792B,0.1,0.7));g.add(d);
    var t=mesh(new THREE.TorusGeometry(1.35,0.07,10,48),red);t.rotation.x=Math.PI/2;g.add(t);
    var t2=mesh(new THREE.TorusGeometry(0.5,0.035,8,36),white,0,0.04,0);t2.rotation.x=Math.PI/2;g.add(t2);
    g.add(mesh(new THREE.BoxGeometry(2.7,0.04,0.05),white,0,0.04,0));
    var w=new THREE.Group();w.add(g);w.rotation.x=0.95;return w;};

  // Positions use normalized screen coordinates from -1 to 1
  var DEF=[
   ["gada",{x:.62,y:.02,s:1.0,sp:.5}],["javelin",{x:.26,y:.3,s:.95,sp:.4}],["medal",{x:.9,y:.62,s:.7,sp:.7}],
   ["hockey",{x:.4,y:-.52,s:.8,sp:.45}],["glove",{x:.9,y:-.36,s:.8,sp:.55}],["wheat",{x:-.92,y:-.15,s:.7,sp:.3}],
   ["pagdi",{x:-.8,y:-.66,s:.62,sp:.4}],["target",{x:-.6,y:.78,s:.45,sp:.6}],["bat",{x:.06,y:.82,s:.55,sp:.45}],["shuttle",{x:.7,y:.88,s:.5,sp:.6}],
   ["ring",null]
  ];
  var items=DEF.map(function(d,i){var obj=B[d[0]]();var root=new THREE.Group();root.add(obj);scene.add(root);
    return {key:d[0],obj:obj,root:root,home:d[1],cur:{x:0,y:0,s:0},ph:i*1.3,sp:d[1]?d[1].sp:.5};});
  var mode="home", sobj=null, halfW=5, halfH=3.64, unit=1, mx=0, my=0;
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize(){var w=window.innerWidth,h=window.innerHeight;renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();
    halfH=Math.tan(cam.fov*Math.PI/360)*cam.position.z;halfW=halfH*cam.aspect;unit=Math.min(halfH,halfW*1.25)/3.64;}
  window.addEventListener("resize",resize);resize();
  window.addEventListener("pointermove",function(e){mx=(e.clientX/window.innerWidth-.5)*2;my=(e.clientY/window.innerHeight-.5)*2;},{passive:true});

  var last=performance.now(), running=true, t0=last;
  function target(it){
    if(mode==="home"){return it.home?{x:it.home.x*halfW,y:it.home.y*halfH,s:it.home.s*unit}:{x:it.cur.x,y:it.cur.y,s:0};}
    if(it.key===sobj){var narrow=halfW<halfH*0.95;return narrow?{x:halfW*.45,y:halfH*.62,s:1.05*unit*1.0}:{x:halfW*.55,y:halfH*.04,s:1.5*unit};}
    return {x:it.cur.x,y:it.cur.y,s:0};
  }
  function frame(now){
    if(!running)return;
    var dt=Math.min(.05,(now-last)/1000);last=now;var t=(now-t0)/1000;var k=1-Math.exp(-dt*4.5);
    for(var i=0;i<items.length;i++){var it=items[i],tg=target(it);
      it.cur.x+=(tg.x-it.cur.x)*k;it.cur.y+=(tg.y-it.cur.y)*k;it.cur.s+=(tg.s-it.cur.s)*k;
      var vis=it.cur.s>0.02;it.root.visible=vis;if(!vis)continue;
      it.root.scale.setScalar(it.cur.s);
      it.root.position.set(it.cur.x,it.cur.y+(reduce?0:Math.sin(t*0.9+it.ph)*0.18*unit),0);
      it.obj.rotation.y+=dt*it.sp*(reduce?0.25:1);
    }
    cam.position.x+=(mx*0.7-cam.position.x)*k;cam.position.y+=(-my*0.4-cam.position.y)*k;cam.lookAt(0,0,0);
    renderer.render(scene,cam);requestAnimationFrame(frame);
  }
  document.addEventListener("visibilitychange",function(){if(document.hidden){running=false;}else if(!running){running=true;last=performance.now();requestAnimationFrame(frame);}});
  requestAnimationFrame(frame);
  return {
    set:function(m,o){mode=m;sobj=o||null;if(m==="sport"){items.forEach(function(it){if(it.key===sobj&&it.cur.s<0.02){var tg=target(it);it.cur.x=tg.x;it.cur.y=tg.y;}});}},
    theme:function(t){var d=t==="dark";amb.intensity=d?0.55:0.8;dl.intensity=d?1.05:0.9;}
  };
})();

// Starts the page
window.addEventListener("hashchange",route);
syncTheme();
route();
})();
