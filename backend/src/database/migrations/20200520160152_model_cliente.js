
exports.up = function(knex) {
    return knex.schema.createTable('clientes' , (table) =>{

        table.string('CPF').primary();
        table.string('nome').notNullable();
        table.string('telefone').notNullable();
        table.string('CEP').notNullable();
        table.string('estado').notNullable();
        table.string('cidade').notNullable();
        table.string('bairro').notNullable();
        table.string('rua').notNullable();
        table.string('numero_casa').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('clientes');
};
