const { Pool, Client } = require('pg');

const pool = new Pool({
  database: 'topplayerservice'
});
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('there has been an error:', err);
  } else {
    console.log('success result:', JSON.parse(JSON.stringify(res.rows)));
  }
  pool.end();
});

const client = new Client({
  database: 'topplayerservice'
});
client.connect();

client.query('SELECT * FROM tags', (err, res) => {
  if (err) {
    console.log('there has been an error:', err);
  } else {
    console.log('success result:', JSON.parse(JSON.stringify(res.rows)));
  }
  client.end();
});
