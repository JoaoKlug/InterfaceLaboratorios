//CONFIGURA O BD
const Client = require('pg').Client;
const cliente = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "db_tcc"
})

import(ConverterCartao);
async function LiberarFechadura(hexCardCode)
{
    var nome_pessoa = "";
    var cracha_pessoa = 0;
    var acesso = false;

    cracha_pessoa = ConverterCartao(hexCardCode);

    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        const resultado = await cliente.query("select id_cargo_pessoa from tbPessoa where cracha_pessoa = '" + cracha_pessoa + "';")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no consultaFechadura. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }

}