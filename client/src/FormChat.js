import React, {useState, useContext, useEffect, useRef} from 'react'
import {Context} from './context'
import ChatRoomThumb from './ChatRoomThumb'
import fetchRoom from './FormAddChatMiddleware'
import FormFindedRooms from './FormFindedRooms'

export default function FormChat({forms, rooms}) {
  const [roomName, setRoomName] = useState('')
  const [findedRooms, setFindedRooms] = useState('')
  const {dispatchLogin} = useContext(Context)

  const addRoom = () => {
    dispatchLogin({
      type: 'SHOW_ADDROOM',
      payload: ''
    })
  }

  const searchRoom = () => {
    if (roomName !== '') {
       const data = {
        owner: JSON.parse(localStorage.getItem('currentUser'))._id,
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

  const elements = [...rooms]
  const element = elements.map(n => {
    return  <li key={n._id}>
                <ChatRoomThumb room={n}/>
            </li>
  }) 

  return (
    <div className={`row ${forms.chat}`}>
      <h4 className="center-align">My App</h4>
      <main className="card col s10 offset-s1 h-40rem" style={{padding: "0.5rem"}}>
        <section className="col s4 orange lighten-5 h-100">
          <section className="h-wrap">
            <div className="input-field">
              <input id="icon_prefix" type="text" className="validate" 
                onChange = {event => setRoomName(event.target.value)} />
              <label htmlFor="icon_prefix">Search chatroom</label>
            </div>
            <i className="material-icons" onClick = {searchRoom}>search</i>
            <i className="material-icons" onClick = {addRoom}>library_add</i>
          </section>
          <div className="wrap h-85">
            <ul>
              {element}
            </ul>
          </div>
        </section>

        <section className="col s8 blue lighten-5 h-100 ">
          <section className="h-15 h-wrap">
            <div className="input-field col s12">
              <input id="icon_prefix" type="text" className="validate"/>
              <label htmlFor="icon_prefix">Search users</label>
            </div>
            <i className="material-icons">search</i>
          </section>
            <div className="divider"></div>
          <section className="h-75">chat field
            <ul>
              <li>one</li>
              <li>two</li>
              <li>three</li>
            </ul>
          </section>
            <div className="divider"></div>
          <section >
            <div className="input-field">
              <i className="material-icons prefix">send</i>
              <input id="icon_prefix" type="text" className="validate"/>
              <label htmlFor="icon_prefix">Send message</label>
            </div>
          </section>
        </section>
      </main>
      <FormFindedRooms forms={forms} findedRooms={findedRooms}/>
    </div>
  )
}