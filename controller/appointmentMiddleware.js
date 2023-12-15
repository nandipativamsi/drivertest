const Appointment = require('../models/AppointmentInfo')

module.exports = async (req,res,next) => {
    try{
        const appointment = await Appointment.findOne({date: req.session.date, time:req.session.time});
         if(appointment!=null){
            return res.render('appointment',{appointmentMessage:'Appointment Slot already exist'});
        }
        next();
    }catch (error){
        console.log(error);
        res.status(500).send('An error occurred while checking the user session');
    }
};