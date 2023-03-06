const timerValue = document.querySelector("#timer-value");
const title = document.querySelector("#title")
const answersBtn = document.querySelectorAll(".asnwer-btn")

async function fetchQuizData(era, difficulty) {
  try {
    const resp = await fetch(`http://localhost:3456/quizzes/${era}/${difficulty}`);
    if (resp.ok) {
      const data = await resp.json();
      getQuestions(data.quiz[era], difficulty)
    } else {
      throw `Error: http status code = ${resp.status}`;
    }
  } catch (e) {
    console.log(e);
  }
}

const getQuestions = (era, diff) => {
    let questionCount = 0
    let questions = []

    switch (diff) {
      case "easy":
        questionCount = 5
        break;
      case "medium":
        questionCount = 10
        break;
      case "hard":
        questionCount = 15
        break;
      default:
        console.log("Difficulty is not defined!")
        break;
    }

    for(var key in era) questions.push(era[key]);

    const allQuestions = questions.sort(() => 0.5 - Math.random());
    let selectedQuestions = allQuestions.slice(0, questionCount);

    title.textContent = selectedQuestions[0].question;

    //answersBtn
}

const startCountdown = (e) => {
  var value = parseInt(timerValue.textContent);
  setInterval(() => {
    if (value > 0) {
      value--;
      timerValue.textContent = value;
    }
  }, 1000);
};

startCountdown();
fetchQuizData(localStorage.getItem("era"), localStorage.getItem("difficulty"));
