const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:Number(process.env.SMTP_PORT) || 587,
    secure:Number(process.env.SMTP_PORT) === 465,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    }
});

async function sendOtpEmail(to,otp) {
    const subject = '1234';
    const text = `otp is ${otp}. it expires in ${process.env.OTP_EXPIRE_MIN || 10} minutes.`;
    const html = `otp is ${otp}. it expires in ${process.env.OTP_EXPIRE_MIN || 10} minutes.`;
 
    const info = await transporter.sendMail({
        from:process.env.FROM_EMAIL,
        to,
        subject,
        text,
        html
    });
    return info;
    
}
module.exports = {sendOtpEmail};