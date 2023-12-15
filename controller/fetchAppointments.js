const Appointment = require('../models/AppointmentInfo');

module.exports = async (req,res) => {
    try {
        const selectedDate = req.query.date;

        // Fetch existing appointment timings for the selected date
        const existingAppointments = await Appointment.find({ date: selectedDate });

        res.json(existingAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
