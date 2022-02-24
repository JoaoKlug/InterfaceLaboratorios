//Importa funcao
var LiberarFechadura = require('./liberarFechadura');
//Classe Acesso
class Acesso{
    constructor(acesso , nome_pessoa, cracha_pessoa){
        this.acesso =  acesso;
        this.nome_pessoa = nome_pessoa;
        this.cracha_pessoa = cracha_pessoa;
    }

    set SetAcesso(acesso){
        this.acesso = acesso;
    }
    set SetNomePessoa(nome_pessoa)
    {
        this.nome_pessoa = nome_pessoa;
    }
    set SetCrachaPessoa(cracha_pessoa)
    {
        this.cracha_pessoa = cracha_pessoa;
    }
    get GetAcesso(){
        return this.acesso;
    }
    get GetNomePessoa()
    {
        return this.nome_pessoa;
    }
    get GetCracha_Pessoa()
    {
        return this.cracha_pessoa;
    }
}
var acesso =  new Acesso();

acesso.SetCrachaPessoa = "590046E4BF";

const acessoPromisse = LiberarFechadura(acesso.cracha_pessoa);
    acessoPromisse.then( function(acessoPromisse){
        return acesso.SetAcesso = acessoPromisse.acesso , acesso.SetNomePessoa = acessoPromisse.nome_pessoa
    });
    console.log(acesso);
