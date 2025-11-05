const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Otp = require("../models/Otp");
const { sendOtpEmail } = require("../utils/mailer");

const OTP_EXPIRE_MIN = Number(process.env.OTP_EXPIRE_MIN) || 10;

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Request OTP
router.post("/request-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Generate OTP
    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10); // ✅ Add salt rounds
    const expiresAt = new Date(Date.now() + OTP_EXPIRE_MIN * 60 * 1000);

    // Save OTP to DB
    await Otp.create({ email, otpHash, expiresAt });

    // Send OTP via email
    await sendOtpEmail(email, otp);

    return res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Error in /request-otp:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP are required" });

    const record = await Otp.findOne({ email });
    if (!record)
      return res.status(400).json({ message: "OTP not found. Please request again." });

    if (record.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    const match = await bcrypt.compare(otp, record.otpHash);
    if (!match) return res.status(400).json({ message: "Invalid OTP" });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, isVerified: true });
    }

    await Otp.deleteMany({ email });

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error("Error in /verify-otp:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get user profile
router.get("/me", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "Authorization header missing" });

    const token = auth.split(" ")[1];
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.id).select("-__v");
    return res.json({ user });
  } catch (err) {
    console.error("Error in /me:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
