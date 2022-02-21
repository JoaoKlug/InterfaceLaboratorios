/**
 * Esse script simula a fechadura. Ele será responsável por mandar ao servidor o código de um cartão + código da fechadura/laboratório. Será responsável também por receber uma resposta do servidor
 */

const net = require('net')
const { addListener } = require('process')
const readline = require('readline')

const client = new net.Socket()
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

client.connect(4000, '192.168.18.12', () => {
    console.log('conectou!!!')
    rl.addListener('line', line => {
        client.write(line)
    })
})

client.list