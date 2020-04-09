import React, {useContext, useEffect} from 'react'
import {Context, useFormInput, useForms} from './context'
import {fetchRoom, fetchMsgs} from './FormMiddleware'
import FormFindedRooms from './FormFindedRooms'
import FormChatRooms from './FormChatRooms'
import FormChatMessages from './FormChatMessages'
import MsgsNavBarBottom from './MsgsNavBarBottom'
import MsgsNavBarTop from './MsgsNavBarTop'
let findedRooms = []

export default function FormChat({socket, newMessages, dialog}) {
  const {forms, rooms, currUser, currRoom, messages, setMessages, dispatchNewMessages, dispatchDialog} = useContext(Context)
  const form = useForms()
  const roomName = useFormInput('', false)

  useEffect(() => {
    if (currUser) {
      checkMessages(currRoom)
      console.log('check current room', currRoom, currUser)
    }
  }, [currUser, currRoom])

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
    fetchMsgs(data)
      .then(res => setMessages(res))
  }

  const h_BtnSearch_onClick = () => {
    if (roomName.value) {
      const data = {
        owner: currUser._id,
        name: roomName.value,
        method: 'search'
      }
      fetchRoom(data)
        .then(res => findedRooms = res)
        .then(form.openFindedRooms)
        .catch(e => console.log('search rooms', e))
    }
  }

  return (
    <div className={`row ${forms.chat}`} >
      <h4 className="center-align">My App</h4>
      <main className="card col s10 offset-s1 h-40rem" style={{padding: "0.5rem"}}>
        <section className="col s4 h-100">
          <section className="h-wrap">
            <div className="input-field w-100">
              <input id="icon_prefix" type="text" className="validate" {...roomName} />
              <label htmlFor="icon_prefix">Search chatroom</label>
            </div>
            <i className="material-icons mrgn-03" onClick={h_BtnSearch_onClick}>search</i>
            <i className="material-icons mrgn-03" onClick={form.openAddRoom}>library_add</i>
          </section>

          <FormChatRooms rooms={rooms} newMessages={newMessages}/>

        </section>

        <section className="col s8 h-100">

          <MsgsNavBarTop />

          <FormChatMessages messages={messages} 
                            currUser={currUser} 
                            currRoom={currRoom} 
                            dialog={dialog} 
                            socket={socket} />

          <MsgsNavBarBottom socket={socket} />
        </section>
      </main>

      <FormFindedRooms findedRooms={findedRooms} />

    </div>
  )
}