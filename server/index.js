const connections = new Set()

const wsHandler = (ws) => {
  ws.on('message', (message) => {
    connections.forEach((conn) => conn.send(message))
  })

  connections.add(ws)
  console.log('active connections: ', connections.size)

  ws.on('close', () => {
    connections.delete(ws)
    console.log('active connections: ', connections.size)
  })
}

server.on('connection', wsHandler)

const express = require('express')
const expressWs = require('express-ws')

const app = express()
expressWs(app)

app.use(express.static('build'))
app.ws('/chat', wsHandler)

app.listen(8080)