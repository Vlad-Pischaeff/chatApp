import React, {useReducer, useEffect, useState} from 'react'
import {Context} from './context'
import roomsReducer from './reducer1'
import loginReducer from './reducer2'
// import userReducer from './reducer3'
// import msgsReducer from './reducer4'
// import currRoomReducer from './reducer5'
import newMsgsReducer from './reducer6'
import dialogReducer from './reducer7'
import FormLogIn from './FormLogIn'
import FormSignUp from './FormSignUp'
import FormChat from './FormChat'
import FormAddChat from './FormAddChat'

const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
let { host } = window.location
const url = `${protocolPrefix}//${host}/ws`
var socket = new WebSocket(url)

export default function App() {
  const [forms, dispatchLogin] = useReducer(loginReducer, {login:'', signup:'hide', chat:'hide', addroom: 'hide', findedroom:'hide'})
  const [rooms, dispatchRooms] = useReducer(roomsReducer, '')
  // const [messages, dispatchMsgs] = useReducer(msgsReducer, '')
  const [messages, setMessages] = useState('')
  const [dialog, dispatchDialog] = useReducer(dialogReducer, [])
  const [newMessages, dispatchNewMessages] = useReducer(newMsgsReducer, [])
  // const [currUser, dispatchCurrUser] = useReducer(userReducer, '')
  const [currUser, setCurrUser] = useState({})
  // const [currRoom, dispatchCurrRoom] = useReducer(currRoomReducer, JSON.parse(localStorage.getItem('currentRoom')) || {})
  const [currRoom, setCurrRoom] = useState(JSON.parse(localStorage.getItem('currentRoom')) || {})
  
  useEffect(() => {
    socket.onopen = () => {
      console.log('APP client connected ... ', url, socket)
    }
  }, [])

  socket.onclose = () => {
    socket = new WebSocket(url)
  }

  console.log('curr user', currUser)

  return (
    <Context.Provider value={{ forms, rooms, currUser, currRoom, messages, 
                              setMessages,
                              setCurrUser,
                              setCurrRoom, 
                              dispatchLogin, 
                              dispatchRooms, 
                              dispatchNewMessages, 
                              dispatchDialog }}>
      <FormLogIn socket={socket}/>
      <FormSignUp />
      <FormChat socket={socket} newMessages={newMessages} dialog={dialog}/>
      <FormAddChat forms={forms} currUser={currUser}/>
    </Context.Provider>
  );
}

