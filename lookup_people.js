
var args = process.argv.slice(2);

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const q = `
  SELECT id, first_name, last_name, birthdate
  FROM famous_people
  WHERE famous_people.first_name LIKE $1
  OR famous_people.last_name LIKE $1
  LIMIT 1;
`;

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(q, args, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching ...');
    console.log(`Found 1 person(s) by the name '${args}':
    - ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born '${(result.rows[0].birthdate.toString().split("").slice(0,15).join(""))}'`);
    client.end();
  });
});
