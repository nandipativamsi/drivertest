const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
date: {
    type: Date,
    required: true
},
time: {
    type: String,
    required: true
},
isTimeSlotAvailable: {
    type: Boolean,
    default: true
}
});

AppointmentSchema.index({ date: 1, time: 1 }, { unique: true });

const Appointment = mongoose.model('AppointmentSlots',AppointmentSchema);
module.exports = Appointment;