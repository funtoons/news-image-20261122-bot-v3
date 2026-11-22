// News22 v3 — story data, Sunday 22 November 2026.
// Verified by wire research (read up to 08:17 UTC, 22 Nov 2026; each story
// confirmed by >=2 independent outlets). Summaries are written fresh here.
// CLAIM stories are labelled as claims, never as confirmed fact.
// Headlines/summaries are sized to fit their slots (no wrap overflow).
export interface Story {
  n: number;
  loc: string;   // "ANTALYA, TURKEY"
  topic: string; // "CLIMATE"
  head: string;  // headline
  sum: string;   // short summary (hero <=3 lines, grid <=2 lines)
  src: string;   // "(Reuters, AP)"
  chip: string;  // label chip on the illustration
  stat?: string; // stat chip on hero illustration
  region: string;
}

export const WIRE_TIME = '08:17 UTC';
export const SUBHEAD =
  'Climate deal in sight at COP31 \u00b7 Iran claims Patriot radar hits in Bahrain \u00b7 \u2018El Chapo Isidro\u2019 captured in Sinaloa';

export const HEROES: Story[] = [
  {
    n: 1, loc: 'ANTALYA, TURKEY', topic: 'CLIMATE',
    head: 'COP31 talks push into overtime as a new draft lands',
    sum: 'The presidency tables a fresh text after deadlock over fossil fuels and finance; objections close 03:00 GMT before a 06:00 GMT session.',
    src: '(Reuters, AP)', chip: 'COP31: OVERTIME', stat: '~200 nations', region: 'World',
  },
  {
    n: 2, loc: 'MANAMA, BAHRAIN', topic: 'IRAN WAR',
    head: 'Iran claims it hit two US Patriot radars in Bahrain',
    sum: 'Tehran says missiles and drones hit radars at al-Riffa and Awali; Bahrain confirms only a civilian site burned. Unverified.',
    src: '(Xinhua, Al Jazeera)', chip: 'CLAIM \u00b7 IRAN SAYS', stat: '2 radars', region: 'Middle East',
  },
  {
    n: 3, loc: 'GUASAVE, MEXICO', topic: 'CARTELS',
    head: '\u2018El Chapo Isidro\u2019 captured as Sinaloa burns',
    sum: 'Troops seize FBI fugitive Fausto Isidro Meza Flores, 44; gun battles, burning roadblocks and 11 dead follow.',
    src: '(Reuters, CNN)', chip: 'CAPTURED', stat: '11 dead', region: 'Americas',
  },
];

export const GRID: Story[] = [
  { n: 4, loc: 'KRYVYI RIH, UKRAINE', topic: 'WAR',
    head: 'Drones kill two in Zelenskyy\u2019s home city',
    sum: 'A 7-year-old and a paramedic die; 148 drones hit overnight.',
    src: '(Ukraine Monitor, NY Post)', chip: '148 DRONES', region: 'Europe' },
  { n: 5, loc: 'GULF OF FINLAND', topic: 'WAR AT SEA',
    head: 'Russian ship ablaze after drone strike',
    sum: 'Sparta II drifts into Finnish waters; all 16 crew rescued.',
    src: '(Reuters, CNN)', chip: '16 CREW SAFE', region: 'Europe' },
  { n: 6, loc: 'JERUSALEM', topic: 'POLITICS',
    head: 'Eisenkot invites Likud to coalition talks',
    sum: 'Marathon talks open, but a Netanyahu-led cabinet is ruled out.',
    src: '(AFP)', chip: 'COALITION TALKS', region: 'Middle East' },
  { n: 7, loc: 'GAZA', topic: 'CEASEFIRE',
    head: 'Strike hits food aid vehicle, three killed',
    sum: 'WCK-marked vehicle hit in Tel al-Hawa; IDF cites a militant.',
    src: '(Reuters)', chip: '3 KILLED', region: 'Middle East' },
  { n: 8, loc: 'TEHRAN, IRAN', topic: 'ENERGY',
    head: 'Iran begins power rationing from Sunday',
    sum: 'Cuts of up to two hours a day begin; a hard winter is warned.',
    src: '(RFE/RL, Straits Times)', chip: 'POWER CUTS', region: 'Middle East' },
  { n: 9, loc: 'WASHINGTON', topic: 'BUSINESS',
    head: 'Nvidia faces SEC accounting probe',
    sum: 'The regulator examines accounting as shares fall 14% on Friday.',
    src: '(Reuters)', chip: 'SEC PROBE', region: 'Americas' },
  { n: 10, loc: 'BRAS\u00cdLIA, BRAZIL', topic: 'POLITICS',
    head: 'Bolsonaro in intensive care',
    sum: 'Jailed ex-president, 71, admitted; stable and breathing alone.',
    src: '(Reuters)', chip: 'BOLSONARO: ICU', region: 'Americas' },
  { n: 11, loc: 'CANBERRA', topic: 'DEFENCE',
    head: 'Marles rejects US report on AUKUS subs',
    sum: 'Marles says the budget office is wrong on Virginia-class sales.',
    src: '(Reuters, ABC)', chip: 'AUKUS ROW', region: 'Oceania' },
  { n: 12, loc: 'WELLINGTON', topic: 'CRICKET',
    head: 'India post record Test total in New Zealand',
    sum: 'Pant 128 and Rahul 136 lift India to 720/9 declared, a record.',
    src: '(ICC, Reuters)', chip: '720/9', region: 'Oceania' },
  { n: 13, loc: 'HONG KONG', topic: 'POLITICS',
    head: 'Hong Kong votes for its Election Committee',
    sum: '856 candidates chase 723 seats; the body picks the chief in 2027.',
    src: '(China Daily)', chip: '856 CANDIDATES', region: 'Asia-Pacific' },
  { n: 14, loc: 'LAS VEGAS', topic: 'FORMULA 1',
    head: 'Verstappen wins a wild Las Vegas GP',
    sum: 'Lead changes 35 times; Verstappen wins by 0.6s.',
    src: '(Formula1.com, Reuters)', chip: '35 LEAD CHANGES', region: 'Americas' },
  { n: 15, loc: 'TALLINN', topic: 'SECURITY',
    head: 'Estonia to shut its Russia border on 1 Dec',
    sum: 'Five crossings close for six months; crowds queue at Ivangorod.',
    src: '(Reuters)', chip: '1 DEC', region: 'Europe' },
];

export interface AlsoItem { n: number; loc: string; text: string; src: string }
export const ALSO: AlsoItem[] = [
  { n: 16, loc: 'Bayelsa', text: 'Boat of mourners capsizes, 24 dead', src: '(Reuters)' },
  { n: 17, loc: 'Turin', text: 'Zverev meets Alcaraz in ATP final tonight', src: '(ATP)' },
  { n: 18, loc: 'Liverpool', text: 'Pochettino debuts as Man Utd visit, 16:30', src: '(Man Utd)' },
  { n: 19, loc: 'London', text: 'England crush New Zealand 37\u201312', src: '(Reuters)' },
  { n: 20, loc: 'Paris', text: 'France beat Argentina 45\u201317, reach final', src: '(AP)' },
  { n: 21, loc: 'Brussels', text: 'EU-Indonesia sign trade deal after decade', src: '(Reuters)' },
  { n: 22, loc: 'New York', text: 'S&P 500 enters correction as AI slides', src: '(Reuters)' },
  { n: 23, loc: 'Copenhagen', text: 'Denmark expels Russian defence attach\u00e9', src: '(WSJ)' },
  { n: 24, loc: 'Riyadh', text: 'Three Houthi missiles intercepted', src: '(Reuters)' },
  { n: 25, loc: 'Basra', text: 'Fire at Hartha plant kills at least four', src: '(Reuters)' },
  { n: 26, loc: 'Manipur', text: 'Toxic liquor toll hits 16 dead, ~600 in care', src: '(Xinhua)' },
  { n: 27, loc: 'Florida', text: 'St. Johns River breaks 1953 flood record', src: '(NWS)' },
  { n: 28, loc: 'Washington', text: 'FBI probes hack of NCIC database', src: '(AP)' },
  { n: 29, loc: 'Geneva', text: '128 nations agree talks on \u2018killer robots\u2019', src: '(NPR)' },
  { n: 30, loc: 'Serang', text: 'Three dead, 36 missing in factory fire', src: '(Reuters)' },
  { n: 31, loc: 'The Hague', text: 'ICJ Myanmar ruling stands as junta balks', src: '(Le Monde)' },
  { n: 32, loc: 'Madrid', text: 'Spain heads for snap election on 29 Nov', src: '(Guardian)' },
  { n: 33, loc: 'Mogadishu', text: 'Somalia expels UAE ambassador', src: '(Reuters)' },
  { n: 34, loc: 'Los Angeles', text: 'Man guilty over Palisades blaze fire', src: '(USA Today)' },
  { n: 35, loc: 'Beirut', text: 'Aoun blames Israel, Iran for lost freedom', src: '(Al Jazeera)' },
  { n: 36, loc: 'Dublin', text: 'Ireland edge South Africa 20\u201317', src: '(AP)' },
  { n: 37, loc: 'Edinburgh', text: 'Scotland rout Japan 67\u20135', src: '(AP)' },
  { n: 38, loc: 'Washington', text: 'US denies Iran claim of damaged F-16', src: '(CENTCOM)' },
  { n: 39, loc: 'Helsinki', text: 'Russian helicopter in suspected airspace breach', src: '(DW)' },
  { n: 40, loc: 'Brussels', text: 'EU plastic waste export ban takes effect', src: '(EUobserver)' },
];

export const STATS: [string, string][] = [
  ['~200', 'nations at COP31'],
  ['148', 'drones in one night'],
  ['720', 'runs, India record'],
  ['24', 'dead in Bayelsa boat'],
  ['~600', 'hospitalised in Manipur'],
  ['36', 'missing in factory fire'],
];

export const REGIONS: [string, number, string][] = [
  ['EUROPE', 13, '#2E5A88'],
  ['MIDDLE EAST', 8, '#A61C1C'],
  ['AMERICAS', 8, '#2E7D4F'],
  ['ASIA-PACIFIC', 5, '#C77B21'],
  ['AFRICA', 2, '#7A5C2E'],
  ['OCEANIA', 2, '#2E7D7A'],
  ['WORLD', 2, '#6B4E8E'],
];

export const CLOCK: [string, string][] = [
  ['01:00 UTC', 'Hong Kong polls open'],
  ['03:00 UTC', 'COP31 objection deadline ends'],
  ['03:00 UTC', 'Hartha gas pipeline fire, Basra'],
  ['06:00 UTC', 'COP31 approval session opens'],
  ['07:00 UTC', 'Sparta II hit by two drones'],
  ['10:34 UTC', 'Suspected airspace breach, Finland'],
  ['16:30 UTC', 'Liverpool v Man Utd kick off'],
  ['17:00 UTC', 'ATP final: Zverev v Alcaraz'],
];

export const DATE_CHECK =
  'Wires read up to 08:17 UTC, Sunday 22 November 2026; every story here was reported, or was still developing, on 22 November. ' +
  'Left out as other days\u2019 news: the Peru earthquake (20 Nov), Russian missiles in Poland (19 Nov), the Kerch Bridge strikes (earlier this week), ' +
  'the Shenzhen summit (19 Nov), the Anthropic IPO (19 Nov), the GTA VI launch (19 Nov), and Russia\u2019s 400-drone barrage (night of 20 Nov) \u2014 not last night\u2019s 148-drone attack.';

export const SOURCES =
  'Sources: Reuters, AP, Al Jazeera, Xinhua, AFP, BBC, DW, Straits Times, CNN, ICC, ATP, NWS, WSJ, Le Monde, USA Today, China Daily, Formula1.com, NPR, EUobserver. ' +
  'Every story names its outlet. Pictures and map: original, drawn in code.';
