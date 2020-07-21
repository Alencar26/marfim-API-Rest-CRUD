/*

                DOCUMENTAÇÃO/ INFORMAÇÃO IMPORTANTES


==> KNEX <==
    
* GERAR ARQUIVO knexfile.js
      
    -> terminal => npx knex init
      
*CONFIGURANDO ARQUIVO knexfile.js

    -> informe o caminho da conexão com o db
    -> adicione o caminho das migrations
        {
            migrations: {
                directory: 'diretorio',
            },
        }
    -> no caso do sqlite adicione: ( useNullAsDefault: true )

*CRIANDO AS MIGRATIONS

    --> terminal => npx knex migrate:make nome_da_migration

    -> as migrations funcionam como se fossem models no projeto.
    -> método 'up' CRIA a tabela e o 'down' DELETA a tabela
    -> após criar os schemas da tabela, colunas etc. EXECUTE O COMANDO ABAIXO:

    --> terminal => npx knex migrate:latest


*/

//=== === === === === === === === === === === === === === === === === === ===

/*

==> CRYPTO <==

utilizar crypto para gerar hash para senha e uma sequencia aleatória para geração de ID.


* Crypto já vem por padrão no NODE.

*/