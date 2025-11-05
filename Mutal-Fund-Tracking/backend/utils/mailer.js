const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter connection (optional but helpful)
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to SMTP server:', error);
  } else {
    console.log('SMTP server is ready to take messages.');
  }
});

async function sendOtpEmail(to, otp) {
  try {
    const expireMinutes = process.env.OTP_EXPIRE_MIN || 10;
    const subject = 'Your One-Time Password (OTP)';
    const text = `Your OTP is ${otp}. It will expire in ${expireMinutes} minutes.`;
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>🔐 Your OTP Code</h2>
        <p>Your verification code is:</p>
        <h1 style="color: #2d89ef;">${otp}</h1>
        <p>This code will expire in <strong>${expireMinutes} minutes</strong>.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      text,
      html,
    });

    console.log('OTP email sent successfully:', info.messageId);
    return info;
  } catch (err) {
    console.error('Error sending OTP email:', err);
    throw new Error('Failed to send OTP email');
  }
}

module.exports = { sendOtpEmail };
