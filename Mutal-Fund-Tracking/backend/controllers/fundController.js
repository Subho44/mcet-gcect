const Fund = require('../models/Fund');

//add fund
exports.addfund = async(req,res)=>{
    try {
        const newfund = await Fund.create(req.body);
        res.status(201).json(newfund);
    }catch(err) {
         res.status(400).json({error:err.message});
    }
};
//view all fund
exports.getfunds = async(req,res)=>{
    try {
        const funds = await Fund.find();
        res.status(200).json(funds);
    }catch(err) {
         res.status(400).json({error:err.message});
    }
};
//update
exports.updatefund = async(req,res)=>{
    try {
        const fund = await Fund.findByIdAndUpdate(req.params.id, req.body,{new:true});
        res.status(201).json(fund);
    }catch(err) {
         res.status(400).json({error:err.message});
    }
};
//delete
exports.deletefund = async(req,res)=>{
    try {
        await Fund.findByIdAndDelete(req.params.id);
        res.status(201).json({message:"fund deleted"});
    }catch(err) {
         res.status(400).json({error:err.message});
    }
};