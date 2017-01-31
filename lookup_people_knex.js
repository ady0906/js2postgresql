
var args = '%' + process.argv.slice(2) + '%';
var name = process.argv.slice(2);

const settings = require("./settings"); // settings.json
const knex = require("knex") ({
  client: 'pg',
    connection: {
      host: settings.hostname,
      user: settings.user,
      password: settings.password,
      database: settings.database,
      ssl: settings.ssl
    }
  });


console.log('Searching ...');

knex.select('*')
  .from('famous_people')
  .where('first_name', 'like', args)
  .orWhere('last_name', 'like', args)
  .then((rows) => {
    console.log(rows[0])
    console.log(`Found 1 person(s) by the name '${name}':
    - ${rows[0].id}: ${rows[0].first_name} ${rows[0].last_name}, ` +
    `born '${(rows[0].birthdate.toString().split("").slice(0,15).join(""))}'`);
  })
  .catch(function(error) {
    console.error(error)
  });
