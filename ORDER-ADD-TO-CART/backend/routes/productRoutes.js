const express = require("express");
const router = express.Router();

const {
    seedProducts,
    getproducts
} = require ('../controllers/productController');

router.post('/seed',seedProducts);
router.get("/",getproducts);

module.exports = router;