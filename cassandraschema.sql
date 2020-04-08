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
  commentid int,
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

COPY songs (songid,songtitle,userid,username,avatar,postdate,tag,albumcover,mediafile) FROM '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/cassandra/data/songstable.csv';

COPY users (userid,username,avatar,location,followers,following,personallink) FROM '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/cassandra/data/userstable.csv';

COPY comments (commentid,comment,userid,username,avatar,songid,songtitle,timeonsong,timecommentcreatedat) FROM '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/cassandra/data/commentstable.csv';