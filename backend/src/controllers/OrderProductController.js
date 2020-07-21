const connection = require('../database/connection');

module.exports = {

    async create( request , response ) {


        const { id_pedido , id_produto , valor_produto , quantidade } = request.body;

            try {
                await connection('produtos_do_pedido')
                .insert({ 

                    id_pedido: id_pedido,
                    id_produto: id_produto,
                    valor_unitario: valor_produto,
                    quantidade: quantidade

                 });

                 return response.json({ message: 'Pedido realizado com sucesso.'});

            } catch (error) {
                return response.json({ message: 'Produto já foi adicionado ao pedido atual.'})
            }

    },

    async list( request, response) {

        const { id } = request.params;

        const orderProduct = await connection('produtos_do_pedido')
            .join('produtos' , 'produtos.id' , '=' , 'produtos_do_pedido.id_produto')
            .where('id_pedido' , id)
            .select([

                'produtos_do_pedido.id_pedido',
                'produtos.nome',
                'produtos_do_pedido.valor_unitario',
                'produtos_do_pedido.quantidade'

            ])

        return response.json(orderProduct);

    },

    async edit( request , response) {

        const { orderId , productId } = request.params;

        const { id_produto , valor_produto , quantidade } = request.body;

        try{
            const orderProduct = await connection('produtos_do_pedido')
            .where({id_pedido: orderId , id_produto: productId})
            .select('*')
            .first();

            if(orderProduct) {

                await connection('produtos_do_pedido')
                .where({id_pedido: orderId , id_produto: productId})
                .update({

                    id_produto: id_produto,
                    valor_unitario: valor_produto,
                    quantidade: quantidade

                });

                return response.json( { menssagem: 'Alterado com sucesso.' } )

            }

            else if(!orderProduct) {

                return response.status(400).json( { error:  'Produto não existe no pedido atual.'} )

            }
        }catch(error){
            return response.json( { message: error.message})
        }
        

    },

    async delete(request , response) {

        const { orderId , productId } = request.params;

        const product = await connection('produtos_do_pedido')
                .where({id_pedido: orderId , id_produto: productId})
                .select()
                .first();

        try {
            
            if(product) {

                await connection('produtos_do_pedido')
                    .where({id_pedido: orderId , id_produto: productId})
                    .delete();

                    return response.status(204).send();

            }
            
            else if(!product){

                return response.json({ message: 'Produto não existe nesse pedido.' })

            }

            

        } catch (error) {
            
            return response.json({ message: error.message })

        }

    }

}