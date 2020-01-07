import React, {useState, useContext, useRef} from 'react'
import {Context} from './context'

export default function ChatRoomThumb({room}) {

  return (
    <div className="r-wrap">
      {/* <div className="r-img"><img src ="https://cdn.pixabay.com/photo/2019/11/14/08/44/documents-4625654_960_720.png"/></div> */}
      <div className="r-img"><img src ={room.avatar}/></div>
      <div className="r-name"><b>{room.name}</b></div>
      <div className="r-time grey-text text-darken-3">
        <span>12:03</span>
      </div>
      <div className="r-desc">{room.description}</div>
      <div className="r-users grey-text text-darken-3">
        <i className="tiny material-icons">assignment_ind</i>
        <span>275</span>
      </div>
      <div className="r-msgs green-text text-darken-3">
        <i className="tiny material-icons">send</i>
        <span>35</span>
      </div>
    </div>
  )
}