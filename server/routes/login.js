const express = require('express');
const loginSignupController = require('../controllers/loginSignupController.js');
const loginRouter = express.Router();


// Post a build to the database
loginRouter.get('/', loginSignupController.getUser, (req, res) => {
  return res.status(201).json(res.locals.isLogged);
});
  

module.exports = loginRouter;
  