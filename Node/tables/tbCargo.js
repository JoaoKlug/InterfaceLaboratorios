//CONFIGURA O BD
const Client = require('pg').Client;
const cliente = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "db_tcc"
})

//consultarCargoTabela()
//consultarCargo('professor')
inserirCargo('limpeza')
//alterarCargo('nome_cargo', 'professor', 'aluno')
//deletarCargo('professor')


//SELECT
async function consultarCargoTabela(){
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        const resultado = await cliente.query("select * from tbCargo")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no consultaCargo. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//SELECT ESPECÍFICO
async function consultarCargo(nome_cargo){
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        const resultado = await cliente.query("select * from tbCargo where nome_cargo = '" + nome_cargo + "';")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no consultaCargo. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//INSERT
async function inserirCargo(nome_cargo) {
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("INSERT INTO public.tbcargo(nome_cargo) VALUES ('" + nome_cargo + "');")
        console.log("Valor inserido na tabela")

        const resultado = await cliente.query("select * from tbCargo")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no inserirCargo. Erro:" + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//UPDATE
async function alterarCargo(atributo, valorAntigo, valorNovo) {
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("update tbCargo set " + atributo + " = '" + valorNovo + "' where " + atributo +" = '" + valorAntigo +"' ")
        console.log("Valor alterado na tabela")

        const resultado = await cliente.query("select * from tbCargo")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no alterarCargo. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//DELETE
async function deletarCargo(nome_cargo) {
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("delete from tbCargo where nome_cargo = '" + nome_cargo + "';")
        console.log("Valor deletado da tabela")

        const resultado = await cliente.query("select * from tbCargo")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no deletarCargo. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}