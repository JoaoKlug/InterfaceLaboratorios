//CONFIGURA O BD
const Client = require('pg').Client;
const cliente = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "db_tcc"
})

consultarDirecaoEnsinoTabela()
//consultarDirecaoEnsino('email@teste.com')
//inserirDirecaoEnsino('email3@teste.com', 'senhaForte2', 'joao')
//alterarDirecaoEnsino('email_DirecaoEnsino', 'email2@teste.com', 'emailMaster@teste.com')
//deletarDirecaoEnsino('emailMaster@teste.com')

//SELECT
async function consultarDirecaoEnsinoTabela(){
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        const resultado = await cliente.query("select * from tbDirecaoEnsino")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no consultarDirecaoEnsino. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//SELECT ESPECÍFICO
async function consultarDirecaoEnsino(email_DirecaoEnsino){
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        const resultado = await cliente.query("select * from tbDirecaoEnsino where email_DirecaoEnsino = '" + email_DirecaoEnsino + "';")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no consultaDirecaoEnsino. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//INSERT
async function inserirDirecaoEnsino(email_DirecaoEnsino, senha_DirecaoEnsino, nome_pessoa) {
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("INSERT INTO public.tbdirecaoensino(email_direcaoensino, senha_direcaoensino, id_pessoa) VALUES ('" + email_DirecaoEnsino + "', '" + senha_DirecaoEnsino + "', (select id from tbPessoa where nome_pessoa = '" + nome_pessoa + "'));")
        console.log("Valor inserido na tabela")

        const resultado = await cliente.query("select * from tbDirecaoEnsino")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no inserirDirecaoEnsino.")
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//UPDATE
async function alterarDirecaoEnsino(atributo, valorAntigo, valorNovo) {
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("update tbDirecaoEnsino set " + atributo + " = '" + valorNovo + "' where " + atributo +" = '" + valorAntigo +"' ")
        console.log("Valor alterado na tabela")

        const resultado = await cliente.query("select * from tbDirecaoEnsino")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no alterarDirecaoEnsino. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//DELETE
async function deletarDirecaoEnsino(email_DirecaoEnsino) {
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("delete from tbDirecaoEnsino where email_DirecaoEnsino = '" + email_DirecaoEnsino + "';")
        console.log("Valor deletado da tabela")

        const resultado = await cliente.query("select * from tbDirecaoEnsino")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no deletarDirecaoEnsino. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}