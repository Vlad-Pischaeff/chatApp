import React, {useState, useRef, useContext } from 'react'
import {Context} from './context'
import fetchMsgs from './FormAddMsgsMiddleware'

export default function MsgsNavBarBottom({ messages, currUser, socket, currRoom }) {
  const [message, setMessage] = useState('')
  const { dispatchMsgs } = useContext(Context)
  const msg = useRef('')

  const sendIO = (message) => {
    let req = JSON.stringify({'USER: SENDED MESSAGE': message})
    socket.send(req)
  }

  const addMessage = () => {
    let data = {
      text: message,
      user_id: currUser._id,
      user_name: currUser.name,
      user_avatar: currUser.avatar,
      room_id: currRoom._id,
      method: 'add'
    }
    async function addMsg() {
      try {
        let msgs = await fetchMsgs(data)
        dispatchMsgs({
          type: 'SET_CURRENT_MSGS',
          payload: [...messages, msgs.msgs]
        })
        sendIO(msgs.msgs)
      } catch(e) {
        console.log('error', e)
      }
    }
    addMsg()
    msg.current.value = ''
    setMessage('')
  }

  const sendMessage = (e) => {
    if (e.key === 'Enter') {
      addMessage()
    }
  }

  return (
    <section className="h-wrap">
      <div className="input-field w-90">
        <input id="icon_prefix" type="text" className="validate" ref={msg}
          onChange = {(event) => setMessage(event.target.value)}
          onKeyPress = {sendMessage}/>
        <label htmlFor="icon_prefix">Send message</label>
      </div>
      <i className="material-icons prefix" onClick={addMessage}>send</i>
    </section>
  )
}