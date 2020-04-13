import React, {useContext, useRef, useEffect, useState} from 'react'
import {Context, useFormInput, useForms} from './context'
import {fetchRoom, fetchRoomAvatars} from './FormMiddleware'
import MapImages from './MapImages'
let chatroom = { avatar:'' }
let roomavatars = []
let roomNodes = []

export default function FormAddChat() {
  const {forms, currUser} = useContext(Context)
  const roomName = useFormInput('', false)
  const roomDesc = useFormInput('', false)
  const [isCorrect, setIsCorrect] = useState(false)
  const form = useForms()
  const alertRef = useRef('')

  useEffect(() => {
    fetchRoomAvatars().then(resp => roomavatars = resp)
    roomNodes = document.querySelector('.roomImages').childNodes
  }, [])

  useEffect(() => {
    if (roomName.value && roomDesc.value) {
      setIsCorrect(true)
      alertRef.current.innerHTML = ''
    } 
  }, [roomName.value, roomDesc.value])

  const h_BtnAdd_onClick = () => {
    if (isCorrect) {
      let data = {
        name: roomName.value,
        description: roomDesc.value,
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
            form.getAddedUserRooms(res.rooms)
            h_BtnClose_onClick()
          }
        })
    } else {
      alertRef.current.innerHTML = 'Please fill required fields'
    }
  }

  const h_BtnClose_onClick = () => {
    form.hideAddRoom()
    roomName.onFocus()    // clear value
    roomDesc.onFocus()    // clear value
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
              <input id="roomname" type="text" data-length="20" name="name"
                {...roomName} />
              <label htmlFor="roomname">ChatRoom name</label>
            </section>

            <section className="input-field col s12">
              <input id="roomdesc" type="text" data-length="40" name="description"
                {...roomDesc} />
              <label htmlFor="roomdesc">ChatRoom description</label>
            </section>

            <section className="col s12">
              <div className="add-card-wrap-img roomImages">
                <MapImages nodes={roomNodes} avatars={roomavatars} value={chatroom} item="room" />
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
