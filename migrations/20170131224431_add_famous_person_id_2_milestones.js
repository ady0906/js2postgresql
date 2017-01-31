
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('new_milestones', function(table){
      table.increments();
      table.string('description');
      table.date('date_achieved');
      table.integer('famous_person_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('new_milestones')
  ])
};
