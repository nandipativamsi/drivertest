const User = require('../models/UserInfo');

module.exports = async (req,res,next) => {
    try{
        const user = await User.findById(req.session.userId).exec();
        if(!user){
            res.render('login',{loginMessage:'User need to login/signup',signupMessage:null});
        } else if(user.userType!='Driver'){
            return req.session.userId;
        }
        next();
    }catch (error){
        console.log(error);
        res.status(500).send('An error occurred while checking the user session');
    }
}