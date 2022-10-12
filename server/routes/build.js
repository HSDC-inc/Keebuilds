const express = require('express');
const keebuildsController = require('./../controllers/keebuildsController');

const loginSignupController = require('../controllers/loginSignupController.js');
const buildRouter = express.Router();


// Post a build to the database
buildRouter.post('/build', keebuildsController.createBuild, (req, res) => {
  return res.status(201).send('end of buildRouter post, create build');
});
  
//Get build from database
buildRouter.get(
  '/saved',
  keebuildsController.getBuildsForSession,
  (req, res) => {
    return res.status(200).json(res.locals.builds);
  }
);
  
buildRouter.delete(
  '/build',
  keebuildsController.deleteBuild,
  (req, res) => {
    return res.status(204).send('end of buildRouter delete, delete build');
  }
);


buildRouter.post('/signup', loginSignupController.createUser,
  (req, res) => {
    return res.status(201).json(res.locals.isLogged);
  });

buildRouter.get('/login', loginSignupController.getUser,
  (req, res) => {
    return res.status(201).json(res.locals.isLogged);
  });


module.exports = buildRouter;
  