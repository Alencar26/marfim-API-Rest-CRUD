const connection = require('../database/connection');

module.exports = {

    //CADASTRO DE TURNOS
    async create( request , response ) {

        const { nome_turno } = request.body;

        const [id] = await connection('turnos').insert({
            nome_turno
        });

        return response.json( { menssagem: 'Cadastro realizado com sucesso.' } )
    },

    //LISTAR TODOS OS TURNO
    async list( request , response ) {
        
        const occupations = await connection('turnos').select('*');

        return response.json(occupations);

    },


    //EDITAR TURNO
    async edit( request , response ) {

        const { id } = request.params;
        const { nome_turno } = request.body;

        const occupation = await connection('turnos')
            .where('id' , id)
            .select('nome_turno')
            .first();

            if (occupation) {
                await connection('turnos').where('id' , id).update('nome_turno' , nome_turno)
                return response.json( { menssagem: 'Alterado com sucesso.' } )
            }

            else if(!occupation) {
                return response.status(400).json( { error:  'Turno não existe.'} )
            }
    },

    //DELETAR UM TURNO
    async delete( request , response ) {

        const { id } = request.params;

            
            //COMANDO PARA DELETAR TURNO INFORMADO
            await connection('turnos').where('id' , id).delete();

            return response.status(204).send();

    }

}