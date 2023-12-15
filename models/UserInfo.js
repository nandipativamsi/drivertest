const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
// const Appointment = require('./AppointmentInfo');

const UserInfoSchema = new Schema({
firstName: {
    type: String,
    default: 'default'
},
lastName: {
    type: String,
    default: 'default'
},
licenseNumber: {
    type: String,
    default: 'default'
},
age: {
    type: Number,
    default: 0
},
username: {
    type: String,
    unique: true,
    required: true
},
password: {
    type: String,
    required: true
},
userType: {
    type: String,
    enum: ['Driver', 'Examiner', 'Admin'],
    required: true
},
carDetails:{
    carMaker: {
        type: String,
        default: 'default'
    },
    carModel: {
        type: String,
        default: 'default'
    },
    carYear: {
        type: Number,
        default: 0
    },
    plateNumber: {
        type: String,
        default: 'default'
    }
},
appointmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
},
testType: {
    type: String,
    enum: ['G2', 'G']
},
comments: String,
testStatus: {
    type: String,
    enum: ['Pass', 'Fail']
}
});


UserInfoSchema.pre('save',function(next){
    const user = this

    bcrypt.hash(user.licenseNumber, 10, (error, hash) => {
        user.licenseNumber = hash
    })  
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })  
})

const User = mongoose.model('UserInfo',UserInfoSchema);
module.exports = User;