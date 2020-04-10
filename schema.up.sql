CREATE TABLE songs (
  songid SERIAL PRIMARY KEY,
  songtitle VARCHAR(100),
  userid INT,
  postdate VARCHAR(50),
  albumcover VARCHAR(100),
  mediafile VARCHAR(100),
  tag VARCHAR(100)
);

CREATE TABLE users (
  userid SERIAL PRIMARY KEY,
  username VARCHAR(150),
  avatar VARCHAR(100),
  location VARCHAR(150),
  followers INT,
  following INT,
  personallink  VARCHAR(100)
);

CREATE TABLE comments (
  commentid SERIAL,
  comment VARCHAR(250),
  userid INT,
  songid  INT,
  timeonsong SMALLINT,
  timecommentcreatedat VARCHAR(50)
) PARTITION BY HASH (songid);

CREATE INDEX songid_in_comments ON comments(songid);

CREATE TABLE comments_1 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 0);
CREATE TABLE comments_2 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 1);
CREATE TABLE comments_3 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 2);
CREATE TABLE comments_4 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 3);
CREATE TABLE comments_5 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 4);
CREATE TABLE comments_6 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 5);
CREATE TABLE comments_7 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 6);
CREATE TABLE comments_8 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 7);
CREATE TABLE comments_9 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 8);
CREATE TABLE comments_10 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 9);
CREATE TABLE comments_11 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 10);
CREATE TABLE comments_12 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 11);
CREATE TABLE comments_13 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 12);
CREATE TABLE comments_14 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 13);
CREATE TABLE comments_15 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 14);
CREATE TABLE comments_16 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 15);
CREATE TABLE comments_17 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 16);
CREATE TABLE comments_18 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 17);
CREATE TABLE comments_19 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 18);
CREATE TABLE comments_20 PARTITION OF comments FOR VALUES WITH (MODULUS 20, REMAINDER 19);


copy songs from '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/postgresql/data/songstable.csv' (delimiter ',');

copy users from '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/postgresql/data/userstable.csv' (delimiter ',');

copy comments from '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/postgresql/data/commentstable.csv' (delimiter ',');

ALTER TABLE songs ADD CONSTRAINT fk1 FOREIGN KEY (userid) REFERENCES users(userid);

ALTER TABLE comments ADD CONSTRAINT fk1 FOREIGN KEY (userid) REFERENCES users(userid);

ALTER TABLE comments ADD CONSTRAINT fk2 FOREIGN KEY (songid) REFERENCES songs(songid);
