import React, {useState, useContext, useRef} from 'react'

export default function ChatRoomThumb({room, bg, currUser, roommsg}) {

  const attr = room.owner.id === currUser._id 
                              ? `r-wrap r-wrap-bg-owner ${bg}` 
                              : `r-wrap r-wrap-bg-follow ${bg}`  
  const users = room.followers.length
  // console.log('srvroom', roommsg)
  let cnt = 'hide'
  let count = 0
  let msg = 'tiny material-icons hide'
  if ((roommsg.indexOf(room._id) !== -1) && (bg !== 'r-wrap-selected')) {
    msg = 'tiny material-icons'
    let arr = roommsg.filter(n => n === room._id)
    count = arr.length
    cnt = ''
  }

  return (
    <div className={attr}>
      <div className="r-img"><img src ={room.avatar}/></div>
      <div className="r-name"><b>{room.name}</b></div>
      <div className="r-time grey-text text-darken-3">
        <span>12:03</span>
      </div>
      <div className="r-desc">{room.description}</div>
      <div className="r-users grey-text text-darken-3">
        <i className="tiny material-icons">people</i>
        <span>{users}</span>
      </div>
      <div className="r-msgs green-text text-darken-3">
        <i className={msg}>send</i>
        <span className={cnt}>{count}</span>
      </div>
    </div>
  )
}