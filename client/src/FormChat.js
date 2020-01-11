import React, {useState, useContext, useEffect, useRef} from 'react'
import {Context} from './context'
import ChatRoomThumb from './ChatRoomThumb'
import fetchRoom from './FormAddChatMiddleware'
import FormFindedRooms from './FormFindedRooms'

export default function FormChat({forms, rooms, currUser}) {
  const [roomName, setRoomName] = useState('')
  const [findedRooms, setFindedRooms] = useState('')
  const [unfollowedRoom, setUnfollowedRoom] = useState('')
  const [currentRoom, setCurrentRoom] = useState(JSON.parse(localStorage.getItem('currentRoom')) || '')
  const {dispatchLogin, dispatchRooms} = useContext(Context)
  const modalUnfollow = useRef('')

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
      let rooms = await fetchRoom(data)
      dispatchRooms({
          type: 'GET_UPDATED_OWNER_ROOMS',
          payload: rooms
      })
    }

    try {
      fetchAddRoom()
    } catch(err) {
      console.log(err)
    }
  }

  const showModal = (event, room) => {
    event.preventDefault()
    setUnfollowedRoom(room)
    if (room.owner.id !== currUser._id) {
      let elems = document.querySelectorAll('.modal');
      // console.log('modal --', elems, modalUnfollow)
      let instances = window.M.Modal.init(elems);
      instances[0].open();
    } 
  }

  const chooseElement = (item) => {
    localStorage.setItem('currentRoom', JSON.stringify(item))
    setCurrentRoom(item)
  }

  const elements = [...rooms]
  const element = elements.map(n => {
    let sel = n._id === currentRoom._id ? 'r-wrap-selected' : ''
    return  <li key={n._id} onContextMenu={(e) => showModal(e, n)} onClick={() => chooseElement(n)}>
                <ChatRoomThumb room={n} bg={n.owner.id === currUser._id 
                                          ? `r-wrap-bg-owner ${sel}` 
                                          : `r-wrap-bg-follow ${sel}`} />
            </li>
  }) 
 
  return (
    <div className={`row ${forms.chat}`}>
      <h4 className="center-align">My App</h4>
      <main className="card col s10 offset-s1 h-40rem" style={{padding: "0.5rem"}}>
        {/* <section className="col s4 orange lighten-5 h-100"> */}
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
              {element}
            </ul>
          </section>
        </section>

        <article className="col s8 blue lighten-5 h-100 ">
          <section className="h-15 h-wrap">
            <div className="input-field col s12">
              <input id="icon_prefix" type="text" className="validate"/>
              <label htmlFor="icon_prefix">Search users</label>
            </div>
            <i className="material-icons">search</i>
            <img className="user-avatar" src={currUser.avatar} />
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