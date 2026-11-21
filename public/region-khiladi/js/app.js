
(function(){
"use strict";

var SAI="https://sportsauthorityofindia.nic.in/sai_new/public/directory";

// Sports, players and text shown on each sport page
var SPORTS=[], FEATURED=[], HOME_LINES=[], ACADEMIES=[], FACTS=[], DISTRICTS=[];
var REGION_ID=new URLSearchParams(location.search).get("region")||"";
var REGION=null, SPORT_CATEGORIES=[];
var DEVANAGARI={"Alpine skiing":"अल्पाइन स्कीइंग","Archery":"तीरंदाज़ी","Athletics":"एथलेटिक्स","Badminton":"बैडमिंटन","Basketball":"बास्केटबॉल","Boxing":"मुक्केबाज़ी","Cricket":"क्रिकेट","Football":"फुटबॉल","Hockey":"हॉकी","Ice hockey":"आइस हॉकी","Kabaddi":"कबड्डी","Shooting":"निशानेबाज़ी","Sepaktakraw":"सेपक टकरॉ","Squash":"स्क्वैश","Swimming":"तैराकी","Table tennis":"टेबल टेनिस","Tennis":"टेनिस","Volleyball":"वॉलीबॉल","Weightlifting":"भारोत्तोलन","Wrestling":"कुश्ती","Gymnastics":"जिम्नास्टिक्स","Para athletics":"पैरा एथलेटिक्स","Para badminton":"पैरा बैडमिंटन","Para shooting":"पैरा निशानेबाज़ी","Para table tennis":"पैरा टेबल टेनिस"};
var SPORT_OBJECT={"Alpine skiing":"skis",Archery:"bow",Athletics:"javelin",Badminton:"shuttle",Basketball:"basketball",Boxing:"glove",Cricket:"bat",Football:"football",Hockey:"hockey","Ice hockey":"icehockeystick",Kabaddi:"kabaddi",Shooting:"target",Sepaktakraw:"takrawball",Squash:"squashracket",Swimming:"goggles","Table tennis":"paddle",Tennis:"racket",Volleyball:"volleyball",Weightlifting:"barbell",Wrestling:"wrestlingmat",Gymnastics:"gymnastics","Para athletics":"javelin","Para badminton":"shuttle","Para shooting":"target","Para table tennis":"paddle"};
var PALETTES={fields:["#D29A25","#A84C32","#286448"],phulkari:["#CE4C60","#8B2F5D","#256F52"],mountains:["#6798A4","#A65B4A","#3F765B"],desert:["#D69B42","#A9573D","#67734A"],coast:["#2399A3","#B85F46","#267656"],river:["#398BA1","#A85D4B","#427551"],forest:["#578451","#A65B3D","#266448"],plateau:["#BF7546","#824B40","#65784B"],city:["#88749A","#B85F51","#2B7A70"],islands:["#2A9D9B","#B86943","#167363"],valley:["#6B8EA4","#A65F4D","#3C7658"],heritage:["#B77A42","#914B3D","#5F7650"]};
function setupRegion(payload){
  REGION=payload.regions.find(function(r){return r.id===REGION_ID;});
  if(!REGION)throw new Error("Regional profile was not found.");
  SPORT_CATEGORIES=payload.sports;
  var palette=PALETTES[REGION.story.motif]||PALETTES.plateau;
  var root=document.documentElement;
  root.dataset.region=REGION.story.motif;
  root.style.setProperty("--accent",palette[0]);
  root.style.setProperty("--accent-ink",palette[0]);
  root.style.setProperty("--clay",palette[1]);
  root.style.setProperty("--green",palette[2]);
  var athleteRows=REGION.athletes||[];
  SPORTS=SPORT_CATEGORIES.map(function(name){
    var id=name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
    var players=athleteRows.filter(function(a){return a.sport.split("·")[0].trim().toLowerCase()===name.toLowerCase();}).map(function(a){
      return {n:a.name,pl:REGION.name+" · regional record",nt:(a.highlights||[]).join(" "),u:"/athletes/"+a.id,s:"Open profile",local:true};
    });
    return {id:id,hi:DEVANAGARI[name]||name,en:name,obj:SPORT_OBJECT[name]||"medal",sa:palette[0],sb:palette[2],lines:[REGION.story.tagline,REGION.story.identityLabel,"Source-linked sporting stories from "+REGION.name+"."],fact:REGION.story.introduction,players:players};
  });
  FEATURED=athleteRows.slice(0,6).map(function(a){return a.name;});
  HOME_LINES=[REGION.story.tagline,REGION.story.introduction,"Explore "+REGION.name+" by sport, then open each listed athlete's source-linked profile."];
  athleteRows.forEach(function(a){(a.highlights||[]).forEach(function(h){FACTS.push({b:a.name,t:h});});});
  if(!FACTS.length)FACTS.push({b:"Source-linked profiles are being collected",t:"No athlete records are listed for "+REGION.name+" yet. This is a collection gap, not a claim that the region has no notable athletes."});
  DISTRICTS=athleteRows.map(function(a){return {d:a.name,k:a.sport,p:(a.highlights||[]).join(" ")};});
  ACADEMIES=[{n:"Sports Authority of India directory",w:"National directory · check current regional centres",sp:["Multiple sports"],d:"Use the official directory for current centre, programme and contact details. This page does not estimate regional academy counts.",u:"https://sportsauthorityofindia.nic.in/sai_new/public/directory",l:"Sports Authority of India"}];
  var name=document.getElementById("brandName"), mark=document.getElementById("brandMark"), footer=document.getElementById("footerBrand");
  if(name)name.textContent=REGION.name;
  if(mark)mark.textContent=REGION.name.charAt(0);
  if(footer)footer.textContent=REGION.name+" Khiladi · "+REGION.story.tagline;
  KEY="hk-player-"+REGION.id;
  document.getElementById("megaIn").innerHTML=SPORTS.map(function(s){return '<a href="#sport-'+s.id+'"><span class="hi">'+s.hi+'</span><span class="en">'+esc(s.en)+'</span></a>';}).join("");
  document.querySelector(".brand")?.setAttribute("aria-label",REGION.name+" Khiladi home");
  document.title=REGION.name+" Khiladi | Indian Sports Directory";
}

// Small helpers used by the page sections
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function ini(n){var p=n.trim().split(/\s+/);return (p[0][0]+(p.length>1?p[p.length-1][0]:"")).toUpperCase();}
function byId(id){for(var i=0;i<SPORTS.length;i++)if(SPORTS[i].id===id)return SPORTS[i];return null;}
function findPlayer(name){for(var i=0;i<SPORTS.length;i++)for(var j=0;j<SPORTS[i].players.length;j++)if(SPORTS[i].players[j].n===name)return SPORTS[i].players[j];return null;}
function officialAthleteRoster(){
  var supported={"Andhra Pradesh":1,"Arunachal Pradesh":1,"Assam":1,"Bihar":1,"Chandigarh":1,"Chhattisgarh":1,"Delhi":1,"Goa":1,"Gujarat":1,"Haryana":1,"Himachal Pradesh":1,"Jammu and Kashmir":1,"Jharkhand":1,"Karnataka":1,"Kerala":1,"Madhya Pradesh":1,"Maharashtra":1,"Manipur":1,"Meghalaya":1,"Mizoram":1,"Nagaland":1,"Odisha":1,"Puducherry":1,"Punjab":1,"Rajasthan":1,"Sikkim":1,"Tamil Nadu":1,"Telangana":1,"Tripura":1,"Uttar Pradesh":1,"Uttarakhand":1,"West Bengal":1};
  if(!REGION||!supported[REGION.name])return "";
  return "https://indianathletics.in/athlete-profiles/?astate="+encodeURIComponent(REGION.name);
}
function pcard(p){
  return '<a class="pcard" href="'+esc(p.u)+'" target="'+(p.local?'_top':'_blank')+'" rel="noopener noreferrer">'+
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
  var base={"para-athletics":"athletics","para-badminton":"badminton","para-shooting":"shooting","para-table-tennis":"table-tennis"}[id]||id;
  if(base==="alpine-skiing"){
    o+='<rect width="1200" height="800" fill="#A9CBD8"/><path d="M0 540 240 190 425 430 660 95 930 430 1080 250 1200 405V800H0Z" fill="#EAF2F1"/><path d="M0 630 270 380 455 560 740 280 1000 530 1200 370V800H0Z" fill="#65818A"/><path d="M0 700 Q300 540 620 685 T1200 650V800H0Z" fill="#DCE7E1"/><path d="M240 190 205 245 273 232 660 95 615 174 681 158 1080 250 1040 299 1097 288" fill="#fff"/><line x1="390" y1="350" x2="810" y2="710" stroke="#D84535" stroke-width="12" stroke-dasharray="16 22"/><line x1="810" y1="710" x2="1110" y2="600" stroke="#D84535" stroke-width="12" stroke-dasharray="16 22"/>';
  }else if(base==="ice-hockey"){
    o+='<rect width="1200" height="800" fill="#A8D9E6"/><rect x="90" y="100" width="1020" height="600" rx="150" fill="#D8F0F2" stroke="#fff" stroke-width="10"/><line x1="600" y1="105" x2="600" y2="695" stroke="#D84535" stroke-width="9"/><line x1="355" y1="105" x2="355" y2="695" stroke="#2476A6" stroke-width="8"/><line x1="845" y1="105" x2="845" y2="695" stroke="#2476A6" stroke-width="8"/><circle cx="600" cy="400" r="100" fill="none" stroke="#2476A6" stroke-width="7"/><circle cx="355" cy="270" r="64" fill="none" stroke="#2476A6" stroke-width="6"/><circle cx="355" cy="530" r="64" fill="none" stroke="#2476A6" stroke-width="6"/><circle cx="845" cy="270" r="64" fill="none" stroke="#2476A6" stroke-width="6"/><circle cx="845" cy="530" r="64" fill="none" stroke="#2476A6" stroke-width="6"/><path d="M90 290 A120 120 0 0 1 210 410 H90 M1110 290 A120 120 0 0 0 990 410 H1110" fill="none" stroke="#D84535" stroke-width="7"/><circle cx="600" cy="400" r="10" fill="#222"/>';
  }else if(base==="sepaktakraw"){
    o+='<rect width="1200" height="800" fill="#2B5C46"/><rect x="115" y="115" width="970" height="570" fill="#8A5B43" stroke="#fff" stroke-width="6"/><line x1="600" y1="115" x2="600" y2="685" stroke="#fff" stroke-width="5"/><circle cx="600" cy="400" r="80" fill="none" stroke="#fff" stroke-width="4"/><rect x="115" y="375" width="970" height="12" fill="#F4F1EA"/><line x1="150" y1="360" x2="1050" y2="360" stroke="#DDD4C5" stroke-width="7" stroke-dasharray="9 9"/><path d="M250 125v230M950 125v230" stroke="#F4F1EA" stroke-width="5"/>';
  }else if(base==="squash"){
    o+='<rect width="1200" height="800" fill="#E9D4AF"/><rect x="180" y="80" width="840" height="650" fill="#F0E5D2" stroke="#fff" stroke-width="10"/><line x1="180" y1="620" x2="1020" y2="620" stroke="#D84535" stroke-width="9"/><line x1="180" y1="235" x2="1020" y2="235" stroke="#D84535" stroke-width="7"/><line x1="600" y1="235" x2="600" y2="620" stroke="#D84535" stroke-width="5"/><rect x="180" y="80" width="840" height="650" fill="none" stroke="#C8BDA8" stroke-width="3"/>';
  }else if(base==="athletics"){
    o+='<rect width="1200" height="800" fill="var(--sa)"/>';
    for(i=0;i<6;i++){var w=960-i*80,h=600-i*80;o+='<rect x="'+(120+i*40)+'" y="'+(100+i*40)+'" width="'+w+'" height="'+h+'" rx="'+Math.min(260-i*30,h/2)+'" fill="none" stroke="#fff" stroke-width="3"/>';}
    o+='<rect x="360" y="340" width="480" height="120" rx="60" fill="var(--sb)"/>';
    o+='<line x1="600" y1="100" x2="600" y2="260" stroke="#fff" stroke-width="6"/>';
  }else if(base==="wrestling"){
    o+='<rect width="1200" height="800" fill="var(--sa)"/>';
    o+='<defs><pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="2" fill="#000" opacity=".18"/><circle cx="20" cy="18" r="1.5" fill="#000" opacity=".14"/></pattern></defs>';
    o+='<rect width="1200" height="800" fill="url(#dots)"/>';
    o+='<circle cx="600" cy="400" r="380" fill="#B8321F" opacity=".85"/><circle cx="600" cy="400" r="300" fill="var(--sb)"/><circle cx="600" cy="400" r="300" fill="none" stroke="#fff" stroke-width="5"/><circle cx="600" cy="400" r="120" fill="none" stroke="#fff" stroke-width="3"/><circle cx="600" cy="400" r="14" fill="#fff"/>';
  }else if(base==="boxing"){
    o+='<rect width="1200" height="800" fill="var(--sb)"/>';
    o+='<polygon points="40,800 1160,800 1010,470 190,470" fill="#0000001f" stroke="#fff" stroke-width="3"/>';
    o+='<ellipse cx="600" cy="640" rx="170" ry="60" fill="none" stroke="#fff" stroke-width="4"/>';
    for(i=0;i<3;i++){var y=300+i*62;o+='<line x1="60" y1="'+y+'" x2="1140" y2="'+y+'" stroke="var(--sa)" stroke-width="'+(12-i*2)+'" stroke-linecap="round"/>';}
    for(i=0;i<3;i++){var y2=240+i*40;o+='<line x1="190" y1="'+y2+'" x2="1010" y2="'+y2+'" stroke="var(--sa)" stroke-width="5" opacity=".6"/>';}
    o+='<rect x="40" y="200" width="30" height="330" rx="8" fill="#fff"/><rect x="1130" y="200" width="30" height="330" rx="8" fill="#fff"/>';
  }else if(base==="shooting"){
    o+='<rect width="1200" height="800" fill="var(--sa)"/>';
    var cols=["#F4F1EA","#222","#2B6CB0","#C0262D","var(--sb)","#222"];var rs=[360,300,240,180,120,50];
    for(i=0;i<rs.length;i++)o+='<circle cx="820" cy="400" r="'+rs[i]+'" fill="'+cols[i]+'" stroke="#fff" stroke-width="2"/>';
    o+='<line x1="420" y1="400" x2="1200" y2="400" stroke="#fff" stroke-width="2" opacity=".6"/><line x1="820" y1="0" x2="820" y2="800" stroke="#fff" stroke-width="2" opacity=".6"/>';
    var holes=[[840,380],[800,420],[860,410],[815,360],[900,430],[760,370]];
    for(i=0;i<holes.length;i++)o+='<circle cx="'+holes[i][0]+'" cy="'+holes[i][1]+'" r="9" fill="#000" opacity=".8"/>';
  }else if(base==="hockey"){
    o+='<rect width="1200" height="800" fill="var(--sa)"/>';
    for(i=0;i<8;i++)o+='<rect x="'+(80+i*140)+'" y="120" width="70" height="560" fill="var(--sb)" opacity=".5"/>';
    o+='<rect x="80" y="120" width="1040" height="560" fill="none" stroke="#fff" stroke-width="5"/>';
    o+='<line x1="600" y1="120" x2="600" y2="680" stroke="#fff" stroke-width="4"/><line x1="340" y1="120" x2="340" y2="680" stroke="#fff" stroke-width="3" stroke-dasharray="14 12"/><line x1="860" y1="120" x2="860" y2="680" stroke="#fff" stroke-width="3" stroke-dasharray="14 12"/>';
    o+='<path d="M80 230 A170 170 0 0 1 80 570" fill="none" stroke="#fff" stroke-width="4"/><path d="M1120 230 A170 170 0 0 0 1120 570" fill="none" stroke="#fff" stroke-width="4"/><circle cx="600" cy="400" r="8" fill="#fff"/>';
  }else if(base==="kabaddi"){
    o+='<rect width="1200" height="800" fill="var(--sb)"/>';
    o+='<rect x="130" y="190" width="940" height="420" fill="var(--sa)" stroke="#fff" stroke-width="5"/>';
    o+='<rect x="130" y="190" width="940" height="38" fill="#00000026"/><rect x="130" y="572" width="940" height="38" fill="#00000026"/>';
    o+='<line x1="600" y1="190" x2="600" y2="610" stroke="#fff" stroke-width="5"/><line x1="440" y1="190" x2="440" y2="610" stroke="#fff" stroke-width="3"/><line x1="760" y1="190" x2="760" y2="610" stroke="#fff" stroke-width="3"/><line x1="380" y1="190" x2="380" y2="610" stroke="#fff" stroke-width="3" stroke-dasharray="10 10"/><line x1="820" y1="190" x2="820" y2="610" stroke="#fff" stroke-width="3" stroke-dasharray="10 10"/>';
  }else if(base==="cricket"){
    o+='<rect width="1200" height="800" fill="var(--sa)"/>';
    for(i=0;i<10;i++)o+='<rect x="'+(i*120)+'" y="0" width="60" height="800" fill="#fff" opacity=".06"/>';
    o+='<ellipse cx="600" cy="400" rx="520" ry="330" fill="none" stroke="#fff" stroke-width="5"/><ellipse cx="600" cy="400" rx="300" ry="190" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="14 12"/>';
    o+='<rect x="565" y="190" width="70" height="420" fill="var(--sb)"/>';
    o+='<line x1="550" y1="236" x2="650" y2="236" stroke="#fff" stroke-width="4"/><line x1="550" y1="564" x2="650" y2="564" stroke="#fff" stroke-width="4"/><line x1="565" y1="198" x2="635" y2="198" stroke="#fff" stroke-width="3"/><line x1="565" y1="602" x2="635" y2="602" stroke="#fff" stroke-width="3"/>';
    for(i=0;i<3;i++)o+='<rect x="'+(588+i*10)+'" y="190" width="4" height="14" fill="#fff"/><rect x="'+(588+i*10)+'" y="596" width="4" height="14" fill="#fff"/>';
  }else if(base==="badminton"){
    o+='<rect width="1200" height="800" fill="var(--sb)"/>';
    o+='<rect x="150" y="195" width="900" height="410" fill="var(--sa)" stroke="#fff" stroke-width="5"/>';
    o+='<line x1="150" y1="226" x2="1050" y2="226" stroke="#fff" stroke-width="4"/><line x1="150" y1="574" x2="1050" y2="574" stroke="#fff" stroke-width="4"/>';
    o+='<line x1="467" y1="195" x2="467" y2="605" stroke="#fff" stroke-width="4"/><line x1="733" y1="195" x2="733" y2="605" stroke="#fff" stroke-width="4"/><line x1="201" y1="195" x2="201" y2="605" stroke="#fff" stroke-width="4"/><line x1="999" y1="195" x2="999" y2="605" stroke="#fff" stroke-width="4"/>';
    o+='<line x1="150" y1="400" x2="467" y2="400" stroke="#fff" stroke-width="4"/><line x1="733" y1="400" x2="1050" y2="400" stroke="#fff" stroke-width="4"/><line x1="600" y1="170" x2="600" y2="630" stroke="#fff" stroke-width="8"/>';
  }else if(base==="archery"){
    o+='<rect width="1200" height="800" fill="var(--sa)"/><rect x="90" y="140" width="1020" height="520" fill="var(--sb)" opacity=".22" stroke="#fff" stroke-width="4"/><line x1="160" y1="210" x2="1040" y2="210" stroke="#fff" stroke-width="3"/><line x1="160" y1="590" x2="1040" y2="590" stroke="#fff" stroke-width="3"/><line x1="600" y1="140" x2="600" y2="660" stroke="#fff" stroke-width="3" stroke-dasharray="12 12"/><circle cx="920" cy="400" r="135" fill="#F4F1EA"/><circle cx="920" cy="400" r="108" fill="#222"/><circle cx="920" cy="400" r="81" fill="#2B6CB0"/><circle cx="920" cy="400" r="54" fill="#C0262D"/><circle cx="920" cy="400" r="27" fill="#E8B83A"/> <path d="M282 244 Q476 400 282 556" fill="none" stroke="#F4F1EA" stroke-width="12"/><line x1="282" y1="400" x2="520" y2="400" stroke="#F4F1EA" stroke-width="5"/>';
  }else if(base==="basketball"){
    o+='<rect width="1200" height="800" fill="var(--sa)"/><rect x="90" y="90" width="1020" height="620" fill="none" stroke="#fff" stroke-width="5"/><line x1="600" y1="90" x2="600" y2="710" stroke="#fff" stroke-width="4"/><circle cx="600" cy="400" r="105" fill="none" stroke="#fff" stroke-width="4"/><path d="M90 250 Q260 250 260 400 Q260 550 90 550 M1110 250 Q940 250 940 400 Q940 550 1110 550" fill="none" stroke="#fff" stroke-width="4"/><rect x="140" y="370" width="12" height="60" fill="#fff"/><ellipse cx="216" cy="400" rx="46" ry="12" fill="none" stroke="#F4B942" stroke-width="8"/><rect x="1048" y="370" width="12" height="60" fill="#fff"/><ellipse cx="984" cy="400" rx="46" ry="12" fill="none" stroke="#F4B942" stroke-width="8"/>';
  }else if(base==="football"){
    o+='<rect width="1200" height="800" fill="#34754A"/><rect x="70" y="70" width="1060" height="660" fill="none" stroke="#fff" stroke-width="5"/><line x1="600" y1="70" x2="600" y2="730" stroke="#fff" stroke-width="4"/><circle cx="600" cy="400" r="110" fill="none" stroke="#fff" stroke-width="4"/><rect x="70" y="260" width="170" height="280" fill="none" stroke="#fff" stroke-width="4"/><rect x="960" y="260" width="170" height="280" fill="none" stroke="#fff" stroke-width="4"/><rect x="70" y="330" width="50" height="140" fill="none" stroke="#fff" stroke-width="4"/><rect x="1080" y="330" width="50" height="140" fill="none" stroke="#fff" stroke-width="4"/><circle cx="600" cy="400" r="7" fill="#fff"/>';
  }else if(base==="swimming"){
    o+='<rect width="1200" height="800" fill="#1C7790"/><path d="M0 120 Q70 85 140 120 T280 120 T420 120 T560 120 T700 120 T840 120 T980 120 T1120 120 T1260 120 M0 680 Q70 645 140 680 T280 680 T420 680 T560 680 T700 680 T840 680 T980 680 T1120 680 T1260 680" fill="none" stroke="#fff" stroke-width="5" opacity=".8"/>';
    for(i=0;i<8;i++){var y=190+i*60;o+='<line x1="50" y1="'+y+'" x2="1150" y2="'+y+'" stroke="#fff" stroke-width="2" opacity=".55"/><line x1="50" y1="'+(y+28)+'" x2="1150" y2="'+(y+28)+'" stroke="#F4B942" stroke-width="5" stroke-dasharray="18 14"/>';}
    o+='<line x1="50" y1="165" x2="50" y2="650" stroke="#fff" stroke-width="8"/><line x1="1150" y1="165" x2="1150" y2="650" stroke="#fff" stroke-width="8"/>';
  }else if(base==="table-tennis"){
    o+='<rect width="1200" height="800" fill="var(--sb)"/><polygon points="120,210 1080,210 960,620 240,620" fill="#187B55" stroke="#fff" stroke-width="6"/><line x1="600" y1="210" x2="600" y2="620" stroke="#fff" stroke-width="4"/><line x1="240" y1="415" x2="960" y2="415" stroke="#fff" stroke-width="4"/><line x1="210" y1="405" x2="990" y2="405" stroke="#F4F1EA" stroke-width="10"/><line x1="240" y1="620" x2="240" y2="680" stroke="#222" stroke-width="8"/><line x1="960" y1="620" x2="960" y2="680" stroke="#222" stroke-width="8"/>';
  }else if(base==="tennis"){
    o+='<rect width="1200" height="800" fill="#317A55"/><rect x="180" y="100" width="840" height="600" fill="#567DB1" stroke="#fff" stroke-width="6"/><line x1="600" y1="100" x2="600" y2="700" stroke="#fff" stroke-width="4"/><line x1="180" y1="400" x2="1020" y2="400" stroke="#fff" stroke-width="7"/><line x1="300" y1="100" x2="300" y2="700" stroke="#fff" stroke-width="4"/><line x1="900" y1="100" x2="900" y2="700" stroke="#fff" stroke-width="4"/><line x1="300" y1="250" x2="900" y2="250" stroke="#fff" stroke-width="4"/><line x1="300" y1="550" x2="900" y2="550" stroke="#fff" stroke-width="4"/><line x1="180" y1="400" x2="1020" y2="400" stroke="#F4F1EA" stroke-width="8"/>';
  }else if(base==="volleyball"){
    o+='<rect width="1200" height="800" fill="#C9854A"/><rect x="110" y="120" width="980" height="560" fill="#D8A06A" stroke="#fff" stroke-width="5"/><line x1="600" y1="120" x2="600" y2="680" stroke="#fff" stroke-width="4"/><line x1="420" y1="120" x2="420" y2="680" stroke="#fff" stroke-width="3"/><line x1="780" y1="120" x2="780" y2="680" stroke="#fff" stroke-width="3"/><line x1="110" y1="400" x2="1090" y2="400" stroke="#fff" stroke-width="7"/><line x1="580" y1="90" x2="580" y2="710" stroke="#333" stroke-width="7"/><line x1="620" y1="90" x2="620" y2="710" stroke="#333" stroke-width="7"/><path d="M580 120 H620 M580 150 H620 M580 180 H620 M580 210 H620 M580 240 H620 M580 270 H620 M580 300 H620 M580 330 H620 M580 360 H620 M580 390 H620 M580 420 H620 M580 450 H620 M580 480 H620 M580 510 H620 M580 540 H620 M580 570 H620 M580 600 H620 M580 630 H620 M580 660 H620" stroke="#fff" stroke-width="2"/>';
  }else if(base==="weightlifting"){
    o+='<rect width="1200" height="800" fill="#35454A"/><rect x="230" y="500" width="740" height="170" rx="8" fill="#8D5E3B" stroke="#F4F1EA" stroke-width="5"/><rect x="280" y="530" width="640" height="110" fill="#A97749"/><line x1="210" y1="350" x2="990" y2="350" stroke="#C8D0D8" stroke-width="18"/><rect x="260" y="250" width="75" height="200" rx="20" fill="#1D1D22"/><rect x="185" y="285" width="65" height="130" rx="15" fill="#C0262D"/><rect x="335" y="285" width="65" height="130" rx="15" fill="#2B6CB0"/><rect x="865" y="250" width="75" height="200" rx="20" fill="#1D1D22"/><rect x="950" y="285" width="65" height="130" rx="15" fill="#C0262D"/><rect x="800" y="285" width="65" height="130" rx="15" fill="#2B6CB0"/>';
  }else if(base==="gymnastics"){
    o+='<rect width="1200" height="800" fill="#365B78"/><rect x="85" y="95" width="1030" height="610" fill="#477FA0" stroke="#F4F1EA" stroke-width="5"/><rect x="155" y="170" width="890" height="460" fill="#C97858" opacity=".82"/><path d="M155 400 H1045 M600 170 V630" stroke="#F4F1EA" stroke-width="4" stroke-dasharray="15 12"/><rect x="320" y="340" width="560" height="28" rx="8" fill="#D6A56F"/><line x1="390" y1="368" x2="390" y2="520" stroke="#C8D0D8" stroke-width="14"/><line x1="810" y1="368" x2="810" y2="520" stroke="#C8D0D8" stroke-width="14"/>';
  }else{
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
  if(!feat){var rosterURL=officialAthleteRoster();feat='<article class="pcard"><h3>Regional player records</h3><p>Profiles are being added as athlete name, sport and regional records are verified.</p>'+(rosterURL?'<a class="pc-go" href="'+esc(rosterURL)+'" target="_blank" rel="noopener noreferrer">Open official '+esc(REGION.name)+' athletics roster <span aria-hidden="true">&#8599;</span></a>':'<a class="pc-go" href="https://olympic.ind.in/members/" target="_blank" rel="noopener noreferrer">Explore the official Olympic association directory <span aria-hidden="true">&#8599;</span></a>')+'</article>';}
  view.innerHTML=
  '<div class="home-glow" aria-hidden="true"></div>'+ 
  '<section class="hero"><div class="wrap"><div class="hero-copy">'+
    '<p class="eyebrow">'+esc(REGION.zone)+' · '+esc(REGION.type)+'</p>'+ 
    '<h1>'+esc(REGION.name)+'<span>Khiladi</span></h1>'+ 
    '<p class="sub">'+esc(REGION.story.tagline)+'</p>'+ 
    '<p class="rot" id="rot" aria-live="off">'+esc(HOME_LINES[0])+'</p>'+ 
    '<div class="hero-cta"><a class="btn pri" href="#sports">Khel chuno</a><a class="btn" href="#academies">Training directories</a></div>'+ 
  '</div></div></section>'+ 
  '<section class="sec"><div class="wrap">'+
    '<div class="sec-head"><p class="eyebrow">Athlete directory</p><h2 class="h-sec">Players connected with '+esc(REGION.name)+'</h2><p>Open a listed profile to see its public source links. Athlete coverage grows as records are checked.</p></div>'+ 
    '<div class="pgrid">'+feat+'</div></div></section>'+ 
  '<section class="band"><div class="wrap sec band-in"><blockquote>'+esc(REGION.story.tagline)+'</blockquote>'+ 
    '<div><div class="tags"><span class="tag">'+esc(REGION.type)+'</span><span class="tag">'+esc(REGION.zone)+' region</span><span class="tag">Capital: '+esc(REGION.capital)+'</span></div>'+ 
    '<p>'+esc(REGION.story.introduction)+'</p></div></div></section>'+ 
  '<section class="sec" id="sports"><div class="wrap">'+ 
    '<div class="sec-head"><p class="eyebrow">Sports directory</p><h2 class="h-sec">Choose a sport in '+esc(REGION.name)+'</h2><p>Each sport opens its own roster. A zero count means verified entries have not yet been added.</p></div>'+ 
    '<div class="stiles">'+SPORTS.map(stile).join("")+'</div></div></section>'+ 
  '<section class="sec"><div class="wrap">'+ 
    '<div class="sec-head"><p class="eyebrow">Source-linked records</p><h2 class="h-sec">Athlete journeys from '+esc(REGION.name)+'</h2></div>'+ 
    '<div class="fgrid">'+FACTS.slice(0,3).map(function(f){return '<div class="fcard"><span class="big">'+esc(f.b)+'</span><p>'+esc(f.t)+'</p></div>';}).join("")+'</div>'+ 
    '<div class="hero-cta" style="margin-top:22px"><a class="btn" href="#jaano">Regional context &amp; sources</a></div></div></section>';
  var el=document.getElementById("rot"), n=0;
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(rotTimer)clearInterval(rotTimer);
  rotTimer=setInterval(function(){n=(n+1)%HOME_LINES.length;if(reduce){el.textContent=HOME_LINES[n];return;}el.classList.add("out");setTimeout(function(){el.textContent=HOME_LINES[n];el.classList.remove("out");},350);},4800);
}

function viewSport(s){
  var others=SPORTS.filter(function(x){return x.id!==s.id;}).map(function(x){return '<a class="chip" href="#sport-'+x.id+'">'+x.hi+' &middot; '+esc(x.en)+'</a>';}).join("");
  var roster=s.players.length?s.players.map(pcard).join(""):'<article class="pcard"><h3>No verified '+esc(s.en)+' profiles listed yet</h3><p>This is a collection gap, not a claim that '+esc(REGION.name)+' has no '+esc(s.en)+' athletes.</p><a class="pc-go" href="/data-notes" target="_top">How records are sourced <span aria-hidden="true">&#8599;</span></a>'+(officialAthleteRoster()?'<a class="pc-go" href="'+esc(officialAthleteRoster())+'" target="_blank" rel="noopener noreferrer">Browse the official '+esc(REGION.name)+' athletics roster <span aria-hidden="true">&#8599;</span></a>':'')+'</article>';
  view.innerHTML='<section class="sp-hero"><div class="wrap"><p class="eyebrow">'+esc(REGION.name)+' &middot; '+esc(s.en)+'</p><h1 class="sp-hi">'+s.hi+'</h1><p class="sp-en">'+esc(s.en)+'</p><blockquote class="sp-line">'+esc(REGION.story.tagline)+'</blockquote><div class="bol"><span>'+esc(REGION.story.identityLabel)+'</span><span>'+esc(REGION.capital)+'</span></div><p class="sp-fact">'+esc(REGION.story.introduction)+'</p></div></section>'+ 
  '<section class="sec"><div class="wrap"><p class="count">'+s.players.length+' listed '+(s.players.length===1?'profile':'profiles')+' &middot; open a card for its source</p><div class="pgrid">'+roster+'<a class="pcard add" href="#players"><h3>Aapka naam yahan?</h3><p>Player ho? Player Corner mein apna card banao.</p><span class="pc-go"><span>Player Corner</span><span aria-hidden="true">&rarr;</span></span></a></div></div></section>'+ 
  '<section class="sec" style="padding-top:0"><div class="wrap"><p class="count">Doosre khel</p><div class="chips">'+others+'</div></div></section>';
}

function viewAcademies(){
  var regionalLinks=(REGION.story.links||[]).map(function(a){return '<a class="btn" href="'+esc(a.url)+'" target="_blank" rel="noopener noreferrer">'+esc(a.label)+' &#8599;</a>';}).join("");
  view.innerHTML='<section class="sec"><div class="wrap"><div class="sec-head"><p class="eyebrow">Training directories</p><h1 class="h-sec">Find sports centres near '+esc(REGION.name)+'</h1><p>Use current official directories to confirm centres, sports offered and contact details. No unverified local academy list is shown.</p></div><div class="agrid">'+ACADEMIES.map(function(a){return '<article class="acard"><span class="where">'+esc(a.w)+'</span><h3>'+esc(a.n)+'</h3><div class="sp">'+a.sp.map(function(x){return '<span>'+esc(x)+'</span>';}).join("")+'</div><p>'+esc(a.d)+'</p><a class="go" href="'+esc(a.u)+'" target="_blank" rel="noopener noreferrer">'+esc(a.l)+' &#8599;</a></article>';}).join("")+'</div><div class="officials"><a class="btn pri" href="https://sportsauthorityofindia.nic.in/sai_new/public/directory" target="_blank" rel="noopener noreferrer">Sports Authority of India &#8599;</a>'+regionalLinks+'</div></div></section>';
}

function viewJaano(){
  var regionalLinks=(REGION.story.links||[]).map(function(a){return '<a class="go" href="'+esc(a.url)+'" target="_blank" rel="noopener noreferrer">'+esc(a.label)+' &#8599;</a>';}).join("");
  if(!regionalLinks)regionalLinks='<p class="note">Regional cultural references will be added when a reliable public source is available.</p>';
  var records=DISTRICTS.length?DISTRICTS.map(function(d){return '<article class="dcell"><span class="k">'+esc(d.k)+'</span><h3>'+esc(d.d)+'</h3><p>'+esc(d.p)+'</p></article>';}).join(""):'<article class="dcell"><span class="k">Coverage status</span><h3>Profiles are being collected</h3><p>No source-linked athlete records are listed for '+esc(REGION.name)+' yet.</p></article>';
  view.innerHTML='<section class="sec"><div class="wrap"><div class="sec-head"><p class="eyebrow">Jaano</p><h1 class="h-sec">'+esc(REGION.name)+': regional context</h1><p>'+esc(REGION.story.introduction)+'</p></div><div class="fgrid">'+FACTS.map(function(f){return '<div class="fcard"><span class="big">'+esc(f.b)+'</span><p>'+esc(f.t)+'</p></div>';}).join("")+'</div></div></section>'+ 
  '<section class="sec" style="padding-top:0"><div class="wrap"><div class="sec-head"><p class="eyebrow">Profiles &amp; records</p><h2 class="h-sec">Listed athletes from '+esc(REGION.name)+'</h2><p>Each entry uses its listed sport and public-source notes. Missing records are still being researched.</p></div><div class="dgrid">'+records+'</div><div class="sec-head" style="margin-top:36px"><p class="eyebrow">Regional links</p><h2 class="h-sec">Explore '+esc(REGION.name)+'</h2>'+regionalLinks+'</div><div class="hero-cta" style="margin-top:24px"><a class="btn pri" href="#sports">Khel dekho</a><a class="btn" href="#players">Player Corner</a></div></div></section>';
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
  B.ball=function(color,seam){var g=new THREE.Group(),ball=mesh(new THREE.SphereGeometry(1.18,36,28),M(color,0.08,0.42));g.add(ball);
    var l1=mesh(new THREE.TorusGeometry(1.18,0.025,8,72),M(seam,0.05,0.6));l1.rotation.x=Math.PI/2;g.add(l1);
    var l2=mesh(new THREE.TorusGeometry(1.18,0.025,8,72),M(seam,0.05,0.6));l2.rotation.y=Math.PI/2;g.add(l2);
    var l3=mesh(new THREE.TorusGeometry(1.18,0.025,8,72),M(seam,0.05,0.6));l3.rotation.z=Math.PI/2;g.add(l3);return g;};
  B.basketball=function(){return B.ball(0xD9772B,0x242424);};
  B.football=function(){var g=B.ball(0xF1F0E8,0x222222);g.add(mesh(new THREE.DodecahedronGeometry(0.28,0),M(0x222222,0.05,0.8),0,0.92,0.33));return g;};
  B.volleyball=function(){var g=B.ball(0xF4E8C7,0x2586A1);var s=mesh(new THREE.TorusGeometry(1.19,0.045,8,48),M(0xD9A73A,0.05,0.5));s.rotation.set(.5,.8,.3);g.add(s);return g;};
  B.goggles=function(){var g=new THREE.Group();
    [-0.62,0.62].forEach(function(x){var lens=mesh(new THREE.TorusGeometry(.48,.12,12,32),M(0x19A6B5,.55,.24),x,0,0);g.add(lens);var glass=mesh(new THREE.SphereGeometry(.39,24,16),M(0x8BE1E5,.5,.2),x,0,.03);glass.scale.z=.2;g.add(glass);});
    var bridge=mesh(new THREE.TorusGeometry(.58,.06,8,24,Math.PI),steel,0,.04,0);bridge.rotation.z=Math.PI;g.add(bridge);return g;};
  B.paddle=function(){var g=new THREE.Group(),face=mesh(new THREE.CylinderGeometry(.72,.72,.12,40),M(0xC0262D,.15,.5),0,.4,0);face.rotation.x=Math.PI/2;g.add(face);
    var edge=mesh(new THREE.TorusGeometry(.72,.06,10,40),wood,0,.4,0);edge.rotation.x=Math.PI/2;g.add(edge);
    g.add(mesh(new THREE.CylinderGeometry(.12,.16,.9,16),wood,0,-.12,0));return g;};
  B.racket=function(){var g=new THREE.Group(),head=mesh(new THREE.TorusGeometry(.9,.07,12,48),steel,0,.5,0);head.scale.set(.82,1.25,1);head.rotation.x=Math.PI/2;g.add(head);
    var strings=M(0xE9E6DC,.05,.85);for(var i=-3;i<=3;i++){var a=mesh(new THREE.CylinderGeometry(.012,.012,1.8,6),strings,i*.18,.5,.08);a.rotation.z=i*.08;g.add(a);}
    for(var j=-3;j<=3;j++){var b=mesh(new THREE.CylinderGeometry(.012,.012,1.45,6),strings,0,.5+j*.18,.08);b.rotation.z=Math.PI/2;g.add(b);}
    g.add(mesh(new THREE.CylinderGeometry(.13,.16,1.15,14),wood,0,-.55,0));return g;};
  B.barbell=function(){var g=new THREE.Group();g.add(mesh(new THREE.CylinderGeometry(.07,.07,4.2,18),steel,0,0,0));
    [-1.25,-.95, .95,1.25].forEach(function(x,i){var p=mesh(new THREE.CylinderGeometry(i%2?.55:.38,i%2?.55:.38,.18,28),i%2?red:dark,x,0,0);g.add(p);});return g;};
  B.bow=function(){var g=new THREE.Group(),pts=[new THREE.Vector3(0,-1.5,0),new THREE.Vector3(.85,-1,0),new THREE.Vector3(1.25,0,0),new THREE.Vector3(.85,1,0),new THREE.Vector3(0,1.5,0)],curve=new THREE.CatmullRomCurve3(pts);
    g.add(new THREE.Mesh(new THREE.TubeGeometry(curve,48,.07,10,false),wood));g.add(mesh(new THREE.CylinderGeometry(.018,.018,3,8),white,0,0,.02));
    var shaft=mesh(new THREE.CylinderGeometry(.025,.025,2.4,8),steel,1.18,0,0);shaft.rotation.z=Math.PI/2;g.add(shaft);var tip=mesh(new THREE.ConeGeometry(.09,.28,10),steel,2.45,0,0);tip.rotation.z=-Math.PI/2;g.add(tip);return g;};
  B.kabaddi=function(){var g=new THREE.Group(),mat=mesh(new THREE.BoxGeometry(3.8,.12,2.2),M(0x9D5841,.05,.8),0,-.3,0);g.add(mat);
    var lines=M(0xF4F1EA,.05,.8);[-1.7,-.8,0,.8,1.7].forEach(function(x){var l=mesh(new THREE.BoxGeometry(.035,.02,2.1),lines,x,-.22,0);g.add(l);});
    var mid=mesh(new THREE.BoxGeometry(3.7,.02,.04),lines,0,-.22,0);g.add(mid);return g;};
  B.wrestlingmat=function(){var g=new THREE.Group(),m=mesh(new THREE.CylinderGeometry(1.7,1.7,.16,48),M(0xB8321F,.05,.78),0,-.35,0);g.add(m);
    [1.35,.85,.3].forEach(function(r,i){var c=mesh(new THREE.TorusGeometry(r,.035,8,48),i===0?white:gold,0,-.25+i*.015,0);g.add(c);});return g;};
  B.gymnastics=function(){var g=new THREE.Group(),beam=mesh(new THREE.BoxGeometry(3.4,.18,.28),M(0xC99359,.05,.64),0,.05,0);g.add(beam);
    [-1.15,1.15].forEach(function(x){g.add(mesh(new THREE.CylinderGeometry(.06,.1,1.4,12),steel,x,-.65,0));});
    var base=mesh(new THREE.BoxGeometry(4,.12,1.4),M(0x507DB1,.05,.7),0,-1.42,0);g.add(base);return g;};
  B.skis=function(){var g=new THREE.Group(),skiMat=M(0xE9F1F2,.25,.35),poleMat=M(0xC8D0D8,.75,.28);
    [-.52,.52].forEach(function(x,i){var ski=mesh(new THREE.BoxGeometry(.16,4.2,.12),i?red:steel,x,0,0);ski.rotation.z=i?.08:-.08;g.add(ski);var tip=mesh(new THREE.SphereGeometry(.09,12,10),skiMat,x,2.08,0);tip.scale.set(1,1.8,1);g.add(tip);var pole=mesh(new THREE.CylinderGeometry(.025,.035,3.6,10),poleMat,x*2.2,0,-.12);pole.rotation.z=i?.18:-.18;g.add(pole);});return g;};
  B.icehockeystick=function(){var g=new THREE.Group(),woodMat=M(0x9B643B,.08,.62);var shaft=mesh(new THREE.CylinderGeometry(.065,.08,3.3,12),woodMat,0,.25,0);shaft.rotation.z=.08;g.add(shaft);var blade=mesh(new THREE.BoxGeometry(.18,.78,.24),woodMat,.3,-1.48,0);blade.rotation.z=-.28;g.add(blade);var puck=mesh(new THREE.CylinderGeometry(.28,.28,.13,32),dark,.75,-1.72,.02);g.add(puck);return g;};
  B.takrawball=function(){var g=new THREE.Group(),wire=M(0xD6A44D,.35,.4);var ball=mesh(new THREE.SphereGeometry(.95,24,18),M(0xB87730,.08,.7));ball.material.wireframe=true;ball.material.color.set(0xD6A44D);g.add(ball);
    [0,Math.PI/3,-Math.PI/3].forEach(function(a){var seam=mesh(new THREE.TorusGeometry(.96,.045,8,48),wire);seam.rotation.set(Math.PI/2,a,a*.4);g.add(seam);});return g;};
  B.squashracket=function(){var g=new THREE.Group(),head=mesh(new THREE.TorusGeometry(.78,.065,12,48),steel,0,.6,0);head.scale.set(.78,1.12,1);head.rotation.x=Math.PI/2;g.add(head);var strings=M(0xF2EFE6,.02,.9);for(var i=-3;i<=3;i++){var a=mesh(new THREE.CylinderGeometry(.012,.012,1.5,6),strings,i*.15,.6,.08);a.rotation.z=i*.06;g.add(a);var b=mesh(new THREE.CylinderGeometry(.012,.012,1.25,6),strings,0,.6+i*.15,.08);b.rotation.z=Math.PI/2;g.add(b);}g.add(mesh(new THREE.CylinderGeometry(.12,.15,1.05,14),wood,0,-.35,0));g.add(mesh(new THREE.SphereGeometry(.16,16,12),M(0xE6D54A,.05,.7),.8,-.1,.2));return g;};
  B.alpineskiing=B.skis;

  // Positions use normalized screen coordinates from -1 to 1
  var DEF=[
   ["bow",{x:-.72,y:.5,s:.42,sp:.24}],["javelin",{x:.26,y:.3,s:.95,sp:.4}],["basketball",null],["glove",{x:.9,y:-.36,s:.8,sp:.55}],
   ["bat",{x:.06,y:.82,s:.55,sp:.45}],["football",null],["hockey",{x:.4,y:-.52,s:.8,sp:.45}],["kabaddi",null],
   ["target",{x:-.6,y:.78,s:.45,sp:.6}],["goggles",null],["paddle",null],["racket",null],["volleyball",null],["barbell",null],["wrestlingmat",null],["gymnastics",null],
   ["skis",null],["icehockeystick",null],["takrawball",null],["squashracket",null],
   ["shuttle",{x:.7,y:.88,s:.5,sp:.6}]
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
fetch("/api/regions").then(function(response){if(!response.ok)throw new Error("Could not load regional data");return response.json();}).then(function(payload){
  setupRegion(payload);
  syncTheme();
  route();
}).catch(function(){
  document.getElementById("view").innerHTML='<section class="sec"><div class="wrap"><div class="sec-head"><p class="eyebrow">Regional directory</p><h1 class="h-sec">Page could not be loaded</h1><p>Refresh this page or return to the region list.</p><a class="btn pri" href="/states" target="_top">All regions</a></div></div></section>';
});
})();
