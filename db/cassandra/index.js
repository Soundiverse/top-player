const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'topplayerservice'
});

client.connect();

const cassandraDb = {};
cassandraDb.getDataForOneSong = (songId, cb) => {
  // const songId = Math.ceil(Math.random() * 10000) + 1;
  const songQuery = 'select * from songs where songid = ?;';
  const queryParam = [songId];
  const commentsQuery = 'select * from comments where songid = ?;';
  
  client.execute(songQuery, queryParam, { prepare: true }, (songQueryError, songQueryResult) => {
    if (songQueryError) {
      console.log('There has been an error querying song:', songQueryError);
      cb(songQueryError, null);
    } else {
      const songData = JSON.parse(JSON.stringify(songQueryResult.rows));
      console.log('success!! Result for song query is:', songData);
      
      client.execute(commentsQuery, queryParam, { prepare: true }, (commentsQueryError, commentsQueryResult) => {
        if (commentsQueryError) {
          console.log('There has been an error querying comments:', commentsQueryError);
          cb(commentsQueryError, null);
        } else {
          const commentsData = JSON.parse(JSON.stringify(commentsQueryResult.rows));
          console.log('success!! Result for comments query is:', commentsData);
          const result = {
            songId: songData[0].songid,
            songTitle: songData[0].songtitle,
            artistName: songData[0].username,
            postDate: songData[0].postdate,
            tag: songData[0].tag,
            albumCover: songData[0].albumcover,
            mediaFile: songData[0].mediafile,
            comments: commentsData
          };
          cb(null, result);
        }
      });
    }
  });
};


cassandraDb.insertComment = (request, cb) => {
  // const request = {
  //   comment: 'hello',
  //   userId: 10000,
  //   userName: 'world',
  //   avatar: 'helloworld',
  //   songId: Math.ceil(Math.random() * 10000000) + 100000000,
  //   songTitle: 'hello',
  //   timeOnSong: 200,
  //   timeCommentCreatedAt: new Date()
  // }
  const commentId = Math.ceil(Math.random() * 100000000) + 100000000; // should change commentId (and other ids in other tables) to uuid
  const timeCommentCreatedAt = `${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate()}`;
  
  const queryParam = [commentId, request.comment, request.userId, request.userName, request.avatar, request.songId, request.songTitle, request.timeOnSong, timeCommentCreatedAt];
  
  const query = `insert into comments (commentid, comment, userid, username, avatar, songid, songtitle, timeonsong, timecommentcreatedat) values (?, ?, ? ,?, ?, ?, ? ,?, ?)`;
  client.execute(query, queryParam, { prepare: true }, (err, result) => {
    if (err) {
      console.log('There\'s an error inserting new comment:', err);
      cb(err, null);
    } else {
      console.log('success!! Result from inserting a new comment is:', result);
      cb(null, result);
    }
  });
};

module.exports = { cassandraDb };
