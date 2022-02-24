//CONFIGURA O BD
const Client = require('pg').Client;
const cliente = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "db_tcc"
})

// PARA ATIVAR AS FUNÇÕES DESCOMENTE
//consultarCargoTabela()
//consultarCargo('professor')
//inserirCargo('servidor')
//alterarCargo('nome_cargo', 'professor', 'aluno')
//deletarCargo('professor')


//SELECT
async function consultarCargoTabela(){
    /**
     * Retona todas as linhas da tabela tbCargo
     * Parâmetros: nenhum
     */
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
    /**
     * Retorna a linha especificada pelo nome do cargo da tabela tbCargo
     * Parâmetros: nome_cargo(string)
     */
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
    /**
     * Adiciona uma nova linha na tabela tbCargo
     * Parâmetros: nome_cargo(string)
     */
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
    /**
     * Altera o atributo especificado da tabela tbCargo, tomando como referência o valor antigo do atributo e substituindo-o pelo novo valor
     * Parâmetros: atributo(string), valorAntigo(string) e valorNovo(string)
     */
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
    /**
     * Deleta uma linha da tabela tbCargo tomando como referência o nome do cargo
     * Parâmetros: nome_cargo(string)
     */
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