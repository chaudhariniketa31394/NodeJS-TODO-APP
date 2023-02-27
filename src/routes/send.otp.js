const express = require("express");
const router = express.Router();
const isLogged = require("../utils/validator")

const {sendMail}  = require("../utils/email")
let Account = require("../models/account");

// route for when user deletes a todo item
router.post('/send', async function (req, res) {
    const otp = (Math.floor(100000 + Math.random() * 900000));
    const result = await Account.findOneAndUpdate({_id: req.body._id,email: req.body.email}, { '$set':{otp: otp }},{new:true}); 
    console.log("resultresult",result)
    if(!result) return res.status(400).json({success: false,
        message: 'user not found'})
    await sendMail({OTP:otp, to: req.body.email, subject:"OTP For Login"}).catch((error) =>{ return res.status(500).json({  success: false,
        message: 'Something went wrong'})})
 return res.status(200).json({  success: true,
    message: 'otp send successfully'})
});

module.exports = router;