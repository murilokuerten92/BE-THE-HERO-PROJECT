const Knex = require('Knex');
const configuration = require("../../knexfile");

//se a variavel for test configura como test, se nao chama o banco de desenvolvimento
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

//informa que a configuração é de desenvolvimento
const connection = Knex(config);

module.exports = connection;


//arquivo connection serve para conectar os arquivos com o banco de dados