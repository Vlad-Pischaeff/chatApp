import React, {useContext} from 'react'
import {Context} from './context'

export default function ChatRoomThumb({room, bg}) {
  const {currUser, newMessages} = useContext(Context)

  const attr = room.owner.id === currUser._id 
                              ? `r-wrap r-wrap-bg-owner ${bg}` 
                              : `r-wrap r-wrap-bg-follow ${bg}`  
  const users = room.followers.length

  let hidden = 'hide'
  let count = 0
  if ((newMessages.indexOf(room._id) !== -1) && (bg !== 'r-wrap-selected')) {
    count = newMessages.filter(n => n === room._id).length
    hidden = ''
  }

  return (
    <div className={attr}>
      <div className="r-img"><img src ={room.avatar} alt={room.avatar} /></div>
      <div className="r-name"><b>{room.name}</b></div>
      <div className="r-time grey-text text-darken-3">
        <span></span>
      </div>
      <div className="r-desc">{room.description}</div>
      <div className="r-users grey-text text-darken-3">
        <i className="tiny material-icons">people</i>
        <span>{users}</span>
      </div>
      <div className="r-msgs green-text text-darken-3 blink">
        <i className={`tiny material-icons ${hidden}`}>send</i>
        <span className={hidden}>{count}</span>
      </div>
    </div>
  )
}