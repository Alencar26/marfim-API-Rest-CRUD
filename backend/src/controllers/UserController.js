const connection = require('../database/connection');
const crypto = require('crypto');


module.exports = {

    //NOVO USUÁRIO
    async create( request , response) {
        //pegando informações do corpo da página
        const  { email , senha } = request.body;

        //GERANDO HASH DA SENHA INFORMADA
         const password = crypto.createHash('md5')
                        .update(senha)
                        .digest('hex');
         
        //GERANDO ID ALEATÓRIO
        const id = crypto.randomBytes(4).toString('HEX');

        
        //INSERE OS DADOS NO BANCO DE DADOS
        await connection('users').insert({
            id,
            email,
            password,
        })
        //RETORNO O ID DO USER PARA O BODY(PARA A INTERFACE)
        return response.json({ id });
    },

    //LISTANDO USUÁRIO
    async list( request , response ) {
        const users = await connection('users').select('*');

        return response.json(users);
    }

}