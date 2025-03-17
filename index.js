require("dotenv").config();
const express = require('express')
const app = express()
const port = process.env.PORT || 8080

// connect database
const database = require("./config/database")
database.connect();

const Task = require("./models/task.model")

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find({
        deleted : false
    })
    console.log(tasks)
    res.json(tasks)
})

app.get('/tasks/detail/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOne({
            _id : id,
            deleted : false,
        })
        res.json(task)
    } catch (error) {
        res.json("Khong tim thay")
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})