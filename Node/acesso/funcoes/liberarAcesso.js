/*
Recebe o codigo do cartão, verifica à quem ele pertence e se ele pode abrir uma Fechadura
Retorna se o acesso foi liberado e o nome de quem tentou acessar
*/
module.exports = async function LiberarFechadura(hexCardCode)
{
    //Conecta BD
    const Client = require('pg').Client;
    const cliente = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "db_tcc"
    })

    //Importa a funcão ConverterCartao
    var ConverterCartao =  require('../../converterCartao/converterCartao');

    //Iniciando as variaveis necessárias
    var nome_pessoa = "";
    var cracha_pessoa = 0;
    var acesso = false;
    var ativo = "";

    cracha_pessoa = ConverterCartao(hexCardCode);

    try{
        console.log("Iniciando a conexão em liberarAcesso")
        await cliente.connect()
        console.log("Conexão bem sucedida em liberarAcesso")

        //Consulta se o cartão da pessoa está ativo 
        var resultado = await cliente.query("select ativo from tbPessoa where cracha_pessoa = '" + cracha_pessoa + "';")
            ativo = resultado.rows[0].ativo;

        //Consulta o cargo da pessoa
        resultado = await cliente.query("select id_cargo_pessoa from tbPessoa where cracha_pessoa = '" + cracha_pessoa + "';")
            var id_cargo_pessoa = resultado.rows[0].id_cargo_pessoa;
                resultado = await cliente.query("select nome_cargo from tbCargo where id = '" + id_cargo_pessoa + "';")
                    var nome_cargo = resultado.rows[0].nome_cargo;

        //Consulta o nome da pessoa
        resultado = await cliente.query("select nome_pessoa from tbPessoa where cracha_pessoa = '" + cracha_pessoa + "';")
            nome_pessoa = resultado.rows[0].nome_pessoa;

        //Se o cartão estiver ativo e o cargo for servidor ou prefessor, o acesso é liberado
        if(ativo == "S")
        {
            if (nome_cargo == "professor" || nome_cargo == "servidor")
                {
                    acesso = true;
                }
        } 
    }
    catch{
        console.log("Ocorreu um erro em liberar a fechadura")
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado de liberarFechadura")
    }
    return {acesso, nome_pessoa};
}