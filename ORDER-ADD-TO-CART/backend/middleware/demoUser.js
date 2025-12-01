
const demoUser = (req,res,next) => {
    req.userId = "demo-user";
    next();
};
module.exports = demoUser;