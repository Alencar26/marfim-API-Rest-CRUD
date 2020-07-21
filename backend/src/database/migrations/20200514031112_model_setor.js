// CRIANDO TABELA NO BANCO DE DADOS
exports.up = function(knex) {
    return knex.schema.createTable('setores', (table) =>{
        
        // CHAVE PRIMARIA
        table.increments('id'); 
        // CAMPOS DA TABELA
        table.string('nome_setor').notNullable();

    });
};
// DELETANDO TABELA NO BANCO DE DADOS
exports.down = function(knex) {
    return knex.schema.dropTable('setores');
};
