//CONFIGURA O BD
const Client = require('pg').Client;
const cliente = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "db_tcc"
})

//consultarRegistroTabela()
//consultarRegistro('2022-02-20')
//inserirRegistro('2022-02-06 12:36:34', 'LABINFO2', 'augusto')
//alterarRegistro('data_hora', '2022-02-19', '2022-02-20')
//deletarRegistro('2022-02-19')

//SELECT
async function consultarRegistroTabela(){
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        const resultado = await cliente.query("select * from tbRegistro")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no consultarRegistro. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//SELECT ESPECÍFICO
async function consultarRegistro(data_hora){
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        const resultado = await cliente.query("select * from tbRegistro where data_hora = '" + data_hora + "';")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no consultarRegistro. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//INSERT
async function inserirRegistro(data_hora, nome_fechadura, nome_pessoa) {
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("INSERT INTO public.tbregistro(data_hora, id_fechadura, id_pessoa) VALUES ('" + data_hora + "', (select id from tbFechadura where nome_fechadura = '" + nome_fechadura + "'), (select id from tbPessoa where nome_pessoa = '" + nome_pessoa + "'));")
        console.log("Valor inserido na tabela")

        const resultado = await cliente.query("select * from tbRegistro")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no inserirRegistro. Erro:" + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//UPDATE
async function alterarRegistro(atributo, valorAntigo, valorNovo) {
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("update tbRegistro set " + atributo + " = '" + valorNovo + "' where " + atributo +" = '" + valorAntigo +"' ")
        console.log("Valor alterado na tabela")

        const resultado = await cliente.query("select * from tbRegistro")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no alterarRegistro. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//DELETE
async function deletarRegistro(data_hora) {
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("delete from tbRegistro where data_hora = '" + data_hora + "';")
        console.log("Valor deletado da tabela")

        const resultado = await cliente.query("select * from tbRegistro")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no deletarRegistro. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}