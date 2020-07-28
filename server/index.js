// require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const cassandraDb = require('../db/cassandra/index.js').cassandraDb;

const port = process.env.USER === 'phuctran' ? 3000 : process.env.PORT || '0.0.0.0';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get('/getDataForOneSong', (req, res) => {
  const songId = req.body.songId;
  cassandraDb.getDataForOneSong(songId, (err, data) => {
    if (err) {
      res.sendStatus(404);
    }
    res.send(data);
  });
});

app.post('/postComment', (req, res) => {
  cassandraDb.insertComment(req, (err, data) => {
    if (err) {
      res.sendStatus(404);
    }
    res.send(data);
  });
});
