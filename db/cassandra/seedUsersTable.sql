USE topplayerservice;

COPY users (userid,username,avatar,location,followers,following,personallink) FROM '/db/cassandra/data/userstable.csv';