const faker = require('faker');
const fs = require('fs');

const numberOfPrimaryRecords = 100000;

const playListsTableDataWriteStream = fs.createWriteStream('playliststable.csv');

function writeAlot(writer, encoding, callback) {
  let i = numberOfPrimaryRecords;
  function write() {
    let ok = true;
    do {
      if (i % (numberOfPrimaryRecords / 10) === 0) {
        console.log('currently at:', i);
      }
      i -= 1;
      const playListId = i;
      const playListName = (faker.random.words(2)).replace(',', ' ');

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
