const express = require('express')
const morgan = require('morgan')
const proxy = require('http-proxy-middleware')

const PROXY_PORT = 3000
const HOST_PORT = 3001

const proxyServer = express()

proxyServer.use(morgan('dev'))

proxyServer.use(proxy(`http://localhost:${HOST_PORT}`, { xfwd: true }))

proxyServer.listen(PROXY_PORT, () => {
    console.log(`Proxy server listening on ${PROXY_PORT}`)
})


const app = express()

app.use(morgan('dev'))

const ipFilter = require('../')

app.use(ipFilter(['10.0.0.1', '10.0.0.20', '127.0.0.1']))

app.use('*', (req, res) => {
    res.send('accepted')
})

app.listen(HOST_PORT, () => {
    console.log(`Test server listening on :${HOST_PORT}`)
})