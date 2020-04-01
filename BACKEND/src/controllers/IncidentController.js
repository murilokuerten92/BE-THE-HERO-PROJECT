const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        //se o parametro não existir, ele irá buscar os dados da pagina 1
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();
        //limitara 5 dados por pagina
        //offset pula 5 por pagina
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5).offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        //retorna a quantidade de registrons através do count para como propriedade todos os registros
        response.header("X-Total-Count", count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {

        const { title, description, value } = request.body;

        const ong_id = request.headers.authorization;


        //desustrura o id do resultado que é retornado que é apenas um registro 
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        //retorna o id auto incremental
        return response.json({ id });
    },

    async delete(request, response) {

        const { id } = request.params;

        const ong_id = request.headers.authorization;

        //busca o incident que esta logado
        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        //se o incident for diferente do que esta logado na aplicação não vai ser autorizado o delete
        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'No authorized' });
        }

        await connection('incidents').where('id', id).delete();

        //status 204 é quando retorna com sucesso, mas sem conteúdo pro front, ou seja, apenas delete
        return response.status(204).send();
    }
}