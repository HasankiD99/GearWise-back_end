const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    vehicleType:{
        type: String,
        required: true
    },
    vehicleModel:{
        type: String,
        required: true
    },
    mfYear:{
        type: String,
        required: true
    },
    vrNo:{
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Active"
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;