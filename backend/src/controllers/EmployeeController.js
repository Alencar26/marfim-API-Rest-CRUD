const connection = require('../database/connection');

module.exports = {

    //LISTANDO OS FUNCIONÁRIOS CADASTRADOS (INFORMANDO CARGO, SETOR E TURNO)
    async list( request , response ) {

        const employee = await connection('funcionarios')
            .join('cargos' , 'cargos.id' , '=' , 'funcionarios.cargo_id')
            .join('turnos' , 'turnos.id' , '=' , 'funcionarios.turno_id')
            .join('setores' , 'setores.id' , '=' , 'funcionarios.setor_id')
            .select([ 
                'funcionarios.id' ,
                'funcionarios.nome_funcionario' ,
                'funcionarios.PIS_funcionario' ,
                'funcionarios.telefone_funcionario' ,
                'funcionarios.salario_funcionario' ,
                'cargos.nome_cargo' ,
                'turnos.nome_turno' ,
                'setores.nome_setor'
              ]);

        return response.json(employee);
    },

    //CADASTRANDO FUNCIONÁRIO
    async create( request , response ) {

        const { nome_funcionario , PIS_funcionario , telefone_funcionario , salario_funcionario , cargo_id , turno_id , setor_id} = request.body

        const [id] = await connection('funcionarios').insert({
            nome_funcionario,
            PIS_funcionario,
            telefone_funcionario,
            salario_funcionario,
            cargo_id,
            turno_id,
            setor_id
        });

        return response.json( { menssagem: 'Cadastro realizado com sucesso.' } )
    },

    async edit( request , response ) {

        const { id } = request.params;
        const { nome_funcionario , PIS_funcionario , telefone_funcionario , salario_funcionario , cargo_id , turno_id , setor_id} = request.body

        const employee = await connection('funcionarios')
            .where('id' , id)
            .select('*')
            .first();

        if (employee) {
            await connection('funcionarios').where('id' , id)
                .update({
                    nome_funcionario:  nome_funcionario ,
                    PIS_funcionario: PIS_funcionario ,
                    telefone_funcionario: telefone_funcionario ,
                    salario_funcionario: salario_funcionario ,
                    cargo_id: cargo_id ,
                    turno_id: turno_id ,
                    setor_id: setor_id
                });

            return response.json( { menssagem: 'Alterado com sucesso.' } )
        
        }

        else if(!employee) {
            return response.status(400).json( { error:  'Funcionário não existe.'} )
        }

    },

    async delete( request , response ) {

        const { id } = request.params;

        //COMANDO PARA DELETAR FUNCIONÁRIO INFORMADO
        await connection('funcionarios').where('id' , id).delete();

        return response.status(204).send();

    }
}