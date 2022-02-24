const net = require('net')
const readline = require('readline')

const client = new net.Socket()
client.connect(4000, '127.0.0.1', () => { //define a porta e o IP do servidor destino
    console.log('conectou')
    client.write('59003E6186/lab1') // IMPORTANTE: a mensagem deve ser no formato 'cartao/lab'. 'cartao' é referente ao código hexadecimal do cartão e 'lab' é referente ao nome do laboratório
})