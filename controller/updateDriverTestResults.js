const User = require('../models/UserInfo');

module.exports = async (req,res) => {
    try {
        const { userId, comments, testStatus } = req.body; 
        console.log(userId);
        // Find the user by ID
        const user = await User.findById(userId);
        console.log('inside driver test results backend');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user details with test results
        user.comments = comments;
        user.testStatus = testStatus;
        console.log(user.comments);
        console.log(user.testStatus);
        // Save the updated user information
        const userInfo = await User.findOneAndUpdate({
            _id: userId
        },user,{new: true});

        console.log(userInfo);

        return res.render('examiner',{examinerMessage:'Updated Driver Results'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}