const User = require('../models/UserInfo');
const Appointment = require('../models/AppointmentInfo');

module.exports = async (req,res) => {
    try {
        const {firstName,lastName,licenseNumber,age,carMaker,carModel,carYear,plateNumber,date,time} = req.body

        const user = {
            firstName,
            lastName,
            licenseNumber,
            age,
            carDetails:{
                carMaker,
                carModel,
                carYear,
                plateNumber
            },
            appointmentId: time,
            testType: 'G2'
        };

        const userInfo = await User.findOneAndUpdate({
            _id: req.session.userId
        },user,{new: true});

        console.log(userInfo);
        
        const appointment = {
            isTimeSlotAvailable: false
        }

        const appointmentInfo = await Appointment.findOneAndUpdate({
            _id: time
        },appointment,{new: true});

        console.log(appointmentInfo);
        return res.redirect('/dashboard');
       }
    catch (error) {
        console.log(error);
    } 
}