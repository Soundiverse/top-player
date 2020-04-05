DROP KEYSPACE IF EXISTS topplayerservice;

CREATE KEYSPACE IF NOT EXISTS topplayerservice
  WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};

USE topplayerservice;

CREATE TABLE songs (
  songid int,
  songname varchar,
  userid int,
  username varchar,
  useravatar varchar,
  playlistid int,
  playlistname varchar,
  length int,
  timesongcreatedat varchar,
  tag varchar,
  songcover varchar,
  soundwaveimage varchar,
  songfile varchar,
  commentid int,
  comment varchar,
  timeonsong int,
  timecommentcreatedat varchar,
  replyid int,
  reply varchar,
  timereplycreatedat varchar,
  PRIMARY KEY (userid, timesongcreatedat)
) WITH CLUSTERING ORDER BY (timesongcreatedat DESC);

CREATE TABLE users (
  userid int,
  username varchar,
  useravatar varchar,
  songid int,
  songname varchar,
  playlistid int,
  playlistname varchar,
  location varchar,
  followers int,
  following int,
  personallink varchar,
  PRIMARY KEY (location)
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
  replyid int,
  reply varchar,
  PRIMARY KEY (songid, timecommentcreatedat)
) WITH CLUSTERING ORDER BY (timecommentcreatedat DESC);

CREATE TABLE tags (
  tag varchar,
  songid int,
  songname varchar,
  playlistid int,
  playlistname varchar,
  PRIMARY KEY (playlistid)
);

COPY tags (tag, songid, songname, playlistid, playlistname) FROM '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/cassandra/data/tagstable.csv';

COPY songs (songid,songname,userid,username,useravatar,playlistid,playlistname,length,timesongcreatedat,tag,songcover,soundwaveimage,songfile,commentid,comment,timeonsong,timecommentcreatedat,replyid,reply,timereplycreatedat) FROM '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/cassandra/data/songstable.csv';

COPY users (userId,userName,userAvatar,songId,songName,playListId,playListName,location,followers,following,personalLink) FROM '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/cassandra/data/userstable.csv';

COPY comments (commentId,comment,userId,userName,userAvatar,songId,songName,timeOnSong,timeCommentCreatedAt,replyId,reply) FROM '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/cassandra/data/commentstable.csv';