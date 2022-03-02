/*
Insere no BD, o registro de quem acessou qual labaratório e em qual horário
*/
module.exports = function RegistrarAcesso(nome_fechadura, nome_pessoa)
{
        var InserirRegistro = require('../../tables/tbRegistro.js');

        var data_hora = DataHora();
        var nome_fechadura_up = nome_fechadura.toUpperCase();
        InserirRegistro(data_hora, nome_fechadura_up, nome_pessoa);
}
/*
Função para pegar a Data e a Hora do acesso
*/
function DataHora()
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