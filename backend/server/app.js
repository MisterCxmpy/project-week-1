const express = require('express')
const cors = require('cors')
const app = express()
const logger = require("./logger")

const quiz = require("./quiz.json")

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
    res.send(`This is the quiz API`)
});

app.get('/quizzes/:quiz/:difficulty', (req, res) => {
    res.send(quiz)
})

module.exports = app;
