const User = require('../models/UserInfo');

module.exports = async (req,res) => {
    try {
        //  const {firstName,lastName,licenseNumber,age,carMaker,carModel,carYear,plateNumber} = req.body

        const user = await User.create({
            username: req.body.signup_username,
            password: req.body.signup_password,
            userType: req.body.UserType
        });

        console.log(user);
        res.render('login',{loginMessage:null,signupMessage:'User Created Succefully'});
       }
    catch (error) {
        console.log(error);
        res.render('login',{loginMessage:null,signupMessage:'User already exist! Please create with another user name'});
    } 
}