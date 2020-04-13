USE topplayerservice;

COPY comments (commentid,comment,userid,username,avatar,songid,songtitle,timeonsong,timecommentcreatedat) FROM '/db/cassandra/data/commentstable.csv';