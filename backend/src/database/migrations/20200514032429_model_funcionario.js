//CRIANDO TABELA NO BANCO DE DADOS
exports.up = function(knex) {
  return knex.schema.createTable('funcionarios' , (table) => {
    
    // CHAVE PRIMARIA
    table.increments('id');
    // CAMPOS DA TABELA
    table.string('nome_funcionario').notNullable();
    table.string('PIS_funcionario').notNullable();
    table.string('telefone_funcionario').notNullable();
    table.decimal('salario_funcionario').notNullable();
    // CHAVES ESTRANGEIRAS
    table.integer('cargo_id').notNullable();
    table.integer('turno_id').notNullable();
    table.integer('setor_id').notNullable();
    // REFERENCIANDO AS FOREIGN KEY
    table.foreign('cargo_id').references('id').inTable('cargos');
    table.foreign('turno_id').references('id').inTable('turnos');
    table.foreign('setor_id').references('id').inTable('setores');

  });


};
//DELETANDO TABELA NO BANCO DE DADOS
exports.down = function(knex) {
   return knex.schema.dropTable('funcionarios');
};
