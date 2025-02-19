const express = require('express')
const database = require("./config/database")
require("dotenv").config()
const cors = require('cors')
const routesApiV1 = require("./api/v1/routes/index.route")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

// Cors
app.use(cors())

// connect database
database.connect();

// parse application/json
app.use(bodyParser.json())

routesApiV1(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})