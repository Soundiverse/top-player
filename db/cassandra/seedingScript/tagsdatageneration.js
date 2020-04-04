const faker = require('faker');
const fs = require('fs');

const numberOfPrimaryRecords = 100000;

const tagsTableDataWriteStream = fs.createWriteStream('tagstable.csv');

function writeAlot(writer, encoding, callback) {
  let i = numberOfPrimaryRecords;
  function write() {
    let ok = true;
    do {
      if (i % (numberOfPrimaryRecords / 10) === 0) {
        console.log('currently at:', i);
      }
      i -= 1;
      const tag = (faker.random.words(3)).replace(',', '') + faker.random.number(1000);
      const songId = faker.random.number(1000000);
      const songName = faker.random.word('string').replace(',', '');
      const playListId = faker.random.number(100000);
      const playListName = faker.random.word('string').replace(',', '');
      const data = `${tag},${songId},${songName},${playListId},${playListName}\n`;
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

writeAlot(tagsTableDataWriteStream, 'utf8', () => { tagsTableDataWriteStream.end(); });
