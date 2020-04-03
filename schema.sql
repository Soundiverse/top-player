DROP DATABASE IF EXISTS topplayerservice;

CREATE DATABASE topplayerservice;

DROP TABLE IF EXISTS songs CASCADE;
CREATE TABLE songs (
  songid SERIAL PRIMARY KEY,
  songname VARCHAR(50),
  userid INT,
  playlistid INT,
  length SMALLINT,
  timecreatedat TIMESTAMP,
  tag VARCHAR(50),
  songcover VARCHAR(50),
  soundwaveimage VARCHAR(100),
  songfile VARCHAR(100),
  commentid INT
);

DROP TABLE IF EXISTS playlists CASCADE;
CREATE TABLE playlists (
  playlistid INT PRIMARY KEY,
  playlistname VARCHAR
);

DROP TABLE IF EXISTS tags CASCADE;
CREATE TABLE tags (
  tag VARCHAR(50) PRIMARY KEY,
  songid  INT,
  playlistid  INT
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  userid SERIAL PRIMARY KEY,
  username VARCHAR(50),
  useravatar VARCHAR(100),
  playlistid  INT,
  location VARCHAR(50),
  followers INT,
  following INT,
  personallink  VARCHAR(100)
);

DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
  commentid SERIAL PRIMARY KEY,
  comment VARCHAR(250),
  userid INT,
  songid  INT,
  timeonsong SMALLINT,
  timecreatedat TIMESTAMP,
  replyid INT
);

DROP TABLE IF EXISTS replies CASCADE;
CREATE TABLE replies (
  replyid SERIAL PRIMARY KEY,
  reply VARCHAR(250),
  userid  INT,
  timecreatedat TIMESTAMP
);

ALTER TABLE songs ADD CONSTRAINT fk1 FOREIGN KEY (userid) REFERENCES users(userid);

ALTER TABLE songs ADD CONSTRAINT fk2 FOREIGN KEY (playlistid) REFERENCES playlists(playlistid);

ALTER TABLE songs ADD CONSTRAINT fk3 FOREIGN KEY (tag) REFERENCES tags(tag);

ALTER TABLE songs ADD CONSTRAINT fk4 FOREIGN KEY (commentid) REFERENCES comments(commentid);

ALTER TABLE comments ADD CONSTRAINT fk1 FOREIGN KEY (userid) REFERENCES users(userid);

ALTER TABLE comments ADD CONSTRAINT fk2 FOREIGN KEY (replyid) REFERENCES replies(replyid);

ALTER TABLE tags ADD CONSTRAINT fk1 FOREIGN KEY (playlistid) REFERENCES playlists(playlistid);

ALTER TABLE users ADD CONSTRAINT fk1 FOREIGN KEY (playlistid) REFERENCES playlists(playlistid);

ALTER TABLE replies ADD CONSTRAINT fk1 FOREIGN KEY (userid) REFERENCES users(userid);