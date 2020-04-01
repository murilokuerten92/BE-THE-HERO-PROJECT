const connection = require("../database/connection");

module.exports = {

    async create(request, response) {

        const { id } = request.body;

        //depois de buscar o id no body ele faz conexão no banco e busca o id do corpo
        const ong = await connection('ongs').where('id', id).select('name').first();
        // se o id não existir significa que não existe nenhuma ong com esse id
        if (!ong) {
            return response.status(401).json({ error: 'No exist ONG with this ID' })
        }

        return response.json(ong)
    }
}