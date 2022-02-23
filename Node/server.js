/**
 * Esse script fica ouvindo as conexões que são feitas no servidor. Ele será responsável por receber o código do cartão + código da fechadura/laboratório e consultar na base de dados as permissões. Deverá mandar uma resposta ao client de permissão ou negação
 */

const net = require('net')

const handleConnection = socket => {
    console.log('alguém se conectou')
    socket.on('data', data => {
        const str = data.toString()

        console.log(str)
    })
}

const server = net.createServer(handleConnection)
server.listen(4000, '127.0.0.1')