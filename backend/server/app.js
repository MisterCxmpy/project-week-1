const express = require('express')
const cors = require('cors')
const app = express()
const logger = require("./logger")

// const quiz = require("ENTER PATH TO QUIZ.JSON HERE")

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
    res.send(`This is the quiz API`)
});

app.get('/quiz/worldWar', (req, res) => {

})

app.get('/quiz/medieval', (req, res) => {

})

app.get('/quiz/warringStates', (req, res) => {

})


module.exports = app;
