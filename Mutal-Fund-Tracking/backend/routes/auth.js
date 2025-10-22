const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/Otp');
const {sendOtpEmail} = require('../utils/mailer');

const OTP_EXPIRE_MIN = Number(process.env.OTP_EXPIRE_MIN) || 10;

function generateOtp() {
    return Math.floor(100000 +Math.random()*900000).toString();
}

//genarate otp by email

router.post('/request-otp', async(req,res)=>{
    try {
        const {email} = req.body;

        //generate otp
        const otp = generateOtp();
        const otpHash= await bcrypt.hash(otp);
        const expiresAt = new Date(Date.now() + OTP_EXPIRE_MIN *60 *1000);
        await Otp.create({email,otpHash,expiresAt});
        await sendOtpEmail(email,otp);
        return res.json({message:'otp sent email'});
    } catch(err) {
        return res.status(400).json({message:'server error'});
    }
});
//otp verify


//token