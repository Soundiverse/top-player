DROP KEYSPACE IF EXISTS topplayerservice;

CREATE KEYSPACE IF NOT EXISTS topplayerservice
  WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE topplayerservice;

CREATE TABLE songs (
  songid int,
  songtitle varchar,
  userid int,
  username varchar,
  avatar varchar,
  postdate varchar,
  tag varchar,
  albumcover varchar,
  mediafile varchar,
  PRIMARY KEY (songid, userid)
);

CREATE TABLE users (
  userid int,
  username varchar,
  avatar varchar,
  location varchar,
  followers int,
  following int,
  personallink varchar,
  PRIMARY KEY (userid, location)
);

CREATE TABLE comments (
  commentid uuid,
  comment varchar,
  userid int,
  username varchar,
  avatar varchar,
  songid int,
  songtitle varchar,
  timeonsong int,
  timecommentcreatedat varchar,
  PRIMARY KEY (songid, songtitle, timeonsong, commentid)
);
