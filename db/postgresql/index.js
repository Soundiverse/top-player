const { Pool, Client } = require('pg')
const pool = new Pool({
  // user: 'me',
  // host: 'database.server.com',
  // database: 'test',
  // password: 'password',
  // port: 5432,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, JSON.parse(JSON.stringify(res)))
  pool.end()
})
const client = new Client({
  // user: 'me',
  // host: 'database.server.com',
  // database: 'phuctran',
  // password: 'password',
  // port: 5432,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})