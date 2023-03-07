const title = document.querySelector("#title");
const answersBtn = document.querySelectorAll(".answer-btn");
const resultModal = document.querySelector("#result-modal")
const progressTimer = document.querySelector("#progress-timer")
const modalContent = document.querySelector(".modal-content")
const correctAns = document.querySelector("#correctans")
const wrongAns = document.querySelector("#wrongans")
const timerModal = document.querySelector("#timer")

let score = 0;
let hasStarted = false;
let questionIndex = 0;
let selectedQuestions = [];
let questionCount = 0;
let width = 0;
let answerCorrect = false;
let timerRanOut = false;
let modalOpened = false;

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
  answerCorrect = false
  modalOpened = false
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
    console.log("Quiz over!")
  }

}

const checkAnswer = (e) => {
  if (e.target.textContent == selectedQuestions[questionIndex - 1].answer) {
    score++
    answerCorrect = true
    console.log("Correct answer!")
  } else {
    console.log("Wrong answer!")
  }
}

const startCountdown = (e) => {

  interval = setInterval(frame, 150);

  function frame() {
    if (width >= 100) {
      clearInterval(interval);
      if (modalOpened === false){
        timerRanOut = true;
        openModal()
      }
    } else {
      width++;
      timerRanOut = false;
      progressTimer.style.width = width + '%';
    }
  }
};

const openModal = (e) => {
  resultModal.style.display = "block"
  if (timerRanOut === true) {
    timerModal.style.display = "block"
  } else if(answerCorrect === true){
    modalOpened = true;
    correctAns.style.display = "block";
  } else {
    wrongAns.style.display = "block";
    modalOpened = true;
  }
}

answersBtn.forEach(btn => {
  btn.addEventListener("click", checkAnswer)
  btn.addEventListener("click", openModal)
  // btn.addEventListener("click", getNewQuestions)
});

startCountdown();
fetchQuizData(localStorage.getItem("era"), localStorage.getItem("difficulty"));
