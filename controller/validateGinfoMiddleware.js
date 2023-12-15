const User = require('../models/UserInfo');

module.exports = async (req,res,next) => {
    try{
        if(req.body.carMaker == ''|| req.body.carModel == ''
            || req.body.carYear == '' || req.body.carYear == null || req.body.plateNumber == ''){
                return res.redirect('/g');
	    }
	    next();
    }catch (error){
        console.log(error);
        res.status(500).send('An error occurred while checking the user session');
    }
};