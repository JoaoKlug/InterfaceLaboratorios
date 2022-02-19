//CONFIGURA O BD
const Client = require('pg').Client;
const cliente = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "db_tcc"
})

//consultarPessoaTabela()
//consultarPessoa('pedro')
//inserirPessoa('augusto', '12212212', '20193018812', 'limpeza', 'a')
//alterarPessoa('nome_pessoa', 'joao', 'jg')
//deletarPessoa('jg')

//SELECT
async function consultarPessoaTabela(){
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        const resultado = await cliente.query("select * from tbPessoa")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no consultarPessoa. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//SELECT ESPECÍFICO
async function consultarPessoa(nome_pessoa){
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        const resultado = await cliente.query("select * from tbPessoa where nome_pessoa = '" + nome_pessoa + "';")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no consultarPessoa. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//INSERT
async function inserirPessoa(nome_pessoa, cracha_pessoa, matricula_pessoa, nome_cargo, ativo) {
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("INSERT INTO public.tbpessoa(nome_pessoa, cracha_pessoa, matricula_pessoa, id_cargo_pessoa, ativo) VALUES ('" + nome_pessoa + "', '" + cracha_pessoa + "', '" + matricula_pessoa + "', (select id from tbCargo where nome_cargo = '" + nome_cargo + "'), '" + ativo + "');")
        console.log("Valor inserido na tabela")

        const resultado = await cliente.query("select * from tbPessoa")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no inserirPessoa. Erro:" + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//UPDATE
async function alterarPessoa(atributo, valorAntigo, valorNovo) {
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("update tbPessoa set " + atributo + " = '" + valorNovo + "' where " + atributo +" = '" + valorAntigo +"' ")
        console.log("Valor alterado na tabela")

        const resultado = await cliente.query("select * from tbPessoa")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no alterarPessoa. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//DELETE
async function deletarPessoa(nome_pessoa) {
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("delete from tbPessoa where nome_pessoa = '" + nome_pessoa + "';")
        console.log("Valor deletado da tabela")

        const resultado = await cliente.query("select * from tbPessoa")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no deletarPessoa. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}