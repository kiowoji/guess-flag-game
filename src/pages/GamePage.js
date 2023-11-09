import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { database } from "../firebaseConfig";

const countriesObject = {
  ad: "Андорра",
  ae: "Об'єднані Арабські Емірати",
  af: "Афганістан",
  ag: "Антигуа і Барбуда",
  ai: "Ангілья",
  al: "Албанія",
  am: "Вірменія",
  ao: "Ангола",
  aq: "Антарктида",
  ar: "Аргентина",
  as: "Американське Самоа",
  at: "Австрія",
  au: "Австралія",
  aw: "Аруба",
  ax: "Аландські острови",
  az: "Азербайджан",
  ba: "Боснія і Герцеговина",
  bb: "Барбадос",
  bd: "Бангладеш",
  be: "Бельгія",
  bf: "Буркіна-Фасо",
  bg: "Болгарія",
  bh: "Бахрейн",
  bi: "Бурунді",
  bj: "Бенін",
  bl: "Сен-Бартелемі",
  bm: "Бермуди",
  bn: "Бруней",
  bo: "Болівія",
  bq: "Карибські Нідерланди",
  br: "Бразилія",
  bs: "Багамські острови",
  bt: "Бутан",
  bv: "Острів Буве",
  bw: "Ботсвана",
  by: "Білорусь",
  bz: "Беліз",
  ca: "Канада",
  cc: "Кокосові (Кілінг) острови",
  cd: "ДР Конго",
  cf: "Центральноафриканська Республіка",
  cg: "Республіка Конго",
  ch: "Швейцарія",
  ci: "Кот-д'Івуар",
  ck: "Острови Кука",
  cl: "Чилі",
  cm: "Камерун",
  cn: "Китай",
  co: "Колумбія",
  cr: "Коста-Ріка",
  cu: "Куба",
  cv: "Кабо-Верде",
  cw: "Кюрасао",
  cx: "Острів Різдва",
  cy: "Кіпр",
  cz: "Чехія",
  de: "Німеччина",
  dj: "Джибуті",
  dk: "Данія",
  dm: "Домініка",
  do: "Домініканська Республіка",
  dz: "Алжир",
  ec: "Еквадор",
  ee: "Естонія",
  eg: "Єгипет",
  eh: "Західна Сахара",
  er: "Еритрея",
  es: "Іспанія",
  et: "Ефіопія",
  fi: "Фінляндія",
  fj: "Фіджі",
  fk: "Фолклендські острови",
  fm: "Мікронезія",
  fo: "Фарерські острови",
  fr: "Франція",
  ga: "Габон",
  gb: "Велика Британія",
  "gb-eng": "Англія",
  "gb-nir": "Північна Ірландія",
  "gb-sct": "Шотландія",
  "gb-wls": "Уельс",
  gd: "Гренада",
  ge: "Грузія",
  gf: "Французька Гвіана",
  gg: "Гернсі",
  gh: "Гана",
  gi: "Гібралтар",
  gl: "Ґренландія",
  gm: "Гамбія",
  gn: "Гвінея",
  gp: "Гваделупа",
  gq: "Екваторіальна Гвінея",
  gr: "Греція",
  gs: "Південна Джорджія",
  gt: "Гватемала",
  gu: "Гуам",
  gw: "Гвінея-Бісау",
  gy: "Гаяна",
  hk: "Гонконг",
  hm: "Острів Герда і Острови Макдональд",
  hn: "Гондурас",
  hr: "Хорватія",
  ht: "Гаїті",
  hu: "Угорщина",
  id: "Індонезія",
  ie: "Ірландія",
  il: "Ізраїль",
  im: "Острів Мен",
  in: "Індія",
  io: "Британська територія в Індійському Океані",
  iq: "Ірак",
  ir: "Іран",
  is: "Ісландія",
  it: "Італія",
  je: "Джерсі",
  jm: "Ямайка",
  jo: "Йорданія",
  jp: "Японія",
  ke: "Кенія",
  kg: "Киргизстан",
  kh: "Камбоджа",
  ki: "Кірибаті",
  km: "Коморські острови",
  kn: "Сент-Кіттс і Невіс",
  kp: "Північна Корея",
  kr: "Південна Корея",
  kw: "Кувейт",
  ky: "Кайманові острови",
  kz: "Казахстан",
  la: "Лаос",
  lb: "Ліван",
  lc: "Сент-Люсія",
  li: "Ліхтенштейн",
  lk: "Шрі-Ланка",
  lr: "Ліберія",
  ls: "Лесото",
  lt: "Литва",
  lu: "Люксембург",
  lv: "Латвія",
  ly: "Лівія",
  ma: "Марокко",
  mc: "Монако",
  md: "Молдова",
  me: "Чорногорія",
  mf: "Сен-Мартен",
  mg: "Мадагаскар",
  mh: "Маршаллові Острови",
  mk: "Північна Македонія",
  ml: "Малі",
  mm: "М'янма",
  mn: "Монголія",
  mo: "Макао",
  mp: "Північні Маріанські острови",
  mq: "Мартиніка",
  mr: "Мавританія",
  ms: "Монтсеррат",
  mt: "Мальта",
  mu: "Маврикій",
  mv: "Мальдіви",
  mw: "Малаві",
  mx: "Мексика",
  my: "Малайзія",
  mz: "Мозамбік",
  na: "Намібія",
  nc: "Нова Каледонія",
  ne: "Нігер",
  nf: "Острів Норфолк",
  ng: "Нігерія",
  ni: "Нікарагуа",
  nl: "Нідерланди",
  no: "Норвегія",
  np: "Непал",
  nr: "Науру",
  nu: "Ніуе",
  nz: "Нова Зеландія",
  om: "Оман",
  pa: "Панама",
  pe: "Перу",
  pf: "Французька Полінезія",
  pg: "Папуа-Нова Гвінея",
  ph: "Філіппіни",
  pk: "Пакистан",
  pl: "Польща",
  pm: "Сен-П'єр і Мікелон",
  pn: "Острови Піткерн",
  pr: "Пуерто-Ріко",
  ps: "Палестина",
  pt: "Португалія",
  pw: "Палау",
  py: "Парагвай",
  qa: "Катар",
  re: "Реюньйон",
  ro: "Румунія",
  rs: "Сербія",
  ru: "росія",
  rw: "Руанда",
  sa: "Саудівська Аравія",
  sb: "Соломонові Острови",
  sc: "Сейшельські Острови",
  sd: "Судан",
  se: "Швеція",
  sg: "Сінгапур",
  sh: "Острів Святої Єлени, Вознесіння і Тристан-да-Кунья",
  si: "Словенія",
  sj: "Свальбард і Ян-Маєн",
  sk: "Словаччина",
  sl: "Сьєрра-Леоне",
  sm: "Сан-Марино",
  sn: "Сенегал",
  so: "Сомалі",
  sr: "Суринам",
  ss: "Південний Судан",
  st: "Сан-Томе і Принсіпі",
  sv: "Сальвадор",
  sx: "Сінт-Мартен",
  sy: "Сирія",
  sz: "Есватіні",
  tc: "Острови Теркс і Кайкос",
  td: "Чад",
  tf: "Французькі Південні та Антарктичні землі",
  tg: "Того",
  th: "Таїланд",
  tj: "Таджикистан",
  tk: "Токелау",
  tl: "Тімор-Лешті",
  tm: "Туркменістан",
  tn: "Туніс",
  to: "Тонга",
  tr: "Туреччина",
  tt: "Тринідад і Тобаго",
  tv: "Тувалу",
  tw: "Тайвань",
  tz: "Танзанія",
  ua: "Україна",
  ug: "Уганда",
  um: "Віддалені острови США",
  us: "Сполучені Штати",
  uy: "Уругвай",
  uz: "Узбекистан",
  va: "Ватикан",
  vc: "Сент-Вінсент і Гренадини",
  ve: "Венесуела",
  vg: "Британські Віргінські острови",
  vi: "Американські Віргінські острови",
  vn: "В'єтнам",
  vu: "Вануату",
  wf: "Уолліс і Футуна",
  ws: "Самоа",
  xk: "Косово",
  ye: "Ємен",
  yt: "Майотта",
  za: "Південна Африка",
  zm: "Замбія",
  zw: "Зімбабве",
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
  const [stepCount, setStepCount] = useState(0);
  const [lastAnswer, setLastAnswer] = useState(null);
  const maxSteps = 30;

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
    const otherCodes = shuffledCodes.slice(1, 5);
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
      setLastAnswer("correct");
    } else {
      setLastAnswer("incorrect");
    }
    setStepCount(stepCount + 1);
    if (stepCount >= maxSteps) {
      endGame();
    } else {
      getRandomOptions();
    }
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
    <div>
      {showScore ? (
        <div className="container greeting">
          <h2>Вітаємо із закінченням гри!</h2>
          <h2>Ваш бал: {score}/30</h2>
          <button className="btn" onClick={resetGame}>
            Грати ще раз
          </button>
          <Link className="link" to="/">
            <button className="btn">На головну</button>
          </Link>
        </div>
      ) : (
        <div className="container game">
          <h1>Вгадай прапор</h1>
          <h3>Бал: {score}/30</h3>
          {timerMode && !showScore && (
            <h3>Залишилось часу: {remainingTime} секунд</h3>
          )}
          {playerName && <p>Player: {playerName}</p>}
          {lastAnswer === "correct" && <p className="green">Вітаю! Правильна відповідь!</p>}
          {lastAnswer === "incorrect" && <p className="red">На жаль ви відповіли не вірно.</p>}
          <h2>Вгадайте прапор країни: {currentFlag.name}</h2>
          <div className="flag-container">
            {options.map((option, index) => (
              <img
                key={index}
                className="flag-image"
                src={option.image}
                alt={option.name}
                onClick={() => handleOptionClick(option.name)}
              />
            ))}
          </div>
          <button className="btn" onClick={endGame}>
            Закінчити гру{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default GameContainer;
