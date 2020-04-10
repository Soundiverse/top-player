/* eslint-disable comma-dangle */
const faker = require('faker');
const fs = require('fs');


const usersTableDataWriteStream = fs.createWriteStream('userstable.csv');

const numberOfPrimaryRecords = 10000000;

console.log(`Creating ${numberOfPrimaryRecords} records of users`);

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
      const userId = j;
      const userName = faker.random.word('string').replace(',', '');
      const avatar = faker.image.avatar();
      const location = faker.random.word('string').replace(',', '');
      const followers = faker.random.number(numberOfPrimaryRecords);
      const following = faker.random.number(numberOfPrimaryRecords);
      const personalLink = faker.internet.url();
      const data = `${userId},${userName},${avatar},${location},${followers},${following},${personalLink}\n`;
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

writeAlot(usersTableDataWriteStream, 'utf8', () => { usersTableDataWriteStream.end(); });
