const cassandra = require('cassandra-driver');
const faker = require('faker');

const client = new cassandra.Client({
  contactPoints: [process.env.DATABASE_URL],
  localDataCenter: process.env.LOCAL_DATA_CENTER,
  keyspace: 'topplayerservice'
});

client.connect((error) => {
  if (error) {
    console.log(error);
  }
});

const cassandraDb = {};
cassandraDb.getDataForOneSong = (songId, cb) => {
  songId = Math.ceil(Math.random() * 1000000);
  if (songId === 0) {
    songId += 1;
  }
  const songQuery = 'select * from songs where songid = ?;';
  const queryParam = [songId];
  const commentsQuery = 'select * from comments where songid = ?;';
  let result;

  client.execute(songQuery, queryParam, { prepare: true }, (songQueryError, songQueryResult) => {
    if (songQueryError) {
      console.log('There has been an error querying song:', songQueryError);
      cb(songQueryError, null);
    } else {
      const songData = JSON.parse(JSON.stringify(songQueryResult.rows));
      // console.log('success!! Result for song query is:', songData);

      client.execute(commentsQuery, queryParam, { prepare: true }, (commentsQueryError, commentsQueryResult) => {
        if (commentsQueryError) {
          console.log('There has been an error querying comments:', commentsQueryError);
          cb(commentsQueryError, null);
        } else {
          const commentsData = JSON.parse(JSON.stringify(commentsQueryResult.rows));
          console.log('success!! Result for comments query is:', commentsData);
          if (songData.length !== 0) {
            result = {
              songId: songData[0].songid,
              songTitle: songData[0].songtitle,
              artistName: songData[0].username,
              postDate: songData[0].postdate,
              tag: songData[0].tag,
              albumCover: songData[0].albumcover,
              mediaFile: songData[0].mediafile,
              comments: commentsData
            }
          } else {
            result = null;
          }
        };
        cb(null, result);
      });
    }
  });
};


cassandraDb.insertComment = (request, cb) => {
  request = {
    comment: faker.random.word('string'),
    userId: 10000,
    userName: faker.random.word('string'),
    avatar: faker.random.word('string'),
    songId: Math.ceil(Math.random() * 1000000) + 10000000,
    songTitle: faker.random.word('string'),
    timeOnSong: 200,
  };
  const commentId = faker.random.uuid();
  const timeCommentCreatedAt = `${new Date()}`;

  const queryParam = [commentId, request.comment, request.userId, request.userName, request.avatar, request.songId, request.songTitle, request.timeOnSong, timeCommentCreatedAt];

  const query = `insert into comments (commentid, comment, userid, username, avatar, songid, songtitle, timeonsong, timecommentcreatedat) values (?, ?, ? ,?, ?, ?, ? ,?, ?)`;
  client.execute(query, queryParam, { prepare: true }, (err, result) => {
    if (err) {
      console.log('There\'s an error inserting new comment:', err);
      cb(err, null);
    } else {
      // console.log('success!! Result from inserting a new comment is:', result);
      cb(null, result);
    }
  });
};

module.exports = { cassandraDb };
