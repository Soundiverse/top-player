const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'topplayerservice'
});
client.connect();

client.execute(`insert into tags (tag, songid, songname, playlistid, playlistname) values ('hello', 1, 'world', 2, 'goodbye')`, (err, result) => {
  if (err) {
    throw err;
  } else {
    console.log('success!! Result is:', result);
  }
});

client.execute('select * from tags', (err, result) => {
  if (err) {
    throw err;
  } else {
    console.log('success!! Result is:', result.rows);
  }
});
