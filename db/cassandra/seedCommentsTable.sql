USE topplayerservice;

COPY comments (commentid,comment,userid,username,avatar,songid,songtitle,timeonsong,timecommentcreatedat) FROM '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/cassandra/data/commentstable.csv';