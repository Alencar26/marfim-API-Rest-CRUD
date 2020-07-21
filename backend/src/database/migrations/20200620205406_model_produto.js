
exports.up = function(knex) {
    return knex.schema.createTable('produtos' , (table) =>{

        table.increments('id');
        table.string('nome').notNullable();
        table.string('descricao').notNullable();
        table.integer('quantidade').notNullable();
        table.decimal('valor_unitario').notNullable();

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('produtos');
};
