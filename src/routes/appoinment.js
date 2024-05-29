const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appoinmentController');

// Get appointments
router.get('/', appointmentController.getAppointmentsByDate);
//add appoinments
router.post('/',appointmentController.createAppoinment);
module.exports = router;