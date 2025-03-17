const taskRouter = require("./task.router")

module.exports = (app) => {
    const apiVersion = "/api/v1"

    app.use(apiVersion + "/tasks", taskRouter)
}