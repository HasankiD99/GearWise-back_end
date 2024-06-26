const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appoinmentController');

// Get appointments
router.get('/', appointmentController.getAppointmentsByDate);
router.get('/count', appointmentController.appoinmentCount);

// view appointment for relevant user
router.get('/viewappointment/:id', appointmentController.getappointment);

//add appoinments
router.post('/createappointment',appointmentController.createAppoinment);

//cancel appointment
router.put('/cancelappointmnet/:id',appointmentController.updateAppointmentStatus);

module.exports = router;
