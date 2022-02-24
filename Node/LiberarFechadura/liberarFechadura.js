//CONFIGURA O BD
const Client = require('pg').Client;
const cliente = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "db_tcc"
})
module.exports = async function LiberarFechadura(hexCardCode)
{
    var converterCartao =  require('./converterCartao');
    var nome_pessoa = "";
    var cracha_pessoa = 0;
    var acesso = false;
    var ativo = "";
    cracha_pessoa = converterCartao(hexCardCode);

    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        var resultado = await cliente.query("select ativo from tbPessoa where cracha_pessoa = '" + cracha_pessoa + "';")
            var ativo = resultado.rows[0].ativo;

        resultado = await cliente.query("select id_cargo_pessoa from tbPessoa where cracha_pessoa = '" + cracha_pessoa + "';")
            var id_cargo_pessoa = Number(resultado.rows[0].id_cargo_pessoa);

        resultado = await cliente.query("select nome_cargo from tbCargo where id = '" + id_cargo_pessoa + "';")
            var nome_cargo = resultado.rows[0].nome_cargo;

            if (nome_cargo == "professor" || nome_cargo == "servidor" && ativo == "S")
            {
                acesso = true;
                resultado = await cliente.query("select nome_pessoa from tbPessoa where cracha_pessoa = '" + cracha_pessoa + "';")
                    nome_pessoa = resultado.rows[0].nome_pessoa;     
            }
    }
    catch{
        console.log("Ocorreu um erro")
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
        
    }
    return {acesso, nome_pessoa};
}
//Testar sem module.exports ( qnd for usar tem que seguir o padrão)
    //var acessoPromisse = LiberarFechadura("590046E4BF");
    //acessoPromisse.then( function(acessoPromisse){
    //    var acesso = acessoPromisse.acesso;
    //    var nome_pessoa = acessoPromisse.nome_pessoa;
    //   console.log(acesso + " " + nome_pessoa);
    //});

