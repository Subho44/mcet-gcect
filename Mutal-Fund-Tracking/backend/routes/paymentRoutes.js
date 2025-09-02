const express = require('express');
const router = express.Router();
const paymentctrl = require('../controllers/paymentController');

router.post('/create',paymentctrl.createOrder);
router.post('/verify',paymentctrl.verifyPayment);

module.exports = router;