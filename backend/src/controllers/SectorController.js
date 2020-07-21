const connection = require('../database/connection');

module.exports = {

    //CADASTRO DE SETORES
    async create( request , response ) {

        const { nome_setor } = request.body;

        const [id] = await connection('setores').insert({
            nome_setor
        });

        return response.json( { menssagem: 'Cadastro realizado com sucesso.' } )
    },

    //LISTAR TODOS OS SETORES
    async list( request , response ) {
        
        const occupations = await connection('setores').select('*');

        return response.json(occupations);

    },


    //EDITAR SETOR
    async edit( request , response ) {

        const { id } = request.params;
        const { nome_setor } = request.body;

        const occupation = await connection('setores')
            .where('id' , id)
            .select('nome_setor')
            .first();

            if (occupation) {
                await connection('setores').where('id' , id).update('nome_setor' , nome_setor)
                return response.json( { menssagem: 'Alterado com sucesso.' } )
            }

            else if(!occupation) {
                return response.status(400).json( { error:  'Setor não existe.'} )
            }
    },

    //DELETAR UM SETOR
    async delete( request , response ) {

        const { id } = request.params;
            
            //COMANDO PARA DELETAR O SETOR INFORMADO
            await connection('setores').where('id' , id).delete();

            return response.status(204).send();

    }

}