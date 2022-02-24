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
    get GetCrachaPessoa()
    {
        return this.cracha_pessoa;
    }
}
var acesso =  new Acesso();

//Cartão lido pela fechadura
var cracha_entrada = "590046E4BF";

function Armazenar(acesso_dado, nome_pessoa, cracha_pessoa)
{
    acesso.SetAcesso = acesso_dado;
    acesso.SetNomePessoa = nome_pessoa;
    acesso.SetCrachaPessoa =  cracha_pessoa;
}

const acessoPromisse = LiberarFechadura(cracha_entrada);
    acessoPromisse.then( function(acessoPromisse){
        Armazenar(acessoPromisse.acesso, acessoPromisse.nome_pessoa, acessoPromisse.cracha_pessoa);
        console.log(acesso.GetAcesso + " " +acesso.GetNomePessoa + " " + acesso.GetCrachaPessoa);
    });
    
