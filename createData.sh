node --max-old-space-size=8192 db/postgresql/seedingScript/playlistsdatageneration.js
node --max-old-space-size=8192 db/postgresql/seedingScript/tagsdatageneration.js
node --max-old-space-size=8192 db/postgresql/seedingScript/songsdatageneration.js

mv playliststable.csv ./db/postgresql/data/
mv songstable.csv ./db/postgresql/data/
mv tagstable.csv ./db/postgresql/data/

psql < schema.down.sql
psql -d topplayerservice < schema.up.sql

node --max-old-space-size=8192 db/cassandra/seedingScript/tagsdatageneration.js
node --max-old-space-size=8192 db/cassandra/seedingScript/songsdatageneration.js

mv songstable.csv ./db/cassandra/data/
mv tagstable.csv ./db/cassandra/data/

cqlsh < cassandraschema.sql