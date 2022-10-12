const db = require('../models/keebuildsModel');

const errorCreator = (methodName, description) => ({
  log: `Error occurred in keebuildsController.${methodName}.\nDescription: ${description}`,
  message: `Error occurred in keebuildsController.${methodName}. See server logs for more details.`,
});

const keebuildsController = {};

keebuildsController.getBuildsForSession = (req, res, next) => {
  const query = `
  SELECT 
    case_type as size,
    switches as switch,
    users.user_id,
    build_name as name,
    case_type as size,
    pcb,
    keycaps as keycap,
    plate,
    build_id
    FROM userFavorites
    INNER JOIN users ON userFavorites.user_id = users.user_id
    WHERE username = $1
  ;`;
  const values = [req.query.username];
  db.query(query, values)
    .then(response => {
      res.locals.builds = response.rows;
      return next();
    })
    .catch(err => {
      return next({
        log: 'Express error in get builds for session middleware',
        status: 500,
        message: {
          err: 'An error occurred in get builds for session middleware',
        },
      });
    });
};

keebuildsController.createBuild = (req, res, next) => {
  const { name, size, pcb, plate, keycap, username } = req.body;
  const switches = req.body.switch;
  const values = [name, size, pcb, plate, switches, keycap, username];
  const query = `
  INSERT INTO userFavorites (build_name, user_id, case_type, pcb, plate, switches, keycaps)
  SELECT $1, user_id, $2, $3, $4, $5, $6
  FROM users
  WHERE username=$7
  ;`;
  db.query(query, values)
    .then(response => {
      return next();
    })
    .catch(err => {
      return next({
        log: 'Express error caught in create build middleware',
        status: 400,
        message: { err: 'An error occurred in create build middleware' },
      });
    });
};

keebuildsController.deleteBuild = (req, res, next) => {
  const query = 'DELETE FROM userFavorites WHERE build_id=$1';
  const values = [req.query.build_id];
  db.query(query, values)
    .then(response => {
      return next();
    })
    .catch(() => errorCreator('deleteBuild', 'Failed to DELETE Build'));
};

module.exports = keebuildsController;
