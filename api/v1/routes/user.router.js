const express = require("express")
const router = express.Router()
const controller = require("../controllers/users.controller")
const middlewareAuth = require("../middlewares/auth.middleware")

router.post('/register', controller.register)

router.post('/login', controller.login)

router.post('/password/forgot', controller.forgotPassword)

router.post('/password/otp', controller.otpPassword)

router.post('/password/reset', controller.resetPassword)

router.get('/detail', middlewareAuth.requireAuth, controller.detail)

router.get('/list', middlewareAuth.requireAuth, controller.list)


module.exports = router