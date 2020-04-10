const { Pool } = require('pg');

const pool = new Pool({
  database: 'topplayerservice'
});

const postgresqlDb = {};

postgresqlDb.getDataForOneSong = (request, cb) => {
  request = Math.ceil(Math.random() * 10000) + 1;
  // request = 5699;
  let songData;
  const songQuery = 'SELECT u.username AS username, s.songtitle AS songTitle, s.mediafile AS mediaFile, s.postdate AS postDate, s.tag, s.albumCover AS albumCover FROM songs s, users u WHERE s.songid = $1 AND u.userid = s.userid';
  const songQueryParam = [request];

  let commentsData;
  const commentsQuery = 'SELECT c.comment, c.timeonsong, u.username, u.avatar AS avatar FROM comments c, users u WHERE c.songid = $1 AND u.userid = c.userid';
  const commentsQueryParam = [request];

  pool.query(songQuery, songQueryParam, (errorFromSongQuery, resultFromSongQuery) => {
    if (errorFromSongQuery) {
      pool.end();
      console.log('there has been an error querying for song:', errorFromSongQuery);
      cb(errorFromSongQuery, null);
    } else {
      songData = JSON.parse(JSON.stringify(resultFromSongQuery.rows));
      console.log('song query is succesful, result is:', songData);

      pool.query(commentsQuery, commentsQueryParam, (errorFromCommentsQuery, resultFromCommentsQuery) => {
        if (errorFromCommentsQuery) {
          pool.end();
          console.log('there has been an error querying for comments:', errorFromCommentsQuery);
          cb(errorFromCommentsQuery, null);
        } else {
          // pool.end();
          commentsData = JSON.parse(JSON.stringify(resultFromCommentsQuery.rows));
          console.log('comments query is succesful, result is:', commentsData);
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

postgresqlDb.insertComment = (request, cb) => {
  // request = {
  //   comment: 'hello',
  //   userId: 10000,
  //   songId: Math.ceil(Math.random() * 10000000) + 1,
  //   timeOnSong: 200,
  // }

  const commentId = Math.ceil(Math.random() * 100000000) + 100000000;
  const timeCommentCreatedAt = new Date();

  const commentsQuery = `insert into comments (commentid, comment, userid, songid, timeonsong, timecommentcreatedat) values ($1, $2, $3, $4, $5, $6)`;
  const commentsQueryParam = [commentId, request.comment, request.userId, request.songId, request.timeOnSong, timeCommentCreatedAt];

  pool.query(commentsQuery, commentsQueryParam, (errorFromCommentsQuery, resultFromCommentsQuery) => {
    if (errorFromCommentsQuery) {
      pool.end();
      console.log('there has been an error with insert query:', errorFromCommentsQuery);
      // cb(errorFromCommentsQuery, null);
    } else {
      commentsData = JSON.parse(JSON.stringify(resultFromCommentsQuery.rows));
      console.log('insert query is succesful, result is:', commentsData);
      // cb(null, commentsData);
    }
  });
};

module.exports.postgresqlDb = postgresqlDb;
