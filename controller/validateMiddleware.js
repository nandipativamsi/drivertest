const User = require('../models/UserInfo');

module.exports = async (req,res,next) => {
    try{
        if(req.body.firstName == '' || req.body.lastName == '' || req.body.licenseNumber == ''
            || req.body.age == '' || req.body.carMaker == ''|| req.body.carModel == '' || req.body.carYear == null
            || req.body.carYear == '' || req.body.plateNumber == ''){
            return res.redirect('/g2');
	    }
	    next();
    }catch (error){
        console.log(error);
        res.status(500).send('An error occurred while checking the user session');
    }
};