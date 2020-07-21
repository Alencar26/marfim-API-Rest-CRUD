const connection = require('../database/connection');

module.exports = {

    async create( request , response ) {

        const { data_pedido , cliente_cpf , funcionario_id } = request.body;

        const [id] = await connection('pedidos').insert({

            data_pedido: data_pedido,
            cliente_cpf: cliente_cpf,
            funcionario_id: funcionario_id

        });

        return response.json( { menssagem: `id do pedido: ${ id }` } )

    },

    async edit( request , response ) {

        const { data_pedido , cliente_cpf , funcionario_id } = request.body;
        const { id } = request.params;

        const order = await connection('pedidos')
            .where('id' , id)
            .select('*')
            .first();

        if(order) {

            await connection('pedidos')
            .where('id' , id)
            .update({

                data_pedido: data_pedido,
                cliente_cpf: cliente_cpf,
                funcionario_id: funcionario_id

            });

            return response.json( { menssagem: 'Alterado com sucesso.' } )

        }

        else if(!order) {

            return response.status(400).json( { error:  'Pedido não existe.'} )

        }
    },

    async list( request, response) {

        const order = await connection('pedidos')
            .join('clientes' , 'clientes.CPF' , '=' , 'pedidos.cliente_cpf')
            .join('funcionarios' , 'funcionarios.id' , '=' , 'pedidos.funcionario_id')
            .select([

                'pedidos.id',
                'pedidos.data_pedido',
                'clientes.nome',
                'clientes.CPF',
                'funcionarios.nome_funcionario'

            ]);

        return response.json(order);

    },

    async delete(request , response) {

        const { id } = request.params;

        await connection('pedidos').where('id' , id).delete();
        //APAGA OS PRODUTOS DESSE PEDIDO TAMBÉM
        await connection('produtos_do_pedido').where('id_pedido' , id).delete();

        return response.status(204).send();

    },

    

}