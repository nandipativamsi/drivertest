const User = require('../models/UserInfo');
const Appointment = require('../models/AppointmentInfo');
const bcrypt = require('bcrypt');
module.exports = async (req,res) =>{
    const user = await User.findById(req.session.userId).exec();
    // const same = await bcrypt.compare('default', user.licenseNumber);
    const same = user.lastName === 'default';
    if(same){
        res.render('g2',{ userData:false, appointmentData: null,user: null, message:null });
    }else{
        // res.render('g',{ user: user, message:null });
        const appointment = await Appointment.findById(user.appointmentId).exec();
        //formatting date in yyyy-MM-DD
        let dateObj = null;
        let formattedDate = null;
        let time = null;
        if(appointment){
            dateObj = new Date(`${appointment.date}`);
            formattedDate = dateObj.toISOString().split('T')[0];
            time = appointment.time;
        }
        
        return res.render('g',{ user, appointmentData: { date: formattedDate, time}, message:null });
    }
}