
exports.up = function(knex) {
    return knex.schema.createTable('produtos_do_pedido' , (table) =>{
        // CHAVE COMPOSTA
        table.primary(['id_pedido' , 'id_produto']);
        // CHAVES ESTRAGEIRAS
        table.integer('id_pedido').notNullable();
        table.integer('id_produto').notNullable();
        // CAMPOS
        table.decimal('valor_unitario').notNullable();
        table.integer('quantidade').notNullable();
        // REFERENCIAS
        table.foreign('id_pedido').references('id').inTable('pedidos');
        table.foreign('id_produto').references('id').inTable('produtos');


    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('produtos_do_pedido');
};


// PAREI AQUI DIA 20-06-2020 --> CRIAR TABELA DE PRODUTOS DO PEDIDO
// LINK - https://www.youtube.com/watch?v=hMdolmqkFNM&list=PLwFf8gSUEopzz98mQQEU8G27p05tBD5Qs&index=14