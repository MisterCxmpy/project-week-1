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

  // This leaderboard array is used to store all user results
  leaderboardData.push({
    name: username,
    scores: scores,
    era: era,
    difficulty: difficulty,
  });

  // This leaderboard array is used to get the most recent user results
  leaderboard.push({
    name: username,
    scores: scores,
    era: era,
    difficulty: difficulty,
  });

  localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
}

// allows us to dynamically create leaderboard values
function createLeaderboardValue(textContent) {
  const leaderboardValue = document.createElement("span");
  leaderboardValue.classList = "leaderboard-value";
  leaderboardValue.textContent = textContent;
  return leaderboardValue;
}

const createLeaderboardTable = () => {
  // Get the current leaderboard data from local storage
  const _leaderboard = JSON.parse(localStorage.getItem("leaderboard"));

  // Loop through the leaderboard data and add each entry to the table if it matches the current era and difficulty
  for (let i = 0; i < _leaderboard.length; i++) {
    if (_leaderboard[i]["era"] == localStorage.getItem("era") && _leaderboard[i]["difficulty"] == localStorage.getItem("difficulty")){

      // Add the name of the participant to the participants column of the table
      participants.appendChild(createLeaderboardValue(_leaderboard[i]["name"]));

      // Add the score of the participant to the scores column of the table
      scores.appendChild(createLeaderboardValue(_leaderboard[i]["scores"].correctScore));

      // Add the era of the participant to the era column of the table
      era.appendChild(createLeaderboardValue(convertEraNames(_leaderboard[i])));

      // Add the difficulty of the participant to the difficulty column of the table
      difficulty.appendChild(createLeaderboardValue(convertDifficultyNames(_leaderboard[i])));
    };
  }
};

// correctly formats the names of the era
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

// correctly formats the names of the difficulty
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
  // Call addToLeaderboard function to add the current score to the leaderboard array
  addToLeaderboard();

  // Calculate percentage of correct answers and set a CSS variable to adjust the progress bar
  const percentage = (leaderboard[0]["scores"].correctScore / leaderboard[0]["scores"].questionCount)
  document.documentElement.style.setProperty('--stroke-dashoffset', (600 - 600 * percentage));

  // Display the number of correct answers out of total questions
  number.textContent = `${leaderboard[0]["scores"].correctScore}/${leaderboard[0]["scores"].questionCount}`;

  // Update the era text to display the current era
  convertEraNames(eraText, leaderboard[0])
  eraText.textContent = `Era: ${convertEraNames(leaderboard[0])}`;

  // Update the difficulty text to display the current difficulty
  difficultyText.textContent = `Difficulty: ${convertDifficultyNames(leaderboard[0])}`;

  // Display the number of missed questions
  questionsMissedText.textContent = `Missed Questions: ${leaderboard[0]["scores"].questionsMissedScore}`;

  // Call createLeaderboardTable function to update the leaderboard table with the latest scores
  createLeaderboardTable();
};

loadScore();
