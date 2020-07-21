const connection = require('../database/connection');

module.exports = {

    //CADASTRO DE CARGOS
    async create( request , response ) {

        const { nome_cargo } = request.body;

        const [id] = await connection('cargos').insert({
            nome_cargo
        });

        return response.json( { menssagem: 'Cadastro realizado com sucesso.' } )
    },

    //LISTAR TODOS OS CARGOS
    async list( request , response ) {
        
        const occupations = await connection('cargos').select('*');

        return response.json(occupations);

    },


    //EDITAR CARGO
    async edit( request , response ) {

        const { id } = request.params;
        const { nome_cargo } = request.body;

        const occupation = await connection('cargos')
            .where('id' , id)
            .select('nome_cargo')
            .first();

            if (occupation) {
                await connection('cargos').where('id' , id).update('nome_cargo' , nome_cargo)
                return response.json( { menssagem: 'Alterado com sucesso.' } )
            }

            else if(!occupation) {
                return response.status(400).json( { error:  'Cargo não existe.'} )
            }
    },

    //DELETAR UM CARGO
    async delete( request , response ) {

        const { id } = request.params;

            
            //COMANDO PARA DELETAR CARGO INFORMADO
            await connection('cargos').where('id' , id).delete();

            return response.status(204).send();

    }

}