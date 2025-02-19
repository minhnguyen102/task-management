const User = require("../models/user.model")
const md5 = require("md5")

// [POST] /api/v1/users/register
module.exports.register = async (req, res) =>{
    req.body.password = md5(req.body.password);

    const exitEmail = await User.findOne({
        email : req.body.email,
        deleted : "false"
    })

    if(exitEmail){
        res.json({
            code : 404,
            message : "Tai khoan da ton tai"
        })
    }else{
        const user = new User(req.body);
        user.save();
        
        const tokenUser = user.tokenUser;
        res.cookie("token", tokenUser);

        res.json({
            code : 200,
            message : "Thanh cong",
            token : tokenUser
        })
    }

    
}

// [POST] /api/v1/users/login
module.exports.login = async (req, res) =>{
    console.log(req.body);
    const email= req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email : email,
        deleted : false
    })

    if(!user){
        res.json({
            code : 404,
            message : "Email khong ton tai"
        })
        return;
    }
    if(md5(password) !== user.password){
        res.json({
            code : 404,
            message : "Sai mat khau"
        })
        return;
    }

    const tokenUser = user.tokenUser;
    res.cookie("token", tokenUser);

    res.json({
        code : 200,
        message : "Đăng nhập thành công",
        token : tokenUser
    })
}