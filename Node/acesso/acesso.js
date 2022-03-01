//Informações recebidas pelo Arduino
//var cracha_entrada = "590046E4BF";
//var nome_fechadura = "lab1";
var cracha_entrada = '0'
var nome_fechadura = '0'

exports.receberDadosFechadura = function (numCartao, codigoLab){
    cracha_entrada = numCartao
    nome_fechadura = codigoLab

    console.log('Número cartão: ' + cracha_entrada)
    console.log('Código laboratório: ' + nome_fechadura)

    console.log('cartao e codigo do lab recebidos em acesso')
}

//Informações recebidas pelo Arduino
//var cracha_entrada = "590046E4BF";
//var nome_fechadura = "lab1";
var cracha_entrada = '0'
var nome_fechadura = '0'

exports.receberDadosFechadura = function (numCartao, codigoLab){
    cracha_entrada = numCartao
    nome_fechadura = codigoLab

    console.log('Número cartão: ' + cracha_entrada)
    console.log('Código laboratório: ' + nome_fechadura)

    console.log('cartao e codigo do lab recebidos em acesso')
}

//Importação das funções
var LiberarAcesso = require('./funcoes/liberarAcesso');
var RegistrarAcesso = require('./funcoes/registrarAcesso');
var AlterarEstadoFechadura = require('./funcoes/alterarEstadoFechadura')


/*Como liberarFechadura é uma função async(de espera), 
retornando os valores em array Promise, devemos receber o retorno em uma variavel
intermediária, para que possamos usar o método ".then"(depois)
*/
const liberarFechaduraPromise = LiberarAcesso(cracha_entrada);

liberarFechaduraPromise.then( function(liberarAcessoPromise){
    if(liberarAcessoPromise.acesso == true)
    RegistrarAcesso(nome_fechadura,liberarAcessoPromise.nome_pessoa);
    AlterarEstadoFechadura(nome_fechadura);
});
