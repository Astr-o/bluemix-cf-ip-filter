const express = require('express')

const HOST = '10.0.0.20'
const PORT = 3000

const app = express()

const ipFilter = require('../')

app.use(ipFilter('10.0.0.20', '127.0.0.1'))

app.use('*', (req, res) => {
    res.send('accepted')
})

app.listen(PORT, HOST, () => {
    console.log(`{Test server running on ${HOST}:${PORT}}`)
})