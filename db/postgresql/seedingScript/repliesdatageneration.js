/* eslint-disable comma-dangle */
const faker = require('faker');
const fs = require('fs');


const repliesTableDataWriteStream = fs.createWriteStream('repliestable.csv');

const numberOfPrimaryRecords = 100000;

console.log(`Creating ${numberOfPrimaryRecords} records of replies`);

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
      const replyId = j;
      const reply = ((faker.random.words(3)).replace(',', '')).replace(',', '');
      const userId = faker.random.number(1000000);
      const timeCreatedAt = faker.date.past(20);
      const data = `${replyId},${reply},${userId},${timeCreatedAt}\n`;
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

writeAlot(repliesTableDataWriteStream, 'utf8', () => { repliesTableDataWriteStream.end(); });
