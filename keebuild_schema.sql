CREATE TABLE userFavorites (
    build_id serial NOT NULL PRIMARY KEY,
    build_name varchar NOT NULL,
    user_id int,
    FOREIGN KEY(user_id)
    REFERENCES users(user_id),
    case_type varchar NOT NULL,
    pcb varchar NOT NULL,
    plate varchar NOT NULL,
    switches varchar NOT NULL,
    keycaps varchar NOT NULL);

INSERT INTO userFavorites (build_name, user_id, case_type, pcb, plate, switches, keycaps)
VALUES ('buildOneDummy', 15, '100%', 'Hotswap','Polycarbonite','Linear','GMK');

INSERT INTO userFavorites (build_name, user_id, case_type, pcb, plate, switches, keycaps)
  SELECT 'build', user_id, 'TKL', 'trad', 'aluminium', 'clicky', 'pbt'
  FROM users
  WHERE username='dinosaur';
