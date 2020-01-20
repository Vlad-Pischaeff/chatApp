import React, {useReducer, useEffect, useState} from 'react'
import {Context} from './context'
import roomsReducer from './reducer1'
import loginReducer from './reducer2'
import userReducer from './reducer3'
import msgsReducer from './reducer4'
import currRoomReducer from './reducer5'
import FormLogIn from './FormLogIn'
import FormSignUp from './FormSignUp'
import FormChat from './FormChat'
import FormAddChat from './FormAddChat'
require('dotenv').config()
const url = `wss://${window.location.hostname}:${process.env.REACT_APP_PORT}`

export default function App() {
  const [forms, dispatchLogin] = useReducer(loginReducer, {login:'', signup:'hide', chat:'hide', addroom: 'hide', findedroom:'hide'})
  const [rooms, dispatchRooms] = useReducer(roomsReducer, '')
  const [messages, dispatchMsgs] = useReducer(msgsReducer, '')
  const [currUser, dispatchCurrUser] = useReducer(userReducer, '')
  const [currRoom, dispatchCurrRoom] = useReducer(currRoomReducer, JSON.parse(localStorage.getItem('currentRoom') || ''))
  const [socket, setSocket] = useState(new WebSocket(url))

  console.log('STATE MSGS', messages)

  useEffect(() => {
    socket.onopen = () => {
      console.log('APP client connected')
    }
  }, [])

  socket.onclose = () => {
    setSocket(new WebSocket(url))
  }

  return (
    <Context.Provider value={{dispatchLogin, dispatchRooms, dispatchMsgs, dispatchCurrUser, dispatchCurrRoom}}>
        <FormLogIn forms={forms}/>
        <FormSignUp forms={forms}/>
        <FormChat forms={forms} rooms={rooms} messages={messages} currUser={currUser} socket={socket} currRoom={currRoom} />
        <FormAddChat forms={forms} currUser={currUser}/>
        {/* <FormFindedRooms forms={forms}/> */}
    </Context.Provider>
  );
}

