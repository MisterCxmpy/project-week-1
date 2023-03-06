const eraBtns = document.querySelectorAll(".era-btn")
const closeDifficultyModal = document.querySelector("#close-difficulty-modal-btn")
const difficultyModal = document.querySelector("#difficulty-modal")

const openModal = (e) => {
  difficultyModal.style.display = "block"
}

const closeModal = (e) => {
  difficultyModal.style.display = "none"
}

closeDifficultyModal.addEventListener("click", closeModal)

eraBtns.forEach(btn => {
  if (difficultyModal.style.display == "block") return

  btn.addEventListener("click", openModal)
});

