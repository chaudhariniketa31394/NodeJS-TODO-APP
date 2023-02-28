const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true 
    },
    otp: {
        type: Number,
    },
    token: {
        type: String,
    },
    isActive: {
        type:Boolean,
        default:false
    },
    password:String

});

module.exports = mongoose.model('Account', accountSchema);