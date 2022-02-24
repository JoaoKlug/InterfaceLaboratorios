const Client = require('pg').Client;
    const cliente = new Client({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "db_tcc"
    })

var LiberarFechadura = require('./liberarFechadura');

class Acesso{
    constructor(acesso , nome_pessoa, cracha_pessoa){
        this.acesso =  acesso;
        this.nome_pessoa = nome_pessoa;
        this.cracha_pessoa = cracha_pessoa;
    }

    set SetAcesso(acesso){
        this.acesso = acesso;
    }
    get GetAcesso(){
        return this.acesso;
    }

    set SetNomePessoa(nome_pessoa)
    {
        this.nome_pessoa = nome_pessoa;
    }
    get GetNomePessoa()
    {
        return this.nome_pessoa;
    }

    set SetCrachaPessoa(cracha_pessoa)
    {
        this.cracha_pessoa = cracha_pessoa;
    }
    get GetCrachaPessoa()
    {
        return this.cracha_pessoa;
    }
}
var acesso =  new Acesso();

//Informações recebidas pelo Arduino
var cracha_entrada = "590046E4BF";
var nome_fechadura = "lab1";

function Armazenar(acesso_dado, nome_pessoa, cracha_pessoa)
{
    acesso.SetAcesso = acesso_dado;
    acesso.SetNomePessoa = nome_pessoa;
    acesso.SetCrachaPessoa =  cracha_pessoa;
}


const acessoPromise = LiberarFechadura(cracha_entrada);
    acessoPromise.then( function(acessoPromise){
        Armazenar(acessoPromise.acesso, acessoPromise.nome_pessoa, acessoPromise.cracha_pessoa);
            
            if(acesso.GetAcesso == true)
            {
                var InserirRegistro = require('../tables/tbRegistro.js');
                var alterarFechadura =  require('../tables/tbFechadura.js'); 
                var data_hora = Relogio();
                var nome_fechadura_up = nome_fechadura.toUpperCase();
                var atributo = 'estado_fechadura';
                InserirRegistro(data_hora, nome_fechadura_up, acesso.GetNomePessoa);
                alterarFechadura(atributo , nome_fechadura_up, 'false');

            }
    }
    );
    function Relogio()
    {
      const momentoAtual = new Date();
     
      const dia = verificarDataHora(momentoAtual.getDate());
      const mes = verificarDataHora(momentoAtual.getMonth()+1);
      const ano = momentoAtual.getFullYear();
      const hora = verificarDataHora(momentoAtual.getHours());
      const minuto = verificarDataHora(momentoAtual.getMinutes());
      const segundos = verificarDataHora(momentoAtual.getSeconds());
      
      function verificarDataHora(tempo)
      {
        return tempo <10 ? `0${tempo}` : tempo;
      }
      const dataHora = dia+"-"+mes+"-"+ano+" "+hora+":"+minuto+":"+segundos;
      return dataHora;
    }