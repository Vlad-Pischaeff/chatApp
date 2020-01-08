import React, {useState, useContext, useRef, useEffect} from 'react'
import {Context} from './context'
import ChatRoomThumb from './ChatRoomThumb'

export default function FormFindedRooms({forms, findedRooms}) {
  const {dispatchLogin} = useContext(Context)

  const closeDialog = () => {
    dispatchLogin({
      type: 'HIDE_FINDEDROOM',
      payload: ''
    })
  }
  
  // console.log('findedRooms', findedRooms)

  const elements = [...findedRooms]
  const element = elements.map(n => {
    return  <li key={n._id}>
                <ChatRoomThumb room={n}/>
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
              {element}
            </section>
    
            <footer className="card-action col s12 center-align" style={{"marginBottom": "1rem"}}>
              <a className="waves-effect waves-light btn-large" >
                Sign up
              </a>
            </footer>
            
          </main>
        </form>

      </div>
    </div>
  )
}
