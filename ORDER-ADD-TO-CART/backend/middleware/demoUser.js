// src/middleware/demoUser.js

// Simple middleware to simulate logged-in user
const demoUser = (req, res, next) => {
  // later replace with real JWT
  req.userId = "demo-user";
  next();
};

module.exports = demoUser;
