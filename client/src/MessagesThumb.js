import React, {useState, useContext, useRef} from 'react'

export default function MessagesThumb ({msg, user, room}) {

  const attr = msg.user_id === user._id ? `my` : 'm'
  let d = new Date(msg.data)
  console.log('time', d.getHours())
  return (
    <section className={`${attr}-wrap`}>
      <img src={msg.user_avatar} />
      <span className={`${attr}-arrow`}></span>
      <article className={`${attr}-wrap-msg`}>
        <div className={`${attr}-time`}>
          <p>{msg.user_name}</p>
          <p>{msg.data}</p>
        </div>
        <div className={`${attr}-msg`}>
          <p>{msg.text}</p>
        </div>
      </article>
    </section> 
  )
}