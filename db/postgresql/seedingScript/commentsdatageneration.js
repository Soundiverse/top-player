/* eslint-disable comma-dangle */
const faker = require('faker');
const fs = require('fs');


const commentsTableDataWriteStream = fs.createWriteStream('commentstable.csv');

const numberOfPrimaryRecords = 1000000;
const maxNumberOfSecondaryRecords = 100;

console.log(`Creating ${numberOfPrimaryRecords} records of comments`);

function writeAlot(writer, encoding, callback) {
  let i = numberOfPrimaryRecords;
  let j = 0;
  let songId = faker.random.number(numberOfPrimaryRecords) + 1;
  let userId = faker.random.number(numberOfPrimaryRecords) + 1;
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
      if (Math.ceil(Math.random() * faker.random.number(maxNumberOfSecondaryRecords)) === 1) {
        userId = faker.random.number(numberOfPrimaryRecords) + 1;
        songId = faker.random.number(numberOfPrimaryRecords) + 1;
      }
      const timeOnSong = faker.random.number(300);
      const timeCommentCreatedAt = faker.date.past(20);
      const data = `${commentId},${comment},${userId},${songId},${timeOnSong},${timeCommentCreatedAt}\n`;
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
