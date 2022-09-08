const db = require('../models/keebuildsModel');

const errorCreator = (methodName, description) => ({
  log: `Error occurred in keebuildsController.${methodName}.\nDescription: ${description}`,
  message: `Error occurred in keebuildsController.${methodName}. See server logs for more details.`,
});

const generateInnerSelect = (k, v) => {
  if (k === 'switchType')
    return `(SELECT _id FROM public.switch WHERE name='${v}')`;
  return `(SELECT _id FROM public.${k} WHERE name='${v}'), `;
};

const keebuildsController = {};

keebuildsController.getBuildsForSession = (req, res, next) => {
  console.log(' builds for session: ', req.query);
  //get request with /api/saved?username=${username}
  //size, pcb, switch, plate, keycap need to be queried by Joining
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
      console.log('inside get builds for session query: ', response.rows);
      res.locals.builds = response.rows;
      return next();
    })
    .catch(err => {
      return next({
        log: 'Express error in get builds for session middleware',
        status: 400,
        message: {
          err: 'An error occurred in get builds for session middleware',
        },
      });
    });
};

keebuildsController.createBuild = (req, res, next) => {
  const { name, size, pcb, plate, keycap, username } = req.body;
  console.log(req.body);
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
      console.log(response);
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
  // console.log({query});
  db.query(query, values)
    .then(response => {
      console.log('inside the db query');
      return next();
    })
    .catch(() => errorCreator('deleteBuild', 'Failed to DELETE Build'));
};

module.exports = keebuildsController;

// keebuildsController.getBuildsForSession = (req, res, next) => {
//   const values1 = [req.query.username];
//   const query1 = 'SELECT user_id FROM users WHERE username = $1;';
//   const user_id = db.query(query1, values1);

//   console.log('we are inside the getBuildsForSession: ', req.query.username);
//   const values2 = [user_id];
//   const query2 = `
//   SELECT user_id, name, size, pcb, plate, switch, keycap
//   FROM userFavorites
//   WHERE user_id=$1
//   ;`;
//   db.query(query2, values2)
//     .then((data) => {
//       console.log('inside the second db query line 19', data);
//       res.locals.builds = data;
//       return next();
//     })
//     .catch(err => {
//       return next({
//         log: 'Express error in get builds for session middleware',
//         status: 400,
//         message: { err: 'An error occurred in get builds for session keebuilds controller' },
//       });
//     });
// };

// keebuildsController.createBuild = (req, res, next) => {
//   const { session, name, size, pcb, plate, keycaps, switches, color, username } = req.body;
//   const values2 = [name, size, pcb, plate, switches, keycaps ];

// // INSERT INTO userFavorites (build_name, case_type,pcb,plate,switches,keycaps)
// // VALUES ('buildOneDummy', '100%', 'Hotswap','Polycarbonite','Linear','GMK');
// };

// keebuildsController.deleteBuild = (req, res, next) => {
//   //build name is needed
//   const deleteQuery = `DELETE FROM userfavorites WHERE user_id=${req.query.user_id});`;

//   DELETE FROM tableA
// WHERE ROWID IN
//   ( SELECT q.ROWID
//     FROM tableA q
//       INNER JOIN tableB u on (u.qlabel = q.entityrole AND u.fieldnum = q.fieldnum)
//     WHERE (LENGTH(q.memotext) NOT IN (8,9,10) OR q.memotext NOT LIKE '%/%/%')
//       AND (u.FldFormat = 'Date'));
// const query = `DELETE FROM public.build b WHERE b._id=${req.params.id}`;
// console.log({query});
// db.query(query)
//   .then(() => next())
//   .catch(() => errorCreator('deleteBuild', 'Failed to DELETE Build'));
// };

// module.exports = keebuildsController;

// const queryString = `SELECT b._id, b.name, b.color, s.name as size, pcb.name as pcb, switch.name as switch, plate.name as plate, k.name as keycap FROM public.build b INNER JOIN public.size s ON b.size=s._id INNER JOIN public.pcb pcb ON b.pcb=pcb._id INNER JOIN public.switch switch ON b.switch=switch._id INNER JOIN public.plate plate ON b.plate=plate._id INNER JOIN public.keycap k ON b.keycap=k._id WHERE session=${req.params.id};`;
//   console.log({queryString});

//   db.query(queryString)
//     .then((result) => result.rows)
//     .then((result) => {
//       res.locals.builds = result;
//     })
//     .then(() => next())
//     .catch(() =>
//       next(errorCreator('getBuildsForSession', 'Error fetching builds from DB'))
//     );
