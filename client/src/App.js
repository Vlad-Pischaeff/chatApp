import React, {useReducer, useEffect} from 'react'
import {Context} from './context'
import roomsReducer from './reducer1'
import loginReducer from './reducer2'
import userReducer from './reducer3'
import msgsReducer from './reducer4'
import newMsgsReducer from './reducer6'
import currRoomReducer from './reducer5'
import dialogReducer from './reducer7'
import FormLogIn from './FormLogIn'
import FormSignUp from './FormSignUp'
import FormChat from './FormChat'
import FormAddChat from './FormAddChat'
// require('dotenv').config()
const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
let { host } = window.location
const url = `${protocolPrefix}//${host}/ws`

// const url = `ws://${window.location.hostname}:${process.env.REACT_APP_PORT}/ws`
// console.log('url', url, window.location)
var socket = new WebSocket(url)

export default function App() {
  const [forms, dispatchLogin] = useReducer(loginReducer, {login:'', signup:'hide', chat:'hide', addroom: 'hide', findedroom:'hide'})
  const [rooms, dispatchRooms] = useReducer(roomsReducer, '')
  const [messages, dispatchMsgs] = useReducer(msgsReducer, '')
  const [dialog, dispatchDialog] = useReducer(dialogReducer, [])
  const [newMessages, dispatchNewMessages] = useReducer(newMsgsReducer, [])
  const [currUser, dispatchCurrUser] = useReducer(userReducer, '')
  const [currRoom, dispatchCurrRoom] = useReducer(currRoomReducer, JSON.parse(localStorage.getItem('currentRoom')) || {})
    
  useEffect(() => {
    socket.onopen = () => {
      console.log('APP client connected ... ', url, socket)
    }
  }, [])

  socket.onclose = () => {
    socket = new WebSocket(url)
  }

  return (
    <Context.Provider value={{dispatchLogin, dispatchRooms, dispatchMsgs, dispatchCurrUser, dispatchCurrRoom, dispatchNewMessages, dispatchDialog}}>
        <FormLogIn forms={forms} socket={socket}/>
        <FormSignUp forms={forms}/>
        <FormChat forms={forms} rooms={rooms} messages={messages} currUser={currUser} socket={socket} currRoom={currRoom} newMessages={newMessages} dialog={dialog}/>
        <FormAddChat forms={forms} currUser={currUser}/>
    </Context.Provider>
  );
}

