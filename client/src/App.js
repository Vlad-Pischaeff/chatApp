import React, {useReducer, useEffect, useState} from 'react'
import {Context} from './context'
import {fetchMsgs} from './FormMiddleware'
import roomsReducer from './reducer1'
import loginReducer from './reducer2'
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
  const [messages, setMessages] = useState('')
  const [dialog, setDialog] = useState([])
  const [newMessages, setNewMessages] = useState([])
  const [currUser, setCurrUser] = useState({})
  const [currRoom, setCurrRoom] = useState(JSON.parse(localStorage.getItem('currentRoom')) || {})
  
  useEffect(() => {
    socket.onopen = () => {
      console.log('APP client connected ... ', url, socket)
    }
  }, [])

  useEffect(() => {
      checkMessages(currRoom)
  }, [currRoom])

  const checkMessages = (room) => {
    let data = {
      room_id: room._id,
      method: 'check'
    }
    fetchMsgs(data)
      .then(res => setMessages(res))
  }

  socket.onclose = () => {
    socket = new WebSocket(url)
  }

  socket.onmessage = (evt) => {
    const message = JSON.parse(evt.data)
    let room = currRoom ? currRoom._id : 1

    if (message["Hi there, I am a WebSocket server"]) {
      console.log('WebSocket server is online...')
    }
    
    if (message['SERVER: UPDATE ROOM'] === room) {
      checkMessages(currRoom)
    } else if (message['SERVER: UPDATE ROOM']) {
      // add rooms id with new messages
      let arr = [...newMessages, message['SERVER: UPDATE ROOM']]
      setNewMessages(arr)
    }

    if (message['SERVER: SENDED PRIV MSG']) {
      // console.log('SERVER: USER SENDED PRIV MSG', message)
      let arr = [...dialog, message['SERVER: SENDED PRIV MSG']]
      setDialog(arr)
    }
  }

  return (
    <Context.Provider value={{ forms, rooms, currUser, currRoom, messages, newMessages, socket, dialog,
                              setMessages,
                              setNewMessages,
                              setCurrUser,
                              setCurrRoom, 
                              dispatchLogin, 
                              dispatchRooms, 
                              setDialog }}>
      <FormLogIn />
      <FormSignUp />
      <FormChat />
      <FormAddChat />
    </Context.Provider>
  );
}