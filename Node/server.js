const net = require('net')
// definição das variáveis
var res = 0
var cracha = 0
var nome_lab = 0

const handleConnection = socket => {
  console.log('alguém se conectou')
  socket.on('data', data => { //recebe o dado digitado no terminal do cliente
    res = data.toString() //converte o dado para string
    res = res.split('/') //divide a string recebida em 'cartao' e 'lab'
    cracha = res[0]  // atribui o valor para cracha
    nome_lab = res[1] // atribui o valor para nome do lab
    console.log(cracha) // imprime o cracha
    console.log(nome_lab) // imprime o nome do lab
  })

}

const server = net.createServer(handleConnection)
server.listen(4000, '127.0.0.1') //define um a porta e IP do servidor