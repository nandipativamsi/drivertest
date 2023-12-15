// Downloading dependencies
const express = require('express')
const path = require('path')
const ejs = require('ejs')

// Initalising and setting properties
const app = new express()
app.set('view engine','ejs')
app.use(express.static('public'))
const mongoose = require('mongoose');
const User = require('./models/UserInfo');
const expressSession = require('express-session')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({
    secret: 'my secret',
    resave: true,
    cookie: {maxAge: 500000},
    saveUninitialized: false
}));

var mongoDbQuery = 'mongodb+srv://vnandipati2647:Conestoga@cluster0.m0o212v.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDbQuery, {useNewUrlParser: true});

//Starting the application on port 4000
app.listen(4000, ()=>{
console.log('App listening on port 4000')
});

const dashboardController = require('./controller/dashboard');
const g2Controller = require('./controller/g2');
const gController = require('./controller/g');
const loginController = require('./controller/login');
const appointmentController = require('./controller/appointment');
const examinerController = require('./controller/examiner');
const testResultsController = require('./controller/testResults');
const usertestResultsController = require('./controller/fetchUserResults');
const validateSignupPasswordMiddleWare = require('./controller/signupMiddleware');
const newUserSignupController = require('./controller/newUserSignup');
const validateMiddleWare = require('./controller/validateMiddleware');
const validateGinfoMiddleWare = require('./controller/validateGinfoMiddleware');
const updateUserInfoController = require('./controller/updateUserInfo');
const postLoginController = require('./controller/postLogin');
const loginMiddleware = require('./controller/loginMiddleware');
const redirectIfAuthenticatedMiddleware = require('./controller/redirectIfAuthenticated');
const userTypeDriverController = require('./controller/userTypeDriver');
const userDataDefaultMiddleware = require('./controller/userDataDefault');
const updateUserGInfoController = require('./controller/updateUserGInfo');
const userTestResultsController = require('./controller/updateDriverTestResults')
const logoutController = require('./controller/logout');
const adminMiddleware = require('./controller/adminMiddleware');
const createAppointmentController = require('./controller/createAppointment');
const appointmentMiddleware = require('./controller/appointmentMiddleware');
const appointmentsTimeController = require('./controller/fetchAppointments');
const userAppointmentsController = require('./controller/fetchUsersAndAppointment');
const examinerMiddleware = require('./controller/examinerMiddleware');

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn=req.session.userType;
    next()
});

// app.use("*", userTypeDriverController);


// route for dashboard page
app.get('/',loginMiddleware,dashboardController);

// route for dashboard page
app.get('/dashboard',dashboardController);

// route for g2 page
app.get('/g2',loginMiddleware,g2Controller);

// route for g page
app.get('/g',loginMiddleware,gController);

// route for appointment page
app.get('/appointment',adminMiddleware,appointmentController);

// route for appointment page
app.get('/getAppointments',appointmentsTimeController);

// route for appointment page
app.get('/fetchUsersAndAppointments',userAppointmentsController);

// route for examiner page
app.get('/examiner',examinerMiddleware,examinerController);

// route for examiner page
app.get('/testresults',adminMiddleware,testResultsController);

// route for examiner page
app.get('/drivertestresults',loginMiddleware,usertestResultsController);

// route for login page
app.get('/login',redirectIfAuthenticatedMiddleware,loginController);

// route for logout
app.get('/logout',logoutController);

// To store the user information by validating in middle ware
app.post('/signup',validateSignupPasswordMiddleWare,newUserSignupController);

// To store the user information by validating in middle ware
app.post('/g2/updateCustomerInfo',validateMiddleWare,updateUserInfoController);

// to update the car information of the user
app.post('/g/updateCustomerInfo',validateGinfoMiddleWare,updateUserGInfoController);

// to update the car information of the user
app.post('/submitTestResult',userTestResultsController);


app.post('/login',postLoginController)


app.post('/appointmentSlot',appointmentMiddleware,createAppointmentController);

