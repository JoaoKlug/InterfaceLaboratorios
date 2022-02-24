const net = require('net')
var res = 0
var cracha = 0
var nome_lab = 0

const handleConnection = socket => {
  console.log('alguém se conectou')
  socket.on('data', data => {
    res = data.toString()
    res = res.split('/')
    cracha = res[0]
    nome_lab = res[1]
    console.log(cracha)
    console.log(nome_lab)
  })

}

const server = net.createServer(handleConnection)
server.listen(4000, '127.0.0.1')