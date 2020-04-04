/* eslint-disable comma-dangle */
const faker = require('faker');
const fs = require('fs');


const songsTableDataWriteStream = fs.createWriteStream('songstable.csv');

const numberOfPrimaryRecords = 100000;

function writeAlot(writer, encoding, callback) {
  let i = numberOfPrimaryRecords;
  function write() {
    let ok = true;
    do {
      if (i % (numberOfPrimaryRecords / 10) === 0) {
        console.log('currently at:', i);
      }
      i -= 1;
      const songId = i;
      const songName = faker.random.word('string').replace(',', '');
      const userId = faker.random.number(1000);
      const userName = faker.random.word('string').replace(',', '');
      const userAvatar = faker.random.word('string').replace(',', '');
      const playListId = faker.random.number(1000);
      const playListName = faker.random.word('string').replace(',', '');
      const length = faker.random.number(300);
      const timeSongCreatedAt = faker.random.number(10000);
      const tag = faker.random.word('string').replace(',', '');
      const songCover = faker.random.word('string').replace(',', '');
      const soundwaveImage = faker.random.word('string').replace(',', '');
      const songFile = faker.random.word('string').replace(',', '');
      const commentId = faker.random.number(1000);
      const comment = (faker.random.words(3)).replace(',', '').replace(',', '');
      const timeOnSong = faker.random.number(300);
      const timeCommentCreatedAt = faker.random.number(10000);
      const replyId = faker.random.number(1000);
      const reply = (faker.random.words(3)).replace(',', '').replace(',', '');
      const timeReplyCreatedAt = faker.random.number(10000);
      const data = `${songId},${songName},${userId},${userName},${userAvatar},${playListId},${playListName},${length},${timeSongCreatedAt},${tag},${songCover},${soundwaveImage},${songFile},${commentId},${comment},${timeOnSong},${timeCommentCreatedAt},${replyId},${reply},${timeReplyCreatedAt}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

writeAlot(songsTableDataWriteStream, 'utf8', () => { songsTableDataWriteStream.end(); });
