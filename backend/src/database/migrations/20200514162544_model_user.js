
exports.up = function(knex) {
  return knex.schema.createTable('users' , (table) =>{
    
    //PRIMARY KEY
    table.string('id').primary();
    //CAMPOS DA TABELA
    table.string('email').notNullable();
    table.string('password').notNullable();

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
