const taskRouter = require("./task.router")
const userRouter = require("./user.router")
const middlewareAuth = require("../middlewares/auth.middleware")

module.exports = (app) => {
    const apiVersion = "/api/v1"

    app.use(apiVersion + "/tasks",middlewareAuth.requireAuth, taskRouter)
    
    app.use(apiVersion + "/users", userRouter)
}