const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    //EFETUANDO LOGIN
    async create( request , response ) {

        const { email , senha } = request.body;

         //GERANDO HASH DA SENHA INFORMADA
         const password = crypto.createHash('md5')
                        .update(senha)
                        .digest('hex');        

        //INSERE INFORMAÇÕES NO BANCO DE DADOS        
        const user = await connection('users')
            .where( { email: email , password: password } )
            .select('id' , 'email')
            .first();
            //CASO USER NÃO EXISTA OU INFORMAÇÕES ERRADAS
            if(!user) {
                return response.status(400).json( { error:  'Usuário não existe.'} )
            }
            //RETORNA USUÁRIO NA TELA PARA COFIRMAÇÃO
            return response.json(user);
    }

}