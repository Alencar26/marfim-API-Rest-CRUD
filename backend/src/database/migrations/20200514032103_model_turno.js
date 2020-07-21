// CRIANDO TABELA NO BANCO DE DADOS
exports.up = function(knex) {
    return knex.schema.createTable('turnos', (table) =>{
         
        // CHAVE PRIMARIA
        table.increments('id');
        // CAMPOS DA TABELA
        table.string('nome_turno').notNullable();

    });
};
// DELETANDO TABELA NO BANCO DE DADOS
exports.down = function(knex) {
    return knex.schema.dropTable('turnos');
};
