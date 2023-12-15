const User = require('../models/UserInfo');

module.exports = async (req,res,next) => {
    try{
        if(req.body.signup_username == '' || req.body.signup_password == ''
            || req.body.signup_re_password == '' || req.body.signup_password !== req.body.signup_re_password){
            return res.render('login',{loginMessage:null,signupMessage:'All fields are requierd & password and retype should match'})
        }
        next();
    }catch (error){
        console.log(error);
        // res.status(500).send('An error occurred while checking the user session');
        res.render('login',{loginMessage:error,signupMessage:null})
    }
};