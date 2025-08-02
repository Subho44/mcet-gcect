const express = require('express');
const router = express.Router();
const pctrl= require('../controllers/productController');

router.post('/add',pctrl.createproduct);
router.get('/view',pctrl.getproducts);
router.get('/view/:id',pctrl.singleproduct);

module.exports = router;