const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, "Please provide the customer's name"],
    },
    phone1: {
        type: String,
        required: true,
    },
    phone2: {
        type: String,
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
    },
    registeredBy: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'active',
    },
    registeredDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Customer', customerSchema);
