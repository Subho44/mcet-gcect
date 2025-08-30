const express = require('express');
const router = express.Router();
const userctrl = require('../controllers/userController');

router.post('/register',userctrl.register);
router.post('/login',userctrl.login);

module.exports = router;