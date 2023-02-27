const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true 
    },
    otp: {
        type: Number,
    },
    token: {
        type: String,
    },
});

module.exports = mongoose.model('Account', accountSchema);