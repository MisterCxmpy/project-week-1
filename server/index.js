const app = require('./app.js')
require('dotenv').config()
const port = process.env.PORT

app.listen(port, (req, res) => {
    console.log(`App is now listening on port ${port}`)
})
