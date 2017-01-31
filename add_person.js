let newFirst = process.argv[2];
let newLast = process.argv[3];
let newDate = process.argv[4];

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

  console.log(newFirst);
  console.log(newLast);
  console.log(newDate);

// knex('famous_people').insert({last_name: newLast}).returning('*').toString();
// knex('famous_people').insert({first_name: newFirst}).returning('*').toString();
// knex('famous_people').insert({birthdate: newDate}).returning('*').toString();

knex('famous_people')
  .returning(['id','first_name', 'last_name', 'birthdate'])
  .insert([{first_name: newFirst, last_name: newLast, birthdate: newDate}])
  .then(() => {
    knex.select('*')
      .from('famous_people')
      .then ((rows) => {
        console.log(rows)
      });
  });
