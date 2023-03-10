const number = document.querySelector("#number");
const participants = document.querySelector("#participants");
const scores = document.querySelector("#scores");
const era = document.querySelector("#era");
const difficulty = document.querySelector("#difficulty");
const circle = document.querySelector("circle")

const eraText = document.querySelector("#era-text");
const difficultyText = document.querySelector("#difficulty-text");
const questionsMissedText = document.querySelector("#questions-missed-text");
const timeTakenText = document.querySelector("#time-taken-text");

let leaderboard = [];

function addToLeaderboard() {
  let data = localStorage.getItem("leaderboard");
  let leaderboardData = data ? JSON.parse(data) : [];

  const username = localStorage.getItem("username");
  const scores = JSON.parse(localStorage.getItem("scores"));
  const era = localStorage.getItem("era");
  const difficulty = localStorage.getItem("difficulty");

  leaderboardData.push({
    name: username,
    scores: scores,
    era: era,
    difficulty: difficulty,
  });

  leaderboard.push({
    name: username,
    scores: scores,
    era: era,
    difficulty: difficulty,
  });

  localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
}

function createLeaderboardValue(textContent) {
  const leaderboardValue = document.createElement("span");
  leaderboardValue.classList = "leaderboard-value";
  leaderboardValue.textContent = textContent;
  return leaderboardValue;
}

const createLeaderboardTable = () => {
  const _leaderboard = JSON.parse(localStorage.getItem("leaderboard"));

  for (let i = 0; i < _leaderboard.length; i++) {
    if (_leaderboard[i]["era"] == localStorage.getItem("era") && _leaderboard[i]["difficulty"] == localStorage.getItem("difficulty")){
      participants.appendChild(createLeaderboardValue(_leaderboard[i]["name"]));
      scores.appendChild(createLeaderboardValue(_leaderboard[i]["scores"].correctScore));
      era.appendChild(createLeaderboardValue(convertEraNames(_leaderboard[i])));
      difficulty.appendChild(createLeaderboardValue(convertDifficultyNames(_leaderboard[i])));
    };
  }
};

const convertEraNames = (leaderboard) => {
  switch (leaderboard["era"]) {
    case "ww1and2":
      return `World War 1 & 2`;
    case "medieval":
      return `Medieval`;
    case "warringstatesofchina":
      return `Warring States of China`;
    default:
      break;
  }
}

const convertDifficultyNames = (leaderboard) => {
  switch (leaderboard["difficulty"]) {
    case "easy":
      return `Easy`;
    case "medium":
      return `Medium`;
    case "hard":
      return `Hard`;
    default:
      break;
  }
}

const loadScore = () => {
  addToLeaderboard();

  const percentage = (leaderboard[0]["scores"].correctScore / leaderboard[0]["scores"].questionCount)
  document.documentElement.style.setProperty('--stroke-dashoffset', (600 - 600 * percentage));

  number.textContent = `${leaderboard[0]["scores"].correctScore}/${leaderboard[0]["scores"].questionCount}`;
  eraText.textContent = `Era: ${convertEraNames(leaderboard[0])}`;
  difficultyText.textContent = `Difficulty: ${convertDifficultyNames(leaderboard[0])}`;
  questionsMissedText.textContent = `Missed Questions: ${leaderboard[0]["scores"].questionsMissedScore}`;

  createLeaderboardTable();

  localStorage.removeItem("leaderboard")
};

loadScore();
