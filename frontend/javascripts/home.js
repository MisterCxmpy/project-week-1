const eraBtns = document.querySelectorAll(".era-btn")
const closeDifficultyModal = document.querySelector("#close-difficulty-modal-btn")
const difficultyModal = document.querySelector("#difficulty-modal")
const difficultyBtns = document.querySelectorAll(".difficulty-btn")
const leaderboard = document.querySelector("#scrolling-text")

let era = null
let difficulty = null

const openModal = (e) => {
  difficultyModal.style.display = "block"
  era = e.target.dataset.era;
}

const closeModal = (e) => {
  difficultyModal.style.display = "none"
  era = null;
}

const loadQuizPage = (e) => {
  difficulty = e.target.dataset.difficulty
  localStorage.setItem("era", era)
  localStorage.setItem("difficulty", difficulty)
  window.location.href = `quiz.html`;
}

closeDifficultyModal.addEventListener("click", closeModal)

eraBtns.forEach(btn => {
  if (difficultyModal.style.display == "block") return

  btn.addEventListener("click", openModal)
});

difficultyBtns.forEach(btn => {
  btn.addEventListener("click", loadQuizPage)
});

const _leaderboard = (localStorage.getItem("leaderboard"));

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

// allows us to dynamically create leaderboard values
function createLeaderboardValue(textContent) {
  const leaderboardValue = document.createElement("span");
  leaderboardValue.classList = "leaderboard-value";
  leaderboardValue.textContent = textContent;
  return leaderboardValue;
}

const loadLeaderboardInfo = () => {
  const _leaderboard = JSON.parse(localStorage.getItem("leaderboard"));

  for (let i = 0; i < _leaderboard.length; i++) {
    leaderboard.appendChild(createLeaderboardValue(`Name: ${_leaderboard[i]["name"]} - `));
    leaderboard.appendChild(createLeaderboardValue(`Score: ${_leaderboard[i]["scores"].correctScore} - `));
    leaderboard.appendChild(createLeaderboardValue(`Era: ${convertEraNames(_leaderboard[i])} - `));
    leaderboard.appendChild(createLeaderboardValue(`Difficulty: ${convertDifficultyNames(_leaderboard[i])}`));

    let span = document.createElement("span")
    span.classList = "hidden"
    span.textContent = " - - - - "
    leaderboard.appendChild(span)
  }
}
  
loadLeaderboardInfo()