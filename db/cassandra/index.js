var cassandra = require('cassandra-driver')
var client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1'
})
client.connect()
client.execute('select key from system.local', function (err, result) {
  if (err) throw err
  console.log(result.rows[0])
})