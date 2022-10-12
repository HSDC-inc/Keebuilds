const loginSignupController = {};
const db = require('../models/keebuildsModel');
const bcrypt = require('bcrypt');
const SALT = 10;

loginSignupController.getUser = async (req, res, next) => {
  const { username, password } = req.query;
  const command = `SELECT * FROM users WHERE username='${username}';`;
  try {
    const user = await db.query(command);
    if (user.rows.length) {
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      res.locals.isLogged = { isLogged: validPassword };
      return next();
    } else {
      res.locals.isLogged = { isLogged: false };
      return next();
    }

  } catch (err) {
    return next({ log: 'Error in getUser middleware function' });
  }

};

loginSignupController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  const command = `SELECT username FROM users WHERE username='${username}';`;
  try {
    const user = await db.query(command);
    if (user.rows.length) { //Checks if database has username
      res.locals.isLogged = {isLogged: false };
      return next();
    } else {  //Else database does not have username, creates newUser
      const salt = await bcrypt.genSalt(Number(SALT)); //hashing password via encrypting
      const hashPassword = await bcrypt.hash(password, salt); //you are sending the password. We are hashing password received from req.body with salt.
      const newUserCommand = `INSERT INTO users (username, password) VALUES ('${username}', '${hashPassword}');`;

      await db.query(newUserCommand);

      res.locals.isLogged = {isLogged: true };
      return next();
    }

  } catch (err) {
    return next({ log: 'Error in createUser middleware function' });
  }

};

module.exports = loginSignupController;
