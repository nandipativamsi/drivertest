const UserInfo = require('../models/UserInfo'); // Update the path
const Appointment = require('../models/AppointmentInfo');

// Define the route to fetch users and appointments
module.exports = async (req,res) => {
    try {
            // Fetch users with appointments and filter by testStatus being null
            const usersWithAppointments = await UserInfo.find({
                // testType: { $ne: null }, 
                // testStatus: { $ne: 'Pass' },
                username: { $ne: 'default' }, // Exclude users with default username
                appointmentId: { $exists: true } // Only include users with appointments
            });

            // Fetch appointments for each user
            const usersWithAppointmentsData = await Promise.all(usersWithAppointments.map(async (user) => {
            const appointment = await Appointment.findById(user.appointmentId);
            return {
                user: user,
                appointment: appointment,
            };
            }));
            console.log('usersWithAppointmentsData-----');
            // console.log(usersWithAppointmentsData);
            res.json(usersWithAppointmentsData);
  } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
  }
}