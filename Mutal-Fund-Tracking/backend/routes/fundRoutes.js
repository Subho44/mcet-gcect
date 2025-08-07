const express = require('express');
const router = express.Router();
const fundcontroller = require('../controllers/fundController');


router.post('/add',fundcontroller.addfund);
router.get('/',fundcontroller.getfunds);
router.put('/update/:id',fundcontroller.updatefund);
router.delete('/delete/:id',fundcontroller.deletefund);


module.exports = router;