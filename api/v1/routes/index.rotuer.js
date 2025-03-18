const taskRouter = require("./task.router")
const userRouter = require("./user.router")

module.exports = (app) => {
    const apiVersion = "/api/v1"

    app.use(apiVersion + "/tasks", taskRouter)
    
    app.use(apiVersion + "/users", userRouter)
}