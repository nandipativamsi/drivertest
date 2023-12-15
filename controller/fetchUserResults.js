const User = require('../models/UserInfo');
const Appointment = require('../models/AppointmentInfo');
const bcrypt = require('bcrypt');

module.exports = async (req,res) =>{
    const user = await User.findById(req.session.userId).exec();
      
    return res.render('drivertestresult',{ userData:user });
    
}