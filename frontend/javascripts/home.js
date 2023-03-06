const eraBtns = document.querySelectorAll(".era-btn")
const closeDifficultyModal = document.querySelector("#close-difficulty-modal-btn")
const difficultyModal = document.querySelector("#difficulty-modal")
const difficultyBtns = document.querySelectorAll(".difficulty-btn")

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
