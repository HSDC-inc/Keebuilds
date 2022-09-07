const express = require('express');
const loginSignupController = require('../controllers/loginSignupController.js');
const signupRouter = express.Router();


// Post a build to the database
signupRouter.post('/', loginSignupController.createUser, (req, res, next) => {
  return res.status(201).json(res.locals.isLogged);
});
  
module.exports = signupRouter;
  