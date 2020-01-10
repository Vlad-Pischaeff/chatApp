import React, {useState, useContext, useRef, useEffect} from 'react'
import {Context} from './context'
import ChatRoomThumb from './ChatRoomThumb'
import fetchRoom from './FormAddChatMiddleware'

export default function FormFindedRooms({forms, findedRooms}) {
  const {dispatchLogin, dispatchRooms} = useContext(Context)
  const [followedRooms, setFollowedRooms] = useState([])

  const closeDialog = () => {
    dispatchLogin({
      type: 'HIDE_FINDEDROOM',
      payload: ''
    })
    setFollowedRooms([])
  }
  
  const addToRooms = (user) => {
    if (followedRooms.indexOf(user) === -1 ) {
      setFollowedRooms([...followedRooms, user])
    } else {
      setFollowedRooms(followedRooms.filter(n => n !== user))
    }
  }

  const followRoom = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'))

    async function fetchFollowRoom() {
      let data = {
        id: followedRooms,
        user_id: user._id,
        method: 'follow'
      }
      let rooms = await fetchRoom(data)
      // console.log('updated followed rooms', rooms)
      dispatchRooms({
        type: 'GET_UPDATED_OWNER_ROOMS',
        payload: rooms
      })
    }

    // async function updateRooms() {
    //   let data = {
    //     id: user._id,
    //     method: 'check'
    //   }
    //   let rooms = await fetchRoom(data)
    //   console.log('updated rooms', rooms)
    //   dispatchRooms({
    //     type: 'GET_UPDATED_OWNER_ROOMS',
    //     payload: rooms
    //   })
    // }

    try {
      fetchFollowRoom()
      // updateRooms()
    } catch(err) {
      console.log(err)
    }

    closeDialog()
  }

  const elements = [...findedRooms]

  const element = elements.map(n => {
    let bg = (followedRooms.indexOf(n._id) === -1 ) 
              ? 'r-wrap' 
              : 'r-wrap r-wrap-bg'
  
    return  <li key={n._id} onClick={() => addToRooms(n._id)} >
                <ChatRoomThumb room={n} bg={bg}/>
            </li>
  })

  return (
    <div className={`add-card-modal-bg ${forms.findedroom}`}>
      <div className="container row">
        <h4 className="center-align">&nbsp;</h4>
    
        <form className="col s8 offset-s2 card">
          <main className="card-content">
            
            <span className="card-title center-align">Please select rooms</span>
            <div className="add-card-close" onClick={closeDialog}></div>
            
            <section className="add-room-wrap">
              <ul> {element} </ul>
            </section>
    
            <footer className="card-action col s12 center-align" style={{"marginBottom": "1rem"}}>
              <a className="waves-effect waves-light btn-large" onClick={followRoom} >
                Follow
              </a>
            </footer>
            
          </main>
        </form>

      </div>
    </div>
  )
}