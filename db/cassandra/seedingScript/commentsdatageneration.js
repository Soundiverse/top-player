/* eslint-disable comma-dangle */
const faker = require('faker');
const fs = require('fs');


const commentsTableDataWriteStream = fs.createWriteStream('commentstable.csv');

const numberOfPrimaryRecords = 100000;

console.log(`Creating ${numberOfPrimaryRecords} records of comments`);

function writeAlot(writer, encoding, callback) {
  let i = numberOfPrimaryRecords;
  let j = 0;
  function write() {
    let ok = true;
    do {
      if (i % (numberOfPrimaryRecords / 10) === 0) {
        console.log('currently at:', i);
      }
      i -= 1;
      j += 1;
      const commentId = j;
      const comment = ((faker.random.words(3)).replace(',', '')).replace(',', '');
      const userId = faker.random.number(1000000);
      const userName = faker.random.word('string').replace(',', '');
      const userAvatar = faker.image.avatar();
      const songId = faker.random.number(1000000);
      const songName = faker.random.word('string').replace(',', '');
      const timeOnSong = faker.random.number(300);
      const timeCommentCreatedAt = faker.date.past(20);
      const replyId = faker.random.number(1000000);
      const reply = (faker.random.words(3)).replace(',', '').replace(',', '');
      const data = `${commentId},${comment},${userId},${userName},${userAvatar},${songId},${songName},${timeOnSong},${timeCommentCreatedAt},${replyId},${reply}\n`;
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

writeAlot(commentsTableDataWriteStream, 'utf8', () => { commentsTableDataWriteStream.end(); });
