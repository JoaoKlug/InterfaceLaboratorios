var converterCartao =  require('../converterCartao/converterCartao');
//CONFIGURA O BD
const Client = require('pg').Client;
const cliente = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "db_tcc"
})

async function LiberarFechadura(hexCardCode)
{
    var nome_pessoa = "";
    var cracha_pessoa = 0;
    var acesso = false;
    var id_cargo_pessoa = 0;
    cracha_pessoa = converterCartao.ConverterCartao(hexCardCode);
    console.log(cracha_pessoa);

    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        const resultado = await cliente.query("select id_cargo_pessoa from tbPessoa where cracha_pessoa = '" + cracha_pessoa + "';")
        var cargo_id = resultado.rows[0];                                                                                                                                                                                                                                                      ;
        console.log(cargo_id);                                              
        
        if(cargo_id == 2){
            acesso = true;
            nome_pessoa = await cliente.query("select nome_pessoa from tbPessoa where cracha_pessoa = '" + cracha_pessoa + "';")
            console.log(nome_pessoa);
            const resultado = await cliente.query("select Cast(id_cargo_pessoa as INTEGER) from tbPessoa where cracha_pessoa = '" + cracha_pessoa + "';")
            id_cargo_pessoa = resultado.getInt("id_cargo_pessoa");
            console.log(id_cargo_pessoa);
            const nome_cargo = await cliente.query("select nome_cargo from tbCargo where id_cargo = '" + id_cargo_pessoa + "';")
            console.log(nome_cargo);
            if (nome_cargo == "professor" || nome_cargo == "servidor")
            {
                acesso = true;
                nome_pessoa = await cliente.query("select nome_pessoa from tbPessoa where cracha_pessoa '" + cracha_pessoa + "';")
                return nome_pessoa;        
            }
        return acesso;
        }
    }
    catch{
        console.log("Ocorreu um erro")
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}
var acesso = LiberarFechadura("590046E4BF");
console.log(acesso);