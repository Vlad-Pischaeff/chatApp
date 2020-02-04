import React, {useState, useContext, useRef, useEffect } from 'react'
import {Context} from './context'
import {fetchRoom, fetchMsgs} from './FormMiddleware'
import FormFindedRooms from './FormFindedRooms'
import FormChatRooms from './FormChatRooms'
import FormChatMessages from './FormChatMessages'
import MsgsNavBarBottom from './MsgsNavBarBottom'
import MsgsNavBarTop from './MsgsNavBarTop'

export default function FormChat({forms, rooms, messages, currUser, socket, currRoom, newMessages, dialog}) {
  const [roomName, setRoomName] = useState('')
  const [findedRooms, setFindedRooms] = useState('')
  const {dispatchLogin, dispatchMsgs, dispatchNewMessages, dispatchDialog} = useContext(Context)
  
  useEffect(() => {
    if (currRoom) {
      checkMessages(currRoom)
    }
  }, [])

  socket.onmessage = (evt) => {
    const message = JSON.parse(evt.data)
    let room = currRoom ? currRoom._id : 1

    if (message["Hi there, I am a WebSocket server"]) {
      console.log('"Hi there, I am a WebSocket server"')
    }
    
    if (message['SERVER: UPDATE ROOM'] === room) {
      checkMessages(currRoom)
    } else if (message['SERVER: UPDATE ROOM']) {
      // add rooms id with new messages
      let arr = [...newMessages, message['SERVER: UPDATE ROOM']]
      dispatchNewMessages({
        type: 'SET_NEW_MSGS',
        payload: arr
      })
    }

    if (message['SERVER: SENDED PRIV MSG']) {
      // console.log('SERVER: USER SENDED PRIV MSG', message)
      let arr = [...dialog, message['SERVER: SENDED PRIV MSG']]
      dispatchDialog({
        type: 'SET_NEW_DIALOG',
        payload: arr
      })
    }
  }

  const checkMessages = (room) => {
    let data = {
      room_id: room._id,
      method: 'check'
    }
    async function chkMsg() {
      try {
        let msgs = await fetchMsgs(data)
        dispatchMsgs({
          type: 'SET_CURRENT_MSGS',
          payload: msgs
        })
      } catch(e) {
        console.log('error', e)
      }
    }
    chkMsg()
  }

  const addRoom = () => {
    dispatchLogin({
      type: 'SHOW_ADDROOM',
      payload: ''
    })
  }

  const searchRoom = () => {
    if (roomName !== '') {
       const data = {
        owner: currUser._id,
        name: roomName,
        method: 'search'
      }
      async function search() {
        const rooms = await fetchRoom(data)
        setFindedRooms(rooms)
      }
      search()
      dispatchLogin({
        type: 'SHOW_FINDEDROOM',
        payload: ''
      })
    }
  }

  return (
    <div className={`row ${forms.chat}`} >
      <h4 className="center-align">My App</h4>
      <main className="card col s10 offset-s1 h-40rem" style={{padding: "0.5rem"}}>
        <section className="col s4 h-100">
          <section className="h-wrap">
            <div className="input-field w-100">
              <input id="icon_prefix" type="text" className="validate" 
                onChange = {event => setRoomName(event.target.value)} />
              <label htmlFor="icon_prefix">Search chatroom</label>
            </div>
            <i className="material-icons mrgn-03" onClick={searchRoom}>search</i>
            <i className="material-icons mrgn-03" onClick={addRoom}>library_add</i>
          </section>

          <FormChatRooms  rooms={rooms} 
                          currUser={currUser} 
                          currRoom={currRoom} 
                          newMessages={newMessages}/>

        </section>

        <section className="col s8 h-100 ">

          <MsgsNavBarTop currUser={currUser} 
                         currRoom={currRoom} />

          <FormChatMessages messages={messages} 
                            currUser={currUser} 
                            currRoom={currRoom} 
                            dialog={dialog} 
                            socket={socket} />

          <MsgsNavBarBottom messages={messages} 
                            currUser={currUser} 
                            currRoom={currRoom}
                            socket={socket} />
        </section>
      </main>

      <FormFindedRooms forms={forms} findedRooms={findedRooms} currUser={currUser}/>

    </div>
  )
}