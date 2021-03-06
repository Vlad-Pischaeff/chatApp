import React, {useState, useContext} from 'react'
import {Context, useForms} from './context'
import ChatRoomThumb from './ChatRoomThumb'
import {fetchRoom} from './FormMiddleware'

export default function FormFindedRooms({findedRooms}) {
  const {forms, currUser} = useContext(Context)
  const [followedRooms, setFollowedRooms] = useState([])
  const form = useForms()
 
  const closeDialog = () => {
    form.hideFindedRooms()
    setFollowedRooms([])
  }
  
  const addToRooms = (user) => {
    if (followedRooms.indexOf(user) === -1 ) {
      setFollowedRooms([...followedRooms, user])
    } else {
      setFollowedRooms(followedRooms.filter(n => n !== user))
    }
  }

  const h_BtnFollow_onClick = () => {
    let data = {
      id: followedRooms,
      user_id: currUser._id,
      method: 'follow'
    }
    fetchRoom(data)
      .then(res => form.getUpdatedUserRooms(res))
    closeDialog()
  }

  const elements = [...findedRooms]

  const element = elements.map(n => {
    let bg = (followedRooms.indexOf(n._id) === -1) 
              ? 'r-wrap' 
              : 'r-wrap r-wrap-bg'
  
    return  <li key={n._id} onClick={() => addToRooms(n._id)} >
                <ChatRoomThumb room={n} bg={bg} currUser={currUser} roommsg={[]}/>
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
              <a href="#!" className="waves-effect waves-light btn-large" onClick={h_BtnFollow_onClick} >
                Follow
              </a>
            </footer>
            
          </main>
        </form>

      </div>
    </div>
  )
}
