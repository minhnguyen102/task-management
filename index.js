require("dotenv").config();
const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 8080
const bodyParser = require('body-parser')
const router = require("./api/v1/routes/index.rotuer")
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(cookieParser());
// connect database
const database = require("./config/database")
database.connect();

// parse application/json
app.use(bodyParser.json())

router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})