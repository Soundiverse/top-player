CREATE TABLE songs (
  songid SERIAL PRIMARY KEY,
  songname VARCHAR(100),
  userid INT,
  timesongcreatedat VARCHAR(50),
  songcover VARCHAR(100),
  soundwaveimage VARCHAR(100),
  songfile VARCHAR(100),
  playlist VARCHAR(100),
  tag VARCHAR(100)
);

CREATE TABLE users (
  userid SERIAL PRIMARY KEY,
  username VARCHAR(150),
  useravatar VARCHAR(100),
  location VARCHAR(150),
  followers INT,
  following INT,
  personallink  VARCHAR(100)
);

CREATE TABLE comments (
  commentid SERIAL PRIMARY KEY,
  comment VARCHAR(250),
  userid INT,
  songid  INT,
  timeonsong SMALLINT,
  timecommentcreatedat VARCHAR(50)
);

copy songs from '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/postgresql/data/songstable.csv' (delimiter ',');

copy users from '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/postgresql/data/userstable.csv' (delimiter ',');

copy comments from '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/postgresql/data/commentstable.csv' (delimiter ',');

ALTER TABLE songs ADD CONSTRAINT fk1 FOREIGN KEY (userid) REFERENCES users(userid);

ALTER TABLE comments ADD CONSTRAINT fk1 FOREIGN KEY (userid) REFERENCES users(userid);

ALTER TABLE comments ADD CONSTRAINT fk2 FOREIGN KEY (userid) REFERENCES users(userid);