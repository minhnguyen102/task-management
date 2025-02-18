const express = require('express')
const database = require("./config/database")
require("dotenv").config()
const routesApiV1 = require("./api/v1/routes/index.route")

const app = express()
const port = 3000

database.connect();

routesApiV1(app);


// app.get('/task', async (req, res) => {
//     const taks = await Taks.find({
//         deleted : false
//     });
//     console.log(taks);

//     res.json(taks)
// })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})