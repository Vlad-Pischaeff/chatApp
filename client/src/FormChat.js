import React, {useState, useContext, useEffect, useRef} from 'react'
import socketIOClient from "socket.io-client"
import {Context} from './context'
import ChatRoomThumb from './ChatRoomThumb'
import MessagesThumb from './MessagesThumb'
import fetchRoom from './FormAddChatMiddleware'
import fetchMsgs from './FormAddMsgsMiddleware'
import FormFindedRooms from './FormFindedRooms'

export default function FormChat({forms, rooms, currUser}) {
  const [roomName, setRoomName] = useState('')
  const [findedRooms, setFindedRooms] = useState('')
  const [unfollowedRoom, setUnfollowedRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState('')
  const [currentRoom, setCurrentRoom] = useState(JSON.parse(localStorage.getItem('currentRoom')) || '')
  const {dispatchLogin, dispatchRooms} = useContext(Context)
  const modalUnfollow = useRef('')
  const msg = useRef('')
  const socket = socketIOClient("http://localhost:3001")

  useEffect(() => {
    checkMessages(currentRoom)
  }, [])

  socket.on('SERVER: UPDATE ROOM', function (data) {
    if (data.room_id === currentRoom._id) checkMessages(currentRoom)
  });

  const sendIO = (message) => {
    socket.emit('USER: SENDED MESSAGE', message)
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
  
  const unfollowRoom = () => {
    let data = {
      id: unfollowedRoom._id,
      user_id: currUser._id,
      method: 'unfollow'
    }
    async function fetchAddRoom() {
      try {
        let rooms = await fetchRoom(data)
        dispatchRooms({
          type: 'GET_UPDATED_OWNER_ROOMS',
          payload: rooms
        })
      } catch(e) {
        console.log('error', e)
      }
    }
    fetchAddRoom()
  }

  const showModal = (event, room) => {
    event.preventDefault()
    setUnfollowedRoom(room)
    if (room.owner.id !== currUser._id) {
      let elems = document.querySelectorAll('.modal');
      let instances = window.M.Modal.init(elems);
      instances[0].open();
    } 
  }

  const chooseElement = (item) => {
    localStorage.setItem('currentRoom', JSON.stringify(item))
    setCurrentRoom(item)
    checkMessages(item)
  }

  const addMessage = () => {
    let data = {
      text: message,
      user_id: currUser._id,
      user_name: currUser.name,
      user_avatar: currUser.avatar,
      room_id: currentRoom._id,
      method: 'add'
    }
    async function addMsg() {
      try {
        let msgs = await fetchMsgs(data)
        setMessages([...messages, msgs.msgs])
        sendIO(msgs.msgs)
      } catch(e) {
        console.log('error', e)
      }
    }
    addMsg()
    msg.current.value = ''
  }

  const sendMessage = (e) => {
    if (e.key === 'Enter') {
      addMessage()
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
        setMessages(msgs)
      } catch(e) {
        console.log('error', e)
      }
    }
    chkMsg()
  }

  const elements = [...rooms]
  const r_element = elements.map(n => {
    let selected = n._id === currentRoom._id ? 'r-wrap-selected' : ''
    return  <li key={n._id} onContextMenu={(e) => showModal(e, n)} onClick={() => chooseElement(n)}>
                <ChatRoomThumb room={n} bg={selected} currUser={currUser}/>
            </li>
  })
  const m_element = [...messages]
  const parsedMsgs = m_element.map(n => {
    return  <li key={n._id}><MessagesThumb msg={n} user={currUser} room={currentRoom}/></li>
  }) 
 
  return (
    <div className={`row ${forms.chat}`}>
      <h4 className="center-align">My App</h4>
      <main className="card col s10 offset-s1 h-40rem" style={{padding: "0.5rem"}}>
        <section className="col s4 h-100">
          <section className="h-wrap">
            <div className="input-field">
              <input id="icon_prefix" type="text" className="validate" 
                onChange = {event => setRoomName(event.target.value)} />
              <label htmlFor="icon_prefix">Search chatroom</label>
            </div>
            <i className="material-icons" onClick={searchRoom}>search</i>
            <i className="material-icons" onClick={addRoom}>library_add</i>
          </section>
          <section className="wrap h-85">
            <ul>
              {r_element}
            </ul>
          </section>
        </section>

        <article className="col s8 h-100 ">
          <section className="h-15 h-wrap">
            <div className="input-field col s12">
              <input id="icon_prefix" type="text" className="validate"/>
              <label htmlFor="icon_prefix">Search users</label>
            </div>
            <i className="material-icons">search</i>
            <img className="user-avatar" src={currUser.avatar} />
          </section>
            
          <section className="h-70 h-msgs">
            <ul>
              {parsedMsgs}
            </ul>
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

      {/* <!-- Modal Structure --> */}
      <div id="modal1" className="modal" ref={modalUnfollow}>
        <div className="modal-content">
          <h4>Do you want to unsubscribe from...</h4>
          <p>{unfollowedRoom.name}</p>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">
              No
          </a>
          <a href="#!" className="modal-close waves-effect waves-green btn-flat"
            onClick={unfollowRoom}>
              Agree
          </a>
        </div>
      </div>
      {/* <!-- Modal Structure --> */}
    </div>
  )
}