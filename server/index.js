const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 8080 })

const connections = new Set()

server.on('connection', (ws) => {
  ws.on('message', (message) => {
    connections.forEach((conn) => conn.send(message))
  })

  connections.add(ws)
  console.log('active connections: ', connections.size)

  ws.on('close', () => {
    connections.delete(ws)
    console.log('active connections: ', connections.size)
  })
})
