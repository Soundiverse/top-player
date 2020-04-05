echo "Creating csv files for postgresql database"
node --max-old-space-size=8192 db/postgresql/seedingScript/playlistsdatageneration.js
node --max-old-space-size=8192 db/postgresql/seedingScript/tagsdatageneration.js
node --max-old-space-size=8192 db/postgresql/seedingScript/songsdatageneration.js
node --max-old-space-size=8192 db/postgresql/seedingScript/usersdatageneration.js
node --max-old-space-size=8192 db/postgresql/seedingScript/commentsdatageneration.js
node --max-old-space-size=8192 db/postgresql/seedingScript/repliesdatageneration.js

echo "Moving csv files to data folder"
mv playliststable.csv ./db/postgresql/data/
mv songstable.csv ./db/postgresql/data/
mv tagstable.csv ./db/postgresql/data/
mv userstable.csv ./db/postgresql/data/
mv commentstable.csv ./db/postgresql/data/
mv repliestable.csv ./db/postgresql/data/

echo "Seeding csv files to postgresql database"
psql < schema.down.sql
psql -d topplayerservice < schema.up.sql

echo "Creating csv files for cassandra database"
node --max-old-space-size=8192 db/cassandra/seedingScript/tagsdatageneration.js
node --max-old-space-size=8192 db/cassandra/seedingScript/songsdatageneration.js
node --max-old-space-size=8192 db/cassandra/seedingScript/usersdatageneration.js
node --max-old-space-size=8192 db/cassandra/seedingScript/commentsdatageneration.js

echo "Moving csv files to data folder"
mv songstable.csv ./db/cassandra/data/
mv tagstable.csv ./db/cassandra/data/
mv userstable.csv ./db/cassandra/data/
mv commentstable.csv ./db/cassandra/data/

echo "Seeding csv files to cassandra database"
cqlsh < cassandraschema.sql