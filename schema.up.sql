CREATE TABLE songs (
  songid SERIAL PRIMARY KEY,
  songname VARCHAR(100),
  userid INT,
  playlistid INT,
  length INT,
  timecreatedat VARCHAR(50),
  tag VARCHAR(100),
  songcover VARCHAR(100),
  soundwaveimage VARCHAR(100),
  songfile VARCHAR(100),
  commentid INT
);

CREATE TABLE playlists (
  playlistid INT PRIMARY KEY,
  playlistname VARCHAR
);

CREATE TABLE tags (
  tag VARCHAR(150) PRIMARY KEY,
  songid  INT,
  playlistid  INT
);

CREATE TABLE users (
  userid SERIAL PRIMARY KEY,
  username VARCHAR(150),
  useravatar VARCHAR(100),
  playlistid  INT,
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
  timecreatedat VARCHAR(50),
  replyid INT
);

CREATE TABLE replies (
  replyid SERIAL PRIMARY KEY,
  reply VARCHAR(250),
  userid  INT,
  timecreatedat VARCHAR(50)
);

-- ALTER TABLE songs ADD CONSTRAINT fk1 FOREIGN KEY (userid) REFERENCES users(userid);

-- ALTER TABLE songs ADD CONSTRAINT fk2 FOREIGN KEY (playlistid) REFERENCES playlists(playlistid);

-- ALTER TABLE songs ADD CONSTRAINT fk3 FOREIGN KEY (tag) REFERENCES tags(tag);

-- ALTER TABLE songs ADD CONSTRAINT fk4 FOREIGN KEY (commentid) REFERENCES comments(commentid);

-- ALTER TABLE comments ADD CONSTRAINT fk1 FOREIGN KEY (userid) REFERENCES users(userid);

-- ALTER TABLE comments ADD CONSTRAINT fk2 FOREIGN KEY (replyid) REFERENCES replies(replyid);

-- ALTER TABLE tags ADD CONSTRAINT fk1 FOREIGN KEY (playlistid) REFERENCES playlists(playlistid);

-- ALTER TABLE users ADD CONSTRAINT fk1 FOREIGN KEY (playlistid) REFERENCES playlists(playlistid);

-- ALTER TABLE replies ADD CONSTRAINT fk1 FOREIGN KEY (userid) REFERENCES users(userid);

copy playlists from '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/postgresql/data/playliststable.csv' (delimiter ',');

copy songs from '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/postgresql/data/songstable.csv' (delimiter ',');

copy tags from '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/postgresql/data/tagstable.csv' (delimiter ',');

copy users from '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/postgresql/data/userstable.csv' (delimiter ',');

copy comments from '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/postgresql/data/commentstable.csv' (delimiter ',');

copy replies from '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/postgresql/data/repliestable.csv' (delimiter ',');