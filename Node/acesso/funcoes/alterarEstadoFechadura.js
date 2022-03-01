/*
Altera no BD o estado da fechadura para ocupado(false)
*/
module.exports = function AlterarEstadoFechadura(nome_fechadura)
{
    var AlterarFechadura =  require('../../tables/tbFechadura.js');
    var nome_fechadura_up = nome_fechadura.toUpperCase();
    var atributo = 'estado_fechadura';
    AlterarFechadura(atributo , nome_fechadura_up, 'false');
}
