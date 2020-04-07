const faker = require('faker');
const fs = require('fs');

const numberOfPrimaryRecords = 100000;

const playListsTableDataWriteStream = fs.createWriteStream('playliststable.csv');

console.log(`Creating ${numberOfPrimaryRecords} records of playlists`);

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
      const playListId = j;
      const playListName = ((faker.random.word('string').replace(',', ' '))).replace(',', '');

      const data = `${playListId},${playListName}\n`;
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

writeAlot(playListsTableDataWriteStream, 'utf8', () => { playListsTableDataWriteStream.end(); });