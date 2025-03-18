const User = require("../models/user.model")
const md5 = require("md5")

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