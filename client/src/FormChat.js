import React, {useState, useContext, useRef, useEffect} from 'react'
import {Context} from './context'
import fetchRoom from './FormAddChatMiddleware'
import fetchMsgs from './FormAddMsgsMiddleware'
import FormFindedRooms from './FormFindedRooms'
import FormChatRooms from './FormChatRooms'
import FormChatMessages from './FormChatMessages'

export default function FormChat({forms, rooms, messages, currUser, socket, currRoom, newMessages, dialog}) {
  const [roomName, setRoomName] = useState('')
  const [findedRooms, setFindedRooms] = useState('')
  const [message, setMessage] = useState('')
  const {dispatchLogin, dispatchMsgs, dispatchNewMessages, dispatchDialog} = useContext(Context)
  const msg = useRef('')

  useEffect(() => {
    checkMessages(currRoom)
  }, [])

  socket.onmessage = (evt) => {
    const message = JSON.parse(evt.data)
    if (message['SERVER: UPDATE ROOM'] === currRoom._id) {
      checkMessages(currRoom)
    } else {
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

  const sendIO = (message) => {
    let req = JSON.stringify({'USER: SENDED MESSAGE': message})
    socket.send(req)
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

  const addMessage = () => {
    let data = {
      text: message,
      user_id: currUser._id,
      user_name: currUser.name,
      user_avatar: currUser.avatar,
      room_id: currRoom._id,
      method: 'add'
    }
    async function addMsg() {
      try {
        let msgs = await fetchMsgs(data)
        dispatchMsgs({
          type: 'SET_CURRENT_MSGS',
          payload: [...messages, msgs.msgs]
        })
        sendIO(msgs.msgs)
      } catch(e) {
        console.log('error', e)
      }
    }
    addMsg()
    msg.current.value = ''
    setMessage('')
  }

  const sendMessage = (e) => {
    if (e.key === 'Enter') {
      addMessage()
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
          <section className="wrap h-85 h-msgs">
            <FormChatRooms  rooms={rooms} 
                            currUser={currUser} 
                            currRoom={currRoom} 
                            newMessages={newMessages}/>
          </section>
        </section>

        <article className="col s8 h-100 ">
          <section className="h-15 h-wrap">
            <div className="input-field w-100">
              <input id="icon_prefix" type="text" className="validate"/>
              <label htmlFor="icon_prefix">Search users</label>
            </div>
            <i className="material-icons mrgn-03">search</i>
            <img className="user-avatar" src={currRoom.avatar} alt="current room" />
            <img className="user-avatar" src={currUser.avatar} alt="current user" />
          </section>
            
          <section className="h-70 h-msgs">
            <FormChatMessages messages={messages} 
                              currUser={currUser} 
                              currRoom={currRoom} 
                              dialog={dialog} 
                              socket={socket}/>
          </section>

          <section className="h-wrap">
            <div className="input-field w-90">
              <input id="icon_prefix" type="text" className="validate" ref={msg}
                onChange = {(event) => setMessage(event.target.value)}
                onKeyPress = {sendMessage}/>
              <label htmlFor="icon_prefix">Send message</label>
            </div>
            <i className="material-icons prefix" onClick={addMessage}>send</i>
          </section>
        </article>
      </main>

      <FormFindedRooms forms={forms} findedRooms={findedRooms} currUser={currUser}/>

    </div>
  )
}