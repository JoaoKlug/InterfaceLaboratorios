{
const Client = require('pg').Client;
const cliente = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "db_tcc"
})

//consultarRegistro('2022-02-20')
//inserirRegistro('2022-02-06 12:36:34', 'LABINFO2', 'augusto')
//alterarRegistro('data_hora', '2022-02-19', '2022-02-20')
//deletarRegistro('2022-02-19')

//SELECT
async function consultarRegistroTabela(){
    /**
     * Retona todas as linhas da tabela tbRegistro
     * Parâmetros: nenhum
     */
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
module.exports = async function consultarRegistro(data_hora){
    /**
     * Retorna a linha especificada pela data e hora da tabela tbRegistro
     * Parâmetros: data_hora(timestamp('YYYY-MM-DD HH:MM:SS'))
     */    
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
 module.exports = async function inserirRegistro(data_hora, nome_fechadura, nome_pessoa) {
    /**
     * Adiciona uma nova linha na tabela tbRegistro
     * Parâmetros: data_hora(timestamp('YYYY-MM-DD HH:MM:SS')), nome_fechadura(string) e nome_pessoa(string)
     * OBS:
     * - nome_fechadura é referente à uma fechadura já existente na tabela tbFechadura
     * - nome_pessoa é referente à uma pessoa já existente na tabela tbPessoa
     */
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
    /**
     * Altera o atributo especificado da tabela tbRegistro, tomando como referência o valor antigo do atributo e substituindo-o pelo novo valor
     * Parâmetros: atributo(string), valorAntigo(string) e valorNovo(string)
     */
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
    /**
     * Deleta uma linha da tabela tbRegistro tomando como referência a data e hora
     * Parâmetros: data_hora(timestamp('YYYY-MM-DD HH:MM:SS'))
     */
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
}