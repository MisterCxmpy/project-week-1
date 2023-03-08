const number = document.querySelector("#number");
const participants = document.querySelector("#participants");
const scores = document.querySelector("#scores");
const era = document.querySelector("#era");
const difficulty = document.querySelector("#difficulty");
const circle = document.querySelector("circle")

const eraText = document.querySelector("#era-text");
const difficultyText = document.querySelector("#difficulty-text");
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

const createLeaderboardTable = () => {
  const _leaderboard = JSON.parse(localStorage.getItem("leaderboard"));

  for (let i = 0; i < _leaderboard.length; i++) {
    let _participants = document.createElement("span");
    _participants.classList = "leaderboard-value";
    _participants.textContent = _leaderboard[i]["name"];

    let _scores = document.createElement("span");
    _scores.classList = "leaderboard-value";
    _scores.textContent = _leaderboard[i]["scores"].correctScore;

    let _era = document.createElement("span");
    _era.classList = "leaderboard-value";
    _era.textContent = _leaderboard[i]["era"];

    let _difficulty = document.createElement("span");
    _difficulty.classList = "leaderboard-value";
    _difficulty.textContent = _leaderboard[i]["difficulty"];

    participants.appendChild(_participants);
    scores.appendChild(_scores);
    era.appendChild(_era);
    difficulty.appendChild(_difficulty);
  }
};

const loadScore = () => {
  addToLeaderboard();

  const percentage = leaderboard[0]["scores"].correctScore / leaderboard[0]["scores"].questionCount * 100
  document.documentElement.style.setProperty('--stroke-dashoffset', (600 - 600 * percentage));

  number.textContent = `${leaderboard[0]["scores"].correctScore}/${leaderboard[0]["scores"].questionCount}`;
  eraText.textContent = `Era: ${leaderboard[0]["era"]}`;
  difficultyText.textContent = `Difficulty: ${leaderboard[0]["difficulty"]}`;
  createLeaderboardTable();
};

loadScore();
