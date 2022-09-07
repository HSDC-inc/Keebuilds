const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const buildRouter = require('./routes/build.js');
const loginRouter = require('./routes/login.js');
const signupRouter = require('./routes/signup.js');

app.use(cors());
app.use(express.json());

// serve files on production mode webpack related
if (process.env.NODE_ENV !== 'development') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));
  app.get('/', (req, res) => {
    return res
      .status(200)
      .sendFile(path.resolve(__dirname, '../build/index.html'));
  });
}

app.get('/', (req,res,next)=>{
  res.status(200).sendFile(path.join(__dirname, '/../client/index.html'));
});

app.get('/whateverwewant', (req,res,next)=>{
  res.status(200).sendFile(path.join(__dirname, '/../build/bundle.js'));
});


app.use('/api/login', loginRouter) // we have to check if a user exists in the database

app.use('/api/signup', signupRouter) // createa a user and insert into data base

app.use('/api', buildRouter); //










// catch all handler for all unknown routes
app.use((req, res) => {
  res.status(404).send('404');
});

// global error handler catches all errors
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}...`));

module.exports = app;
