DROP KEYSPACE IF EXISTS topplayerservice;

CREATE KEYSPACE IF NOT EXISTS topplayerservice
  WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE topplayerservice;

CREATE TABLE songs (
  songid int,
  songname varchar,
  userid int,
  username varchar,
  useravatar varchar,
  timesongcreatedat varchar,
  tag varchar,
  songcover varchar,
  songfile varchar,
  PRIMARY KEY (songid, userid)
);

CREATE TABLE users (
  userid int,
  username varchar,
  useravatar varchar,
  location varchar,
  followers int,
  following int,
  personallink varchar,
  PRIMARY KEY (userid, location)
);

CREATE TABLE comments (
  commentid int,
  comment varchar,
  userid int,
  username varchar,
  useravatar varchar,
  songid int,
  songname varchar,
  timeonsong int,
  timecommentcreatedat varchar,
  PRIMARY KEY (songid, songname, timeonsong, commentid)
);

COPY songs (songid,songname,userid,username,useravatar,timesongcreatedat,tag,songcover,songfile) FROM '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/cassandra/data/songstable.csv';

COPY users (userid,username,useravatar,location,followers,following,personallink) FROM '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/cassandra/data/userstable.csv';

COPY comments (commentid,comment,userid,userName,useravatar,songid,songname,timeonsong,timecommentcreatedat) FROM '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/cassandra/data/commentstable.csv';