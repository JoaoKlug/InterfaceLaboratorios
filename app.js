// definição das dependências
const express = require('express')
const path = require('path')
const res = require('express/lib/response')
const morgan = require('morgan')
const app = express()
const {Pool} = require('pg')
var acesso = require('./Node/acesso/acesso')
require('dotenv').config()

let pool = new Pool()

const port = 3000 // define a porta do servidor 

app.use(morgan('dev')) // dependência que mostra informações a mais no terminal. útil para desenvolvimento
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) =>{  //define a resposta para a resquest
    res.sendFile(__dirname + "/SalasLaboratorios/index.html")
})

//IMPORTAÇÃO DEMAIS PAGINAS HTML
app.get('/index.html', (req, res) =>{  
    res.sendFile(__dirname + "/SalasLaboratorios/index.html")
})

app.get('/Contato/index.html', (req, res) =>{  
    res.sendFile(__dirname + "/SalasLaboratorios/Contato/index.html")
})

app.get('/DescricaoSalaLab/index.html', (req, res) =>{  
    res.sendFile(__dirname + "/SalasLaboratorios/DescricaoSalaLab/index.html")
})

app.get('/Login/index.html', (req, res) =>{  
    res.sendFile(__dirname + "/SalasLaboratorios/Login/index.html")
})

app.get('/Login/recuperarSenha.html', (req, res) =>{  
    res.sendFile(__dirname + "/SalasLaboratorios/Login/recuperarSenha.html")
})

app.get('/SobreProjeto/index.html', (req, res) =>{  
    res.sendFile(__dirname + "/SalasLaboratorios/SobreProjeto/index.html")
})

app.get('/simfechadura.html', (req, res) =>{
    res.sendFile(__dirname + "/SalasLaboratorios/simfechadura.html")
})

//DirecaoEnsino
app.get('/DirecaoEnsino/index.html', (req, res) =>{
    res.sendFile(__dirname + "/SalasLaboratorios/DirecaoEnsino/index.html")
})

app.get('/DirecaoEnsino/Cadastrar/Cadastrar.html', (req, res) =>{
    res.sendFile(__dirname + "/SalasLaboratorios/DirecaoEnsino/Cadastrar/Cadastrar.html")
})

app.get('/DirecaoEnsino/ConcederPermissoes/ConcederPermissoes.html', (req, res) =>{
    res.sendFile(__dirname + "/SalasLaboratorios/DirecaoEnsino/ConcederPermissoes/ConcederPermissoes.html")
})

app.get('/DirecaoEnsino/LiberarAcesso/LiberarAcesso.html', (req, res) =>{
    res.sendFile(__dirname + "/SalasLaboratorios/DirecaoEnsino/LiberarAcesso/LiberarAcesso.html")
})

app.get('/DirecaoEnsino/Registros/Registros.html', (req, res) =>{
    res.sendFile(__dirname + "/SalasLaboratorios/DirecaoEnsino/Registros/Registros.html")
})

app.get('/DirecaoEnsino/Sair/Sair.html', (req, res) =>{
    res.sendFile(__dirname + "/SalasLaboratorios/DirecaoEnsino/Sair/Sair.html")
})

app.get('/DirecaoEnsino/VerificarCartoes/VerificarCartoes.html', (req, res) =>{
    res.sendFile(__dirname + "/SalasLaboratorios/DirecaoEnsino/VerificarCartoes/VerificarCartoes.html")
})

//IMPORTAÇÃO ARQUIVOS CSS
app.get('/Css/cabecalho.css', (req, res) =>{
    res.sendFile(__dirname + "/Css/cabecalho.css")
})

app.get('/Css/contatos.css', (req, res) =>{
    res.sendFile(__dirname + "/Css/contatos.css")
})

app.get('/Css/login.css', (req, res) =>{
    res.sendFile(__dirname + "/Css/login.css")
})

app.get('/Css/main.css', (req, res) =>{
    res.sendFile(__dirname + "/Css/main.css")
})

app.get('/Css/menuPrincipal.css', (req, res) =>{
    res.sendFile(__dirname + "/Css/menuPrincipal.css")
})

app.get('/Css/sobreProjeto.css', (req, res) =>{
    res.sendFile(__dirname + "/Css/sobreProjeto.css")
})

//IMPORTAÇÃO IMAGENS
app.get('/Imagens/Fechadura_Rasp.jpeg', (req, res) =>{
    res.sendFile(__dirname + "/Imagens/Fechadura_Rasp.jpeg")
})

app.get('/Imagens/IconeMenu.png', (req, res) =>{
    res.sendFile(__dirname + "/Imagens/IconeMenu.png")
})

app.get('/Imagens/IconeUsuario@1x.png', (req, res) =>{
    res.sendFile(__dirname + "/Imagens/IconeUsuario@1x.png")
})

app.get('/Imagens/IFPRicon.png', (req, res) =>{
    res.sendFile(__dirname + "/Imagens/IFPRicon.png")
})

app.get('/Imagens/LogoIFPR@1x.png', (req, res) =>{
    res.sendFile(__dirname + "/Imagens/LogoIFPR@1x.png")
})

app.get('/Imagens/Integrantes/AugustoAguiar.jpeg', (req, res) =>{
    res.sendFile(__dirname + "/Imagens/Integrantes/AugustoAguiar.jpeg")
})

app.get('/Imagens/Integrantes/joaoklug.jpg', (req, res) =>{
    res.sendFile(__dirname + "/Imagens/Integrantes/joaoklug.jpg")
})

app.get('/Imagens/Integrantes/PedroFilla.jpeg', (req, res) =>{
    res.sendFile(__dirname + "/Imagens/Integrantes/PedroFilla.jpeg")
})

//IMPORTAÇÃO JQUERY
app.get('/Jquery/jquery-3.6.0.min.js', (req, res) =>{
    res.sendFile(__dirname + "/Jquery/jquery-3.6.0.min.js")
})

//IMPORTAÇÃO JS FRONTEND
app.get('/Js/cabecalho.js', (req, res) =>{
    res.sendFile(__dirname + "/Js/cabecalho.js")
})

//MÉTODOS

//método que recebe os dados de 'simfechadura'
app.post('/reqFechadura', (req, res) =>{
    var numCartao = req.body.numCartao
    var codigoLab = req.body.codigoLab

    acesso.receberDadosFechadura(numCartao, codigoLab)
    console.log('enviado para o script acesso')
})

/*app.get('/info/get', (req, res) =>{
    try{
        pool.connect(async (error, client, release) =>{
            let resp = await client.query(`select * from public.tbTeste;`)
            release()
            res.send(resp.rows)
        })
    }catch{
        console.log(error)
    }
})

app.post('/info/add', (req, res) =>{
    try{
        pool.connect(async (error, client, release) =>{
            let resp = await client.query(`insert into tbteste(text) values('${req.body.add}');`)
            res.redirect('/info/get')
        })
    }catch{
        console.log(error)
    }
})

app.post('/info/del', (req, res) =>{
    try{
        pool.connect(async (error, client, release) =>{
            let resp = await client.query(`delete from tbteste where text = '${req.body.delete}'`)
            res.redirect('/info/get')
        })
    }catch{
        console.log(error)
    }
})

app.post('/info/upd', (req, res) =>{
    try{
        pool.connect(async (error, client, release) =>{
            let resp = await client.query(`UPDATE tbteste SET text = '${req.body.newValue}' WHERE text = '${req.body.oldValue}';`)
            res.redirect('/info/get')
        })
    }catch{
        console.log(error)
    }
})*/

app.listen(port, () => { // faz com que o servidor rode na porta especificada
    console.log('server started on port ' + port)
})