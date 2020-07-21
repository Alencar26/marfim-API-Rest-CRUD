const connection = require('../database/connection');

module.exports = {

    async create( request , response ) {

        const { nome , valor_unitario , quantidade , descricao } = request.body;

        const[id] = await connection('produtos').insert({

            nome,
            valor_unitario,
            quantidade,
            descricao

        });

        return response.json( { message: 'Cadastro realizado com sucesso.'} )

    },

    async list( request, response) {

        const product = await connection('produtos').select('*');

        return response.json(product);

    },

    async edit( request, response) {

        const { id } = request.params;
        const { nome , valor_unitario , quantidade , descricao } = request.body;

        const product = await connection('produtos')
            .where('id', id)
            .select('*')
            .first();

        if (product) {
            await connection('produtos').where('id', id)
                .update({ 

                    nome: nome,
                    valor_unitario: valor_unitario,
                    quantidade: quantidade,
                    descricao: descricao

                 });
            
            return response.json( { message: 'Alterado com sucesso.' } )
        }

        else if(!product) {
            return response.json( { message: 'Produto não existe.'})
        }

    },

    async delete( request , response ) {

        const { id } = request.params;

        await connection('produtos').where('id', id).delete();

        return response.status(204).send();

    }

}