// definição das dependências
const express = require('express')
const path = require('path')
const res = require('express/lib/response')
const morgan = require('morgan')
const app = express()
const {Pool} = require('pg')
require('dotenv').config()

let pool = new Pool()

const port = 3000 // define a porta do servidor 

app.use(morgan('dev')) // dependência que mostra informações a mais no terminal. útil para desenvolvimento
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) =>{  //define a resposta para a resquest
    res.sendFile(path.join(__dirname, '../SalasLaboratorios'))
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