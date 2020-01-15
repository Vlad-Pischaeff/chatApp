import React, {useState, useContext, useRef} from 'react'

export default function MessagesThumb ({msg, user, room}) {

  const attr = msg.user_id === user._id ? `my` : 'm'
  
  return (
    <section className={`${attr}-wrap`}>
      <div>
        <img src={msg.user_avatar} />
      </div>
      <article className={`${attr}-wrap-msg`}>
        <div className={`${attr}-time`}>
          <p>{msg.data}</p>
        </div>
        <div className={`${attr}-msg`}>
          <p>{msg.text}</p>
        </div>
      </article>
    </section>  
  )
}