module.exports =  async function RetornarEstadoFechadura(nome_fechadura)
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

    try{
        console.log("Iniciando a conexão em retornarEstadoFechadura")
        await cliente.connect()
        console.log("Conexão bem sucedida em retornarEstadoFechadura")
        
        var resultado = await cliente.query("select estado_fechadura from tbFechadura where nome_fechadura = '" + nome_fechadura + "';")
        var estado_fechadura = resultado.rows[0].estado_fechadura;
    }
    catch{
        console.log("Ocorreu um erro em retornarEstadoFechadura a fechadura")
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado de retornaEstadoFechadura")
    }
    return {estado_fechadura};
}
