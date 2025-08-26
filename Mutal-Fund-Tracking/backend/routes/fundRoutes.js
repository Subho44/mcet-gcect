const express = require('express');
const router = express.Router();
const multer = require("multer");
const fundcontroller = require('../controllers/fundController');

//multer config or image upload
const storage = multer.diskStorage({
    destination:(req,file,cb) => cb(null,"uploads/"),
    filename:(req,file,cb)=> cb(null,Date.now()+ "-"+file.originalname),
});
const upload = multer({storage});

router.post('/add',upload.single('photo'),fundcontroller.addfund);
router.get('/',fundcontroller.getfunds);
router.put('/update/:id',fundcontroller.updatefund);
router.delete('/delete/:id',fundcontroller.deletefund);


module.exports = router;