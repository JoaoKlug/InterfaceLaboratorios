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
//consultarPessoaTabela()
//consultarPessoa('pedro')
//inserirPessoa('joao', '07058559', '20193018818', 'aluno', 'S','2019');
//alterarPessoa('cracha_pessoa', '7058559', '06224966')
//deletarPessoa('jg')

//SELECT
async function consultarPessoaTabela(){
     /**
     * Retona todas as linhas da tabela tbPessoa
     * Parâmetros: nenhum
     */
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
    /**
     * Retorna a linha especificada pelo nome da pessoa da tabela tbPessoa
     * Parâmetros: nome_pessoa(string)
     */    
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
async function inserirPessoa(nome_pessoa, cracha_pessoa, matricula_pessoa, nome_cargo, ativo, ano_entrada) {
    /**
     * Adiciona uma nova linha na tabela tbPessoa
     * Parâmetros: nome_pessoa(string), cracha_pessoa(string), matricula_pessoa(string), nome_cargo(string), ativo(char) e ano_entrada(integer)
     * OBS: 
     * - cracha_pessoa é referente ao código A do cartão. Para a consulta no banco, ele deve ser convertido    para weigand (W)
     * - matricula_pessoa deve ter o formato '20193019910'
     * - nome_cargo é refente à um cargo já existente na tabela tbCargo 
     */
    try{
        console.log("Iniciando a conexão")
        await cliente.connect()
        console.log("Conexão bem sucedida")

        await cliente.query("INSERT INTO public.tbpessoa(nome_pessoa, cracha_pessoa, matricula_pessoa, id_cargo_pessoa, ativo, ano_entrada) VALUES ('" + nome_pessoa + "', '" + cracha_pessoa + "', '" + matricula_pessoa + "', (select id from tbCargo where nome_cargo = '" + nome_cargo + "'), '" + ativo + "' , '" + ano_entrada + "');")

        const resultado = await cliente.query("select * from tbpessoa")
        console.table(resultado.rows)
    }
    catch{
        console.log("Ocorreu um erro no inserirPessoa")
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado")
    }
}

//UPDATE
async function alterarPessoa(atributo, valorAntigo, valorNovo) {
    /**
     * Altera o atributo especificado da tabela tbPessoa, tomando como referência o valor antigo do atributo e substituindo-o pelo novo valor
     * Parâmetros: atributo(string), valorAntigo(string) e valorNovo(string)
     */
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
    /**
     * Deleta uma linha da tabela tbPessoa tomando como referência o nome da pessoa
     * Parâmetros: nome_pessoa(string)
     */
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