// const cep = require('cep-promise');

const connection = require('../database/connection');


module.exports = {

    async create( request , response ) {

        const { CPF , nome , telefone , CEP , estado , cidade , bairro , rua , numero_casa } = request.body;
        

            // USANDO CEP-PROMISE
        /*
        const showData = (result) => {
            for(const campo in result) {   
                console.log(result[campo])
            }
            console.log(endereco)
        }

        cep(81570430).then(data => showData(data));
        */
        
        const [id] = await connection('clientes').insert({
            CPF,
            nome,
            telefone,
            CEP,
            estado,
            cidade,
            bairro,
            rua,
            numero_casa
        });

        return response.json( { menssagem: 'Cadastro realizado com sucesso.' } )
        
    },

    async list( request, response) {

        const client = await connection('clientes').select('*');

        return response.json(client);

    },

    async edit( request, response) {

        const { CPF } = request.params;
        const { nome , telefone , CEP , estado , cidade , bairro , rua , numero_casa } = request.body;

        const client = await connection('clientes')
            .where('CPF', CPF)
            .select('*')
            .first();

        if(client) {
            await connection('clientes').where('CPF', CPF)
                .update({

                    nome: nome,
                    telefone: telefone,
                    CEP: CEP,
                    estado: estado,
                    cidade: cidade,
                    bairro: bairro,
                    rua: rua,
                    numero_casa: numero_casa

                });

            return response.json( { menssagem: 'Alterado com sucesso.' } )
        }

        else if(!client) {
            return response.status(400).json( { error:  'Cliente não existe.'} )

        }

    },

    async delete(request, response){

        const { CPF } = request.params;

        await connection('clientes').where('CPF', CPF).delete();

        return response.status(204).send();
    }
}