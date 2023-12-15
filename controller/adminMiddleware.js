const User = require('../models/UserInfo');

module.exports = async (req,res,next) => {
    try{
        // console.log(req.session.userId);
        const user = await User.findById(req.session.userId).exec();
        // console.log(user);
        if(!user){
            return res.render('login',{loginMessage:'User not login/signup',signupMessage:null});
        } else if(user.userType!='Admin'){
            return res.redirect('/dashboard');
        }
        next();
    }catch (error){
        console.log(error);
        res.status(500).send('An error occurred while checking the user session');
    }
};