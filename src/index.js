import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { startWebsocketConnection } from './websocket'

ReactDOM.render(<App />, document.getElementById('root'))
startWebsocketConnection()
