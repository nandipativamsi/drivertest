const Appointment = require('../models/AppointmentInfo');

module.exports = async (req,res) => {
    try {
       
        const appointment = await Appointment.create({
            date: req.body.date,
            time: req.body.time
        });

        console.log(appointment);
        return res.render('appointment',{appointmentMessage: 'Appointment Created!'});
       }
    catch (error) {
        console.log(error);
    } 
}