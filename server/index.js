// server/index.js

// import the express and express-ws libraries
const express = require('express')
const expressWs = require('express-ws')

// create a new express application
const app = express()
// decorate the app instance with express-ws to have it
// implement websockets
expressWs(app)

// Create a new set to hold each clients socket connection
const connections = new Set()

// We define a handler that will be called everytime a new
// Websocket connection is made
const wsHandler = (ws) => {
  // Add the connection to our set
  connections.add(ws)

  // We define the handler to be called everytime this
  // connection receives a new message from the client
  ws.on('message', (message) => {
    // Once we receive a message, we send it to all clients
    // in the connection set
    connections.forEach((conn) => conn.send(message))
  })

  // Once the client disconnects, the `close` handler is called
  ws.on('close', () => {
    // The closed connection is removed from the set
    connections.delete(ws)
  })
}

// add our websocket handler to the '/chat' route
app.ws('/chat', wsHandler)

// host the static files in the build directory
// (we will be using this later)
app.use(express.static('build'))

// start the server, listening to port 8080
app.listen(8080)