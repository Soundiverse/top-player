/* eslint-disable comma-dangle */
const faker = require('faker');
const fs = require('fs');

const songUrl = 'https://soundiverse.s3-us-west-1.amazonaws.com/';
const imageUrl = 'https://soundiverse.s3-us-west-1.amazonaws.com/';

const songsTableDataWriteStream = fs.createWriteStream('songstable.csv');

const numberOfPrimaryRecords = 1000000;
const maxNumberOfSecondaryRecords = 100;

console.log(`Creating ${numberOfPrimaryRecords} records of songs`);

function writeAlot(writer, encoding, callback) {
  let i = numberOfPrimaryRecords;
  let j = 0;
  let userId = faker.random.number(numberOfPrimaryRecords) + 1;
  function write() {
    let ok = true;
    do {
      if (i % (numberOfPrimaryRecords / 10) === 0) {
        console.log('currently at:', i);
      }
      i -= 1;
      j += 1;
      const songId = j;
      const songName = faker.random.word('string').replace(',', '');
      if (Math.ceil(Math.random() * faker.random.number(maxNumberOfSecondaryRecords)) === 1) {
        userId = faker.random.number(numberOfPrimaryRecords) + 1;
      }
      const timeSongCreatedAt = faker.date.past(20);
      const songCover = `${imageUrl}${faker.random.number(9)}.jpeg`;
      const soundwaveImage = faker.random.word('string').replace(',', '');
      const songFile = `${songUrl}${faker.random.number(6)}.mp3`;
      const playlist = faker.random.word('string').replace(',', '');
      const tag = faker.random.word('string').replace(',', '');
      const data = `${songId},${songName},${userId},${timeSongCreatedAt},${songCover},${soundwaveImage},${songFile},${playlist},${tag}\n`;
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
