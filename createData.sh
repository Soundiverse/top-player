# echo "Creating csv files for postgresql database"
# node --max-old-space-size=8192 db/postgresql/seedingScript/songsdatageneration.js
# node --max-old-space-size=8192 db/postgresql/seedingScript/usersdatageneration.js
# node --max-old-space-size=8192 db/postgresql/seedingScript/commentsdatageneration.js

# echo "Moving csv files to data folder"
# mv songstable.csv ./db/postgresql/data/
# mv userstable.csv ./db/postgresql/data/
# mv commentstable.csv ./db/postgresql/data/

# echo "Seeding csv files to postgresql database"
# psql < ./db/postgresql/schema.down.sql
# psql -d topplayerservice < ./db/postgresql/schema.up.sql

echo "Setting up cassandra schema"
cqlsh < ./db/cassandra/cassandraschema.sql

echo "Creating csv file for songs table"
node --max-old-space-size=8192 db/cassandra/seedingScript/songsdatageneration.js

echo "Moving songs csv file to data folder"
mv songstable.csv ./db/cassandra/data/

echo "Seeding songs table"
cqlsh < ./db/cassandra/seedSongsTable.sql

echo "Removing songs csv file"
rm -rf ./db/cassandra/data/songstable.csv

echo "Creating csv file for users table"
node --max-old-space-size=8192 db/cassandra/seedingScript/usersdatageneration.js

echo "Moving users csv file to data folder"
mv userstable.csv ./db/cassandra/data/

echo "Seeding users table"
cqlsh < ./db/cassandra/seedUsersTable.sql

echo "Removing users csv file"
rm -rf ./db/cassandra/data/userstable.csv

echo "Creating csv file for comments table"
node --max-old-space-size=8192 db/cassandra/seedingScript/commentsdatageneration.js

echo "Moving comments csv file to data folder"
mv commentstable.csv ./db/cassandra/data/

echo "Seeding comments table"
cqlsh < ./db/cassandra/seedCommentsTable.sql

echo "Removing comments csv file"
rm -rf ./db/cassandra/data/commentstable.csv