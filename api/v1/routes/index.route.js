const express = require("express")
const router = express.Router();

const taskRoute = require("./task.route")
const userRoute = require("./users.route")

module.exports = (app) => {
    const version = "/api/v1";
    app.use(version + "/tasks", taskRoute);
    app.use(version + "/users", userRoute);
}