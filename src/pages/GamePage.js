import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { database } from "../firebaseConfig";

const countriesObject = {
  ad: "Andorra",
  ae: "United Arab Emirates",
  af: "Afghanistan",
  ag: "Antigua and Barbuda",
  ai: "Anguilla",
  al: "Albania",
  am: "Armenia",
  ao: "Angola",
  aq: "Antarctica",
  ar: "Argentina",
  as: "American Samoa",
  at: "Austria",
  au: "Australia",
  aw: "Aruba",
  ax: "Åland Islands",
  az: "Azerbaijan",
  ba: "Bosnia and Herzegovina",
  bb: "Barbados",
  bd: "Bangladesh",
  be: "Belgium",
  bf: "Burkina Faso",
  bg: "Bulgaria",
  bh: "Bahrain",
  bi: "Burundi",
  bj: "Benin",
  bl: "Saint Barthélemy",
  bm: "Bermuda",
  bn: "Brunei",
  bo: "Bolivia",
  bq: "Caribbean Netherlands",
  br: "Brazil",
  bs: "Bahamas",
  bt: "Bhutan",
  bv: "Bouvet Island",
  bw: "Botswana",
  by: "Belarus",
  bz: "Belize",
  ca: "Canada",
  cc: "Cocos (Keeling) Islands",
  cd: "DR Congo",
  cf: "Central African Republic",
  cg: "Republic of the Congo",
  ch: "Switzerland",
  ci: "Côte d'Ivoire (Ivory Coast)",
  ck: "Cook Islands",
  cl: "Chile",
  cm: "Cameroon",
  cn: "China",
  co: "Colombia",
  cr: "Costa Rica",
  cu: "Cuba",
  cv: "Cape Verde",
  cw: "Curaçao",
  cx: "Christmas Island",
  cy: "Cyprus",
  cz: "Czechia",
  de: "Germany",
  dj: "Djibouti",
  dk: "Denmark",
  dm: "Dominica",
  do: "Dominican Republic",
  dz: "Algeria",
  ec: "Ecuador",
  ee: "Estonia",
  eg: "Egypt",
  eh: "Western Sahara",
  er: "Eritrea",
  es: "Spain",
  et: "Ethiopia",
  fi: "Finland",
  fj: "Fiji",
  fk: "Falkland Islands",
  fm: "Micronesia",
  fo: "Faroe Islands",
  fr: "France",
  ga: "Gabon",
  gb: "United Kingdom",
  "gb-eng": "England",
  "gb-nir": "Northern Ireland",
  "gb-sct": "Scotland",
  "gb-wls": "Wales",
  gd: "Grenada",
  ge: "Georgia",
  gf: "French Guiana",
  gg: "Guernsey",
  gh: "Ghana",
  gi: "Gibraltar",
  gl: "Greenland",
  gm: "Gambia",
  gn: "Guinea",
  gp: "Guadeloupe",
  gq: "Equatorial Guinea",
  gr: "Greece",
  gs: "South Georgia",
  gt: "Guatemala",
  gu: "Guam",
  gw: "Guinea-Bissau",
  gy: "Guyana",
  hk: "Hong Kong",
  hm: "Heard Island and McDonald Islands",
  hn: "Honduras",
  hr: "Croatia",
  ht: "Haiti",
  hu: "Hungary",
  id: "Indonesia",
  ie: "Ireland",
  il: "Israel",
  im: "Isle of Man",
  in: "India",
  io: "British Indian Ocean Territory",
  iq: "Iraq",
  ir: "Iran",
  is: "Iceland",
  it: "Italy",
  je: "Jersey",
  jm: "Jamaica",
  jo: "Jordan",
  jp: "Japan",
  ke: "Kenya",
  kg: "Kyrgyzstan",
  kh: "Cambodia",
  ki: "Kiribati",
  km: "Comoros",
  kn: "Saint Kitts and Nevis",
  kp: "North Korea",
  kr: "South Korea",
  kw: "Kuwait",
  ky: "Cayman Islands",
  kz: "Kazakhstan",
  la: "Laos",
  lb: "Lebanon",
  lc: "Saint Lucia",
  li: "Liechtenstein",
  lk: "Sri Lanka",
  lr: "Liberia",
  ls: "Lesotho",
  lt: "Lithuania",
  lu: "Luxembourg",
  lv: "Latvia",
  ly: "Libya",
  ma: "Morocco",
  mc: "Monaco",
  md: "Moldova",
  me: "Montenegro",
  mf: "Saint Martin",
  mg: "Madagascar",
  mh: "Marshall Islands",
  mk: "North Macedonia",
  ml: "Mali",
  mm: "Myanmar",
  mn: "Mongolia",
  mo: "Macau",
  mp: "Northern Mariana Islands",
  mq: "Martinique",
  mr: "Mauritania",
  ms: "Montserrat",
  mt: "Malta",
  mu: "Mauritius",
  mv: "Maldives",
  mw: "Malawi",
  mx: "Mexico",
  my: "Malaysia",
  mz: "Mozambique",
  na: "Namibia",
  nc: "New Caledonia",
  ne: "Niger",
  nf: "Norfolk Island",
  ng: "Nigeria",
  ni: "Nicaragua",
  nl: "Netherlands",
  no: "Norway",
  np: "Nepal",
  nr: "Nauru",
  nu: "Niue",
  nz: "New Zealand",
  om: "Oman",
  pa: "Panama",
  pe: "Peru",
  pf: "French Polynesia",
  pg: "Papua New Guinea",
  ph: "Philippines",
  pk: "Pakistan",
  pl: "Poland",
  pm: "Saint Pierre and Miquelon",
  pn: "Pitcairn Islands",
  pr: "Puerto Rico",
  ps: "Palestine",
  pt: "Portugal",
  pw: "Palau",
  py: "Paraguay",
  qa: "Qatar",
  re: "Réunion",
  ro: "Romania",
  rs: "Serbia",
  ru: "Russia",
  rw: "Rwanda",
  sa: "Saudi Arabia",
  sb: "Solomon Islands",
  sc: "Seychelles",
  sd: "Sudan",
  se: "Sweden",
  sg: "Singapore",
  sh: "Saint Helena, Ascension and Tristan da Cunha",
  si: "Slovenia",
  sj: "Svalbard and Jan Mayen",
  sk: "Slovakia",
  sl: "Sierra Leone",
  sm: "San Marino",
  sn: "Senegal",
  so: "Somalia",
  sr: "Suriname",
  ss: "South Sudan",
  st: "São Tomé and Príncipe",
  sv: "El Salvador",
  sx: "Sint Maarten",
  sy: "Syria",
  sz: "Eswatini (Swaziland)",
  tc: "Turks and Caicos Islands",
  td: "Chad",
  tf: "French Southern and Antarctic Lands",
  tg: "Togo",
  th: "Thailand",
  tj: "Tajikistan",
  tk: "Tokelau",
  tl: "Timor-Leste",
  tm: "Turkmenistan",
  tn: "Tunisia",
  to: "Tonga",
  tr: "Turkey",
  tt: "Trinidad and Tobago",
  tv: "Tuvalu",
  tw: "Taiwan",
  tz: "Tanzania",
  ua: "Ukraine",
  ug: "Uganda",
  um: "United States Minor Outlying Islands",
  us: "United States",
  uy: "Uruguay",
  uz: "Uzbekistan",
  va: "Vatican City (Holy See)",
  vc: "Saint Vincent and the Grenadines",
  ve: "Venezuela",
  vg: "British Virgin Islands",
  vi: "United States Virgin Islands",
  vn: "Vietnam",
  vu: "Vanuatu",
  wf: "Wallis and Futuna",
  ws: "Samoa",
  xk: "Kosovo",
  ye: "Yemen",
  yt: "Mayotte",
  za: "South Africa",
  zm: "Zambia",
  zw: "Zimbabwe",
};

const GameContainer = ({
  timerMode,
  playerName,
  gameMode,
  setGameMode,
  setPlayerName,
}) => {
  const [currentFlag, setCurrentFlag] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);

  const endGame = useCallback(() => {
    setShowScore(true);
    updateLeaderboard(playerName, score, gameMode);
  }, [playerName, score, gameMode]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchFlagImage = (countryCode) => {
    return `https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`;
  };

  const getRandomOptions = useCallback(() => {
    const countryCodes = Object.keys(countriesObject);
    const shuffledCodes = shuffleArray(countryCodes);
    const selectedCountryCode = shuffledCodes[0];
    const selectedCountryName = countriesObject[selectedCountryCode];
    const otherCodes = shuffledCodes.slice(1, 6);
    const otherOptions = otherCodes.map((code) => ({
      name: countriesObject[code],
      image: fetchFlagImage(code),
    }));
    const selectedOption = {
      name: selectedCountryName,
      image: fetchFlagImage(selectedCountryCode),
    };
    const shuffledOptions = shuffleArray([...otherOptions, selectedOption]);
    setCurrentFlag(selectedOption);
    setOptions(shuffledOptions);
  }, []);

  useEffect(() => {
    getRandomOptions();
  }, [getRandomOptions]);

  useEffect(() => {
    let timer = null;
    if (remainingTime > 0 && !showScore && timerMode) {
      timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
    } else if (remainingTime === 0 && !showScore && timerMode) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [remainingTime, showScore, timerMode, endGame]);

  const checkAnswer = (selectedName) => {
    if (selectedName === currentFlag.name) {
      setScore(score + 1);
    }
    getRandomOptions();
  };

  const handleOptionClick = (name) => {
    if (!showScore) {
      checkAnswer(name);
    }
  };

  const resetGame = () => {
    setShowScore(false);
    setScore(0);
    setRemainingTime(60);
    getRandomOptions();
  };

  const updateLeaderboard = (playerName, playerScore, gameMode) => {
    if (gameMode === "timer-game") {
      const leaderboardRef = database.ref("leaderboard");
      leaderboardRef.push({
        name: playerName,
        score: playerScore,
        mode: gameMode,
      });
    }
  };

  if (!currentFlag) {
    return null;
  }

  return (
    <div className="container">
      {showScore ? (
        <div>
          <h2>Бал: {score}/20</h2>
          <button onClick={resetGame}>Грати ще раз</button>
          <Link to="/">
            <button>На головну</button>
          </Link>
        </div>
      ) : (
        <div>
          <h1>Вгадай прапор</h1>
          <h3>Бал: {score}/20</h3>
          {timerMode && !showScore && (
            <h3>Залишилось часу: {remainingTime} секунд</h3>
          )}
          {playerName && <p>Player: {playerName}</p>}
          <div>
            <h2>Вгадайте прапор країни: {currentFlag.name}</h2>
            {options.map((option, index) => (
              <img
                key={index}
                src={option.image}
                alt={option.name}
                onClick={() => handleOptionClick(option.name)}
              />
            ))}
          </div>
          <button onClick={endGame}>Закінчити гру </button>
        </div>
      )}
    </div>
  );
};

export default GameContainer;
