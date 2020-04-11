USE topplayerservice;

COPY users (userid,username,avatar,location,followers,following,personallink) FROM '/Users/phuctran/Documents/bootcamp/Soundiverse/top-player-service/db/cassandra/data/userstable.csv';