require("dotenv").config();
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const router = require("./api/v1/routes/index.rotuer")

// connect database
const database = require("./config/database")
database.connect();

const Task = require("./models/task.model")

router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})