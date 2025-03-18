const ForgotPassword = require("../models/forgotPassword.model")
const User = require("../models/user.model")
const md5 = require("md5")
const generateHelper = require("../../../helpers/generate")
const sendMailHelper = require("../../../helpers/sendMail")

// [POST] /api/v1/user/register
module.exports.register = async (req, res) =>{
    req.body.password = md5(req.body.password)
    const {fullName, email, password} = req.body

    const exitEmail = await User.findOne({
        email : email,
        deleted : false
    })
    console.log(exitEmail);
    if(exitEmail){
        res.json({
            code : 400,
            message : "Tài khoản email đã tồn tại"
        })
    }else{
        const user = new User({
            fullName : fullName,
            email : email,
            password : password
        })
        await user.save();
        const tokenUser = user.tokenUser
        res.cookie("tokenUser", tokenUser)
        
        res.json({
            code : 200,
            message : "Đăng kí tài khoản thành công",
            tokenUser : tokenUser
        })
    }
}

// [POST] /api/v1/user/login
module.exports.login = async (req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({
        email : email,
        deleted : false
    })
    if(!user){
        res.json({
            code : 400,
            message : "Email không tồn tại"
        })
        return;
    }

    if(md5(password) !== user.password){
        res.json({
            code : 400,
            message : "Sai mật khẩu"
        })
        return;
    }

    const tokenUser = user.tokenUser;
    res.cookie("tokenUser", tokenUser)
    res.json({
        code : 200,
        message : "Đăng nhập thành công",
        tokenUser : tokenUser
    })
}

// [POST] /api/v1/password/forgot
module.exports.forgotPassword = async (req, res) =>{
    const email = req.body.email;
    const user = await User.findOne({
        email : email,
        deleted : false
    })

    if(!user){
        res.json({
            code : 400,
            message : "Email không tồn tại"
        })
        return;
    }
    // Bước 1 : Tạo ra mã otp và lưu vào database {mã otp, email}, lưu với thời gian nhất định
    const otp = generateHelper.generateRandomNumber(6);
    const objectForgot = {
        email : email,
        otp : otp,
        expireAt : Date.now()
    }

    const forgotPassword = new ForgotPassword(objectForgot);
    await forgotPassword.save();

    // Gửi otp qua mail cho người dùng 
    const subject = "Cấp mã OTP";
    const html = `Mã xác thực của bạn là : <b>${otp}</b>.Hết hạn trong thời gian 1 phút. Vui lòng không tiết lộ cho ai khác.`
    sendMailHelper.sendEmail(email, subject, html)
    
    res.json({
        code : 200,
        message : "Đã gửi mã OTP qua email"
    })
}

// [POST] /api/v1/password/otp
module.exports.otpPassword = async (req, res) =>{
    const {email, otp} = req.body;

    const result = await ForgotPassword.findOne({
        email : email,
        otp : otp
    })

    if(!result){
        res.json({
            code : 400,
            message : "Mã otp không đúng"
        })
        return;
    }

    const user = await User.findOne({
        email : email
    })
    
    const tokenUser = user.tokenUser;
    res.cookie("tokenUser", tokenUser);

    res.json({
        code : 200,
        message : "Xác thực mã OTP thành công"
    })
}

// [POST] /api/v1/password/reset
module.exports.resetPassword = async (req, res) =>{
    const password = md5(req.body.password);
    const tokenUser = req.cookies.tokenUser;

    const user = await User.findOne({tokenUser : tokenUser})

    if(password == user.password){
        res.json({
            code : 400,
            message : "Cập nhật mật khẩu khác với mật khẩu cũ"
        })
        return;
    }

    await User.updateOne(
        {tokenUser : tokenUser},
        {password : password}
    )

    res.json({
        code : 200,
        message : "Cập nhật mật khẩu thành công"
    })
}