import React, {useContext, useRef, useEffect} from 'react'
import {Context} from './context'
import {fetchRoom, fetchRoomAvatars} from './FormMiddleware'
import MapRoomAvatars from './MapRoomAvatars'
let chatroom = { name:'', description:'', avatar:'' }
let roomavatars = []

export default function FormAddChat({forms, currUser}) {
  const {dispatchLogin,dispatchRooms} = useContext(Context)
  const nameRef = useRef('')
  const descriptionRef = useRef('')
  const alertRef = useRef('')

  useEffect(() => {
    fetchRoomAvatars().then(resp => roomavatars = resp)
  }, [])

  const h_BtnAdd_onClick = () => {
    if ((chatroom.name.length === 0) || (chatroom.description.length === 0)) {
      alertRef.current.innerHTML = 'Please fill required fields'
    } else {
      alertRef.current.innerHTML = ''

      let data = {
        name: chatroom.name,
        description: chatroom.description,
        avatar: chatroom.avatar,
        owner: {
          id: currUser._id,
          name: currUser.name
        },
        method: 'add'
      }

      fetchRoom(data)
        .then(res => {
          if (!res.error) {
            dispatchRooms({
              type: 'GET_ADDED_OWNER_ROOMS',
              payload: res.rooms
            })
          h_BtnClose_onClick()
          }
        })
    }
  }

  const h_BtnClose_onClick = () => {
    dispatchLogin({
      type: 'HIDE_ADDROOM',
      payload: ''
    })
    chatroom.name = ''
    chatroom.description = ''
    nameRef.current.value = null
    descriptionRef.current.value = null
    nameRef.current.focus();
    descriptionRef.current.focus();
  }

  const h_Input_onChange = (event) => {
    chatroom[event.target.name] = event.target.value
  }

  return (
    <div className={`add-card-modal-bg ${forms.addroom}`}>
      <div className="container row">
        <h4 className="center-align">&nbsp;</h4>

        <form className="col s6 offset-s3 card">
          <main className="card-content">
            
            <span className="card-title center-align">Enter Your new chat room credentials</span>
            <div className="add-card-close" onClick={h_BtnClose_onClick}></div>

            <section className="input-field col s12">
              <input id="roomname" type="text" data-length="20" ref={nameRef} name="name"
                onChange = {h_Input_onChange}
                onFocus = {() => alertRef.current.innerHTML = ''} />
              <label htmlFor="roomname">ChatRoom name</label>
            </section>

            <section className="input-field col s12">
              <input id="roomdesc" type="text" data-length="40" ref={descriptionRef} name="description"
                onChange = {h_Input_onChange}
                onFocus = {() => alertRef.current.innerHTML = ''} />
              <label htmlFor="roomdesc">ChatRoom description</label>
            </section>

            <section className="col s12">
              <div className="add-card-wrap-img">
                <MapRoomAvatars chatroom={chatroom} roomavatars={roomavatars} />
              </div>
            </section>

            <footer className="card-action col s12 center-align" style={{marginBottom: "1rem"}}>
              <a href="#!" className="waves-effect waves-light btn-large" 
                onClick = {h_BtnAdd_onClick}> Add room </a>
            </footer>

          </main>

          <div className="card-action col s12">
            <p className="center-align red-text" ref={alertRef}></p>
          </div>

        </form>
      </div>
    </div>
  )
}
