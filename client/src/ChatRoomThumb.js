import React, {useState, useContext, useRef} from 'react'
import {Context} from './context'

export default function ChatRoomThumb({forms}) {

  return (
    <div className="chatroom">

      <div className="roomimg"><img src ="https://cdn.pixabay.com/photo/2019/11/14/08/44/documents-4625654_960_720.png"/></div>
      
      <div className="roomname"><b>My first room for testing</b></div>
      
      <div className="roomtime grey-text text-darken-3">
        <span>12:03</span>
      </div>
      
      <div className="roomdesc">
        <p>chat for some things and for testing descriptions adggsg fhd fggfdf ghjh gghk ad fddfg df sdfg gfds</p>
      </div>

      <div className="roomusers grey-text text-darken-3">
        <i className="tiny material-icons">assignment_ind</i>
        <span>275</span>
      </div>

      <div className="roommsgs green-text text-darken-3">
        <i className="tiny material-icons">send</i>
        <span>35</span>
      </div>

    </div>
  )
}