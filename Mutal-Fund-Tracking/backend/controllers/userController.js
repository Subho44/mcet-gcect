const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        const hashedpassword = await bcrypt.hash(password,15);
        const user = await User.create({name,email,password:hashedpassword});
         res.status(201).json(user);
    }catch(err) {
        res.status(400).json({error:'user already exists'});
    }
}
exports.login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({error:'Invalid credential'});

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET,{expiresIn:'1d'});
         res.status(201).json(token);
    }catch(err) {
        res.status(400).json({error:'user already exists'});
    }
}