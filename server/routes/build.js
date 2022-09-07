const express = require('express');
const keebuildsController = require('./../controllers/keebuildsController');
const buildRouter = express.Router();


// Post a build to the database
buildRouter.post('/build', keebuildsController.createBuild, (req, res) => {
  return res.status(201).json(res.locals.dbResponse);
});
  
//Get build from database
buildRouter.get(
  '/session/:id',
  keebuildsController.getBuildsForSession,
  (req, res) => {
    return res.status(200).json(res.locals.builds);
  }
);
  
buildRouter.delete(
  '/build/:id',
  keebuildsController.deleteBuild,
  (req, res) => {
    return res.status(204).send();
  }
);

buildRouter.get('/', (req,res,next)=>{
    res.send('hello????');
})

module.exports = buildRouter;
  