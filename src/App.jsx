import React from 'react'
import './App.css'

import MessageWindow from './MessageWindow'
import TextBar from './TextBar'
import { registerOnMessageCallback, send } from './websocket'

export class App extends React.Component {
  state = {
    messages: [],
    username: null
  }

  constructor (props) {
    super(props)
    registerOnMessageCallback(this.onMessageReceived.bind(this))
  }

  onMessageReceived (msg) {
    msg = JSON.parse(msg)
    this.setState({
      messages: this.state.messages.concat(msg)
    })
  }

  setUserName (name) {
    this.setState({
      username: name
    })
  }

  sendMessage (text) {
    const message = {
      username: this.state.username,
      text: text
    }
    send(JSON.stringify(message))
  }

  render () {
    const setUserName = this.setUserName.bind(this)
    const sendMessage = this.sendMessage.bind(this)

    if (this.state.username === null) {
      return (
        <div className='container'>
          <div className='container-title'>Enter username</div>
          <TextBar onSend={setUserName} />
        </div>
      )
    }
    return (
      <div className='container'>
        <div className='container-title'>Messages</div>
        <MessageWindow messages={this.state.messages} username={this.state.username} />
        <TextBar onSend={sendMessage} />
      </div>
    )
  }
}

export default App
