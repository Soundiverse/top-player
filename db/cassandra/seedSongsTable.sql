USE topplayerservice;

COPY songs (songid,songtitle,userid,username,avatar,postdate,tag,albumcover,mediafile) FROM '/db/cassandra/data/songstable.csv';