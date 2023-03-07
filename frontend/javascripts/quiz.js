const title = document.querySelector("#title");
const answersBtn = document.querySelectorAll(".answer-btn");
const resultModal = document.querySelector("#result-modal")
const progressTimer = document.querySelector("#progress-timer")
const modalContent = document.querySelector(".modal-content")
const modalText = document.querySelector("#modal-text")
const nextBtn = document.querySelector("#next-btn")

let score = 0;
let hasStarted = false;
let questionIndex = 0;
let selectedQuestions = [];
let questionCount = 0;
let width = 0;

let timeOver = false

async function fetchQuizData(era, difficulty) {
  try {
    const resp = await fetch(
      `http://localhost:3456/quizzes/${era}/${difficulty}`
    );
    if (resp.ok) {
      const data = await resp.json();
      getQuestions(data.quiz[era], difficulty);
    } else {
      throw `Error: http status code = ${resp.status}`;
    }
  } catch (e) {
    console.log(e);
  }
}

const getQuestions = (era, diff) => {
  if (!hasStarted) {
    hasStarted = true
    questionCount = 0;
    let questions = [];

    switch (diff) {
      case "easy":
        questionCount = 5;
        break;
      case "medium":
        questionCount = 10;
        break;
      case "hard":
        questionCount = 15;
        break;
      default:
        console.log("Difficulty is not defined!");
        break;
    }

    for (var key in era) questions.push(era[key]);

    const allQuestions = questions.sort(() => 0.5 - Math.random());
    selectedQuestions = allQuestions.slice(0, questionCount);
  }

  // random question part of the code

  getNewQuestions()
};

const getNewQuestions = (e) => {
  width = 0

  if (timeOver) {
    startCountdown();
    timeOver = false
  }

  if (questionIndex + 2 > questionCount) {
    nextBtn.textContent = "See results"
  }

  resultModal.style.display = "none";
  if (questionIndex < questionCount) {
    title.textContent = selectedQuestions[questionIndex].question;
  
    let correctButtonIndex = Math.floor(Math.random() * answersBtn.length);
  
    answersBtn[correctButtonIndex].textContent = selectedQuestions[questionIndex].answer;
  
    let wrongAnswers = [
      selectedQuestions[questionIndex].wrong1,
      selectedQuestions[questionIndex].wrong2,
      selectedQuestions[questionIndex].wrong3,
    ];
    
    wrongAnswers = wrongAnswers.sort(() => 0.5 - Math.random());
    wrongAnswers = wrongAnswers.slice(0, 3);
  
    let wrongIndex = 0;
    for (let i = 0; i < answersBtn.length; i++) {
      if (i !== correctButtonIndex) {
        answersBtn[i].textContent = wrongAnswers[wrongIndex];
        wrongIndex++;
      }
    }
  
    questionIndex++;
  } else {
    window.location.href = `result.html`;
  }

}

const checkAnswer = (e) => {
  if (e.target.textContent == selectedQuestions[questionIndex - 1].answer) {
    score++
    modalText.textContent = "CORRECT ANSWER!";
    resultModal.style.backgroundColor = "lightgreen";
  } else {
    modalText.textContent = "WRONG ANSWER!";
    resultModal.style.backgroundColor = "#F52F36";
  }
}

const startCountdown = (e) => {

  interval = setInterval(frame, 10);

  function frame() {
    if (width >= 1500) {
      clearInterval(interval);
      if (modalText.textContent == ""){
        modalText.textContent = "TIMER RAN OUT!"
        timeOver = true
        openModal()
      }
    } else {
      width++;
      progressTimer.style.width = (width) / 15 + '%';
    }
  }
};

const openModal = (e) => {
  resultModal.style.display = "block"
}

nextBtn.addEventListener("click", getNewQuestions)


answersBtn.forEach(btn => {
  btn.addEventListener("click", checkAnswer)
  btn.addEventListener("click", openModal)
  // btn.addEventListener("click", getNewQuestions)
});

startCountdown();
fetchQuizData(localStorage.getItem("era"), localStorage.getItem("difficulty"));
