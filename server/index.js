// server

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const cassandraDb = require('../db/cassandra/index.js').cassandraDb;
// const postgresqlDb = require('../db/postgresql/index.js').postgresqlDb;

const port = 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

cassandra db:
app.get('/getDataForOneSong', (req, res) => {
  const songId = req.body.songId;
  cassandraDb.getDataForOneSong(songId, (err, data) => {
    if (err) {
      res.sendStatus(404);
    }
    res.send(data);
  });
});

// // postgresql db:
// app.get('/getDataForOneSong', (req, res) => {
//   const songId = req.body.songId;
//   postgresqlDb.getDataForOneSong(songId, (err, data) => {
//     if (err) {
//       res.sendStatus(404);
//     }
//     res.send(data);
//   });
// });
