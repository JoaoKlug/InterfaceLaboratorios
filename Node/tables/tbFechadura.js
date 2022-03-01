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
//consultarFechaduraTabela()
//consultarFechadura('LABINFO1')
//inserirFechadura('LAB1')
//alterarFechadura('estado_fechadura', 'LAB1', 'true')
//deletarFechadura('LABINFO2')

//SELECT
async function consultarFechaduraTabela(){
    /**
     * Retona todas as linhas da tabela tbFechadura
     * Parâmetros: nenhum
     */
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        const resultado = await cliente.query("select * from tbFechadura")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no consultarFechadura. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//SELECT ESPECÍFICO
async function consultarFechadura(nome_fechadura){
    /**
     * Retorna a linha especificada pelo nome da fechadura da tabela tbFechadura
     * Parâmetros: nome_fechadura(string)
     */    
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        const resultado = await cliente.query("select * from tbFechadura where nome_fechadura = '" + nome_fechadura + "';")
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

//INSERT
async function inserirFechadura(nome_fechadura) {
    /**
     * Adiciona uma nova linha na tabela tbFechadura
     * Parâmetros: nome_fechadura(string)
     */
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("INSERT INTO public.tbfechadura(nome_fechadura) VALUES ('" + nome_fechadura + "');")
        console.log("Valor inserido na tabela")

        const resultado = await cliente.query("select * from tbFechadura")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no inserirFechadura. Erro:" + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//UPDATE
module.exports = async function alterarFechadura(atributo, nome_fechadura, valorNovo) {
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("update tbFechadura set "+ atributo + " = '" + valorNovo + "' where nome_fechadura = '" + nome_fechadura +"';")
        
        console.log("Valor alterado na tabela")

        const resultado = await cliente.query("select * from tbFechadura")
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
async function deletarFechadura(nome_fechadura) {
    /**
     * Deleta uma linha da tabela tbFechadura tomando como referência o nome da fechadura
     * Parâmetros: nome_fechadura(string)
     */
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("delete from tbFechadura where nome_fechadura = '" + nome_fechadura + "';")
        console.log("Valor deletado da tabela")

        const resultado = await cliente.query("select * from tbFechadura")
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