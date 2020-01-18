import React, {useReducer, useEffect, useState} from 'react'
import {Context} from './context'
import roomsReducer from './reducer1'
import loginReducer from './reducer2'
import userReducer from './reducer3'
import FormLogIn from './FormLogIn'
import FormSignUp from './FormSignUp'
import FormChat from './FormChat'
import FormAddChat from './FormAddChat'
require('dotenv').config()
const url = `ws://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_PORT}`

export default function App() {
  const [forms, dispatchLogin] = useReducer(loginReducer, {login:'', signup:'hide', chat:'hide', addroom: 'hide', findedroom:'hide'})
  const [rooms, dispatchRooms] = useReducer(roomsReducer, '')
  const [currUser, dispatchCurrUser] = useReducer(userReducer, '')
  const [socket, setSocket] = useState(new WebSocket(url))
  
  useEffect(() => {
    socket.onopen = () => {
      console.log('APP client connected')
    }
  }, [])

  socket.onclose = () => {
    setSocket(new WebSocket(url))
  }

  return (
    <Context.Provider value={{dispatchLogin, dispatchRooms, dispatchCurrUser}}>
        <FormLogIn forms={forms}/>
        <FormSignUp forms={forms}/>
        <FormChat forms={forms} rooms={rooms} currUser={currUser} socket={socket}/>
        <FormAddChat forms={forms} currUser={currUser}/>
        {/* <FormFindedRooms forms={forms}/> */}
    </Context.Provider>
  );
}

