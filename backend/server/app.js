const express = require('express')
const cors = require('cors')
const app = express()
const logger = require("./logger")

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
    res.send(`This is the quiz API`)
})


module.exports = app;
