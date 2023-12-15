const User = require('../models/UserInfo');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const { username, password } = req.body;
    try {
    const user = await User.findOne({ username: username }).exec();

    if (user) {
        const same = await bcrypt.compare(password, user.password);

        if (same) {
                req.session.userId = user._id;
                req.session.userType = user.userType;
                res.redirect('/');
            } else {
                res.render('login',{loginMessage:'Invalid Password',signupMessage:null});
            }
        } else {
            res.render('login',{loginMessage:'Invalid Username/Password',signupMessage:null});
        }
    } catch (error) {
        console.error(error);
        // res.status(500).send('An error occurred during login');
        res.render('login',{loginMessage:error,signupMessage:null});
    }
}