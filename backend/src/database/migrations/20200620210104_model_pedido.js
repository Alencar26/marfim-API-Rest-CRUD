
exports.up = function(knex) {
    return knex.schema.createTable('pedidos' , (table) =>{

        // CHAVE PRIMARIA
        table.increments('id');
        // CAMPOS DA TABELA
        table.datetime('data_pedido').notNullable();
        // CHAVES ESTRANGEIRAS
        table.string('cliente_cpf').notNullable();
        table.integer('funcionario_id').notNullable();
        // REFERENCIANDO AS FOREIGN KEY
        table.foreign('cliente_cpf').references('CPF').inTable('clientes');
        table.foreign('funcionario_id').references('id').inTable('funcionarios');
        

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('pedidos');
};
