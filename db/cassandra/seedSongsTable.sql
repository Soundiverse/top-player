USE topplayerservice;

COPY songs (songid,songtitle,userid,username,avatar,postdate,tag,albumcover,mediafile) FROM '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/cassandra/data/songstable.csv';