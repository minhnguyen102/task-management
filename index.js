require("dotenv").config();
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const router = require("./api/v1/routes/index.rotuer")
var bodyParser = require('body-parser')

// connect database
const database = require("./config/database")
database.connect();

// parse application/json
app.use(bodyParser.json())

router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})