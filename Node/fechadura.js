const net = require('net')
const readline = require('readline')

const client = new net.Socket()
client.connect(4000, '127.0.0.1', () => {
    console.log('conectou')
    client.write('59003E6186/lab1')
})