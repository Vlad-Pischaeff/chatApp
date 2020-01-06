import React, {useState, useContext, useRef, useEffect} from 'react'
import {Context} from './context'
import fetchData from './FormAddChatMiddleware'

export default function FormAddChat({forms}) {
  const [roomName, setRoomName] = useState('')
  const [roomDescription, setRoomDescription] = useState('')
  const [roomAvatar, setRoomAvatar] = useState('')
  const [avatars, setAvatars] = useState([])
  const [avatarClass, setAvatarClass] = useState([])
  const {dispatchLogin} = useContext(Context)
  const nameRef = useRef('')
  const descriptionRef = useRef('')
  const alertRef = useRef('')

  useEffect(() => {
    const url = 'http://localhost:3001/api/roomimg';
    async function fetchGet() {
      const response = await fetch(url);
      const json = await response.json();
      setAvatars(json);
    }
    fetchGet();
  }, [])

  const addRoom = () => {
    if ((roomName.length === 0) || (roomDescription.length === 0)) {
      alertRef.current.innerHTML = 'Please fill required fields'
    } else {
      alertRef.current.innerHTML = ''
      let data = {
        name: roomName,
        description: roomDescription,
        avatar: `./img/room/${roomAvatar}`,
        method: 'add'
      }

      async function fetchAddRoom() {
        let rooms = await fetchData(data)
        if (!rooms.error) {
          closeDialog()
        }
      }

      try {
        fetchAddRoom()
      } catch(err) {
        console.log(err)
      }
    }
  }

  const closeDialog = () => {
    dispatchLogin({
      type: 'HIDE_ADDROOM',
      payload: ''
    })
    setRoomName('')
    setRoomDescription('')
    setRoomAvatar('')
    setAvatarClass([])    
    nameRef.current.value = null
    descriptionRef.current.value = null
    nameRef.current.focus();
    descriptionRef.current.focus();
  }

  const setClass = (n, index) => {
    setRoomAvatar(n)
    setAvatarClass(avatars.map((n, i) => {
        return i === index ? 'border' : ''
      }))
  }

  const avatarsMap = avatars.map((n, i) => {
    return  <div key={`${i}`} id={`roomavatar${i}`}  
              onClick={() => setClass(n, i)}>
              <img src={`./img/room/${n}`} className={`${avatarClass[i]}`}/>
            </div>
  })

  // console.log('avatar', roomAvatar, avatarClass, roomName, roomDescription);

  return (
    <div className={`add-card-modal-bg ${forms.addroom}`}>
      <div className="container">
        <div className="row">
          <h4 className="center-align">&nbsp;</h4>

          <form className="col s6 offset-s3 card">
            <div className="card-content">
              
              <span className="card-title center-align">Enter Your new chat room credentials</span>
              
              <div className="add-card-close" onClick={closeDialog}></div>

              <div className="input-field col s12">
                <input id="roomname" type="text" data-length="20" ref={nameRef}
                  onChange = {event => setRoomName(event.target.value)}
                  onFocus = {() => alertRef.current.innerHTML = ''} />
                <label htmlFor="roomname">ChatRoom name</label>
              </div>

              <div className="input-field col s12">
                <input type="text" id="roomdesc" className="validate" data-length="40" ref={descriptionRef}
                  onChange = {event => setRoomDescription(event.target.value)}
                  onFocus = {() => alertRef.current.innerHTML = ''} />
                <label htmlFor="roomdesc">ChatRoom description</label>
              </div>

              <div className="col s12">
                <div className="add-card-wrap-img">
                  {avatarsMap}
                </div>
              </div>

              <div className="card-action col s12 center-align" style={{marginBottom: "1rem"}}>
                <a className="waves-effect waves-light btn-large" 
                  onClick = {addRoom}>
                  Add room
                </a>
              </div>

            </div>

            <div className="card-action col s12">
              <p className="center-align red-text" ref={alertRef}></p>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
