import React, {useState, useRef, useEffect, useContext} from 'react'
import {Context} from './context'
import MessagesThumb from './MessagesThumb'
var visavi_id = ''

export default function FormChatMessages({messages, currUser, currRoom, dialog, socket}) {
  const [size, setSize] = useState('size-0')
  const [position, setPosition] = useState({ top: 0, left:0 })
  const [privMsg, setPrivMsg] = useState('')
  const [privMsgs, setPrivMsgs] = useState([])
  const d_input = useRef('')
  const {dispatchDialog} = useContext(Context)
  var inlineStyle = { top: position.top, left: position.left };
  const li = useRef('')

  useEffect(() => {
    if (li.current) {
      li.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (li.current) {
      li.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    setPrivMsgs(dialog)
    if (dialog.length !== 0) {
      setSize('size-1')
      let last = [...dialog].pop()
      let from = last.from
      if ((from !== currUser._id)  &&  (from !== visavi_id)) {
        visavi_id = from
      }
    }
  }, [dialog])
  
  const showDialog = (event, msg) => {
    if (msg.user_id !== currUser._id) {
      let c = event.target.getBoundingClientRect()
      let y = c.top - 60 + window.pageYOffset
      let x = c.left - 60
      setPosition({ top: y, left: x })
      setSize('size-1')
      visavi_id = msg.user_id
    }
  }

  const sendPrivMsg = () => {
    let message = {}
    message.from = currUser._id
    message.from_name = currUser.name
    message.to = visavi_id
    message.text = privMsg
    message.data = Date.now()
    let req = JSON.stringify({'USER: SENDED PRIV MSG': message})
    socket.send(req)
    let arr = [...dialog, message]
    dispatchDialog({
      type: 'SET_NEW_DIALOG',
      payload: arr
    })
    d_input.current.value = ''
  }

  const sendPrivMsgByEnter = (e) => {
    if (e.key === 'Enter') {
      sendPrivMsg()
    }
  }

  const m_element = [...messages]
  const parsedMsgs = m_element.map(n => {
    return  <li key={n._id} onClick={(e) => showDialog(e, n)} className="m-li" ref={li}>
              <MessagesThumb msg={n} user={currUser} />
            </li>
  }) 
  
  const listDialog = privMsgs
    .map((n, i) => {
      let date = new Date(n.data)
      let padding = n.from !== currUser._id 
                    ? 'dv-padding' 
                    : 'dm-padding'
      let str = `${n.from_name} wrote at ${date.toLocaleString()}`
      
      return  <div key={`${i}`}>
                <span className={`d-span ${padding}`}>{str}</span>
                <p className={`d-p ${padding}`}><b>{n.text}</b></p>
              </div>
  })
  // console.log('chat messages')
  return (
    <section className="h-70 w-100 wrap-h">
      <section className="h-100 w-105 h-msgs">
        <ul className="m-ul">
          {parsedMsgs}
        </ul>

        <p className="curr-room-name">Current Room: <b>{currRoom ? currRoom.name : ''}</b></p>
        <div className={`d-wrap ${size}`} style={inlineStyle}>
          <header className="d-row">
            <div className="w-90"><b>Dialog</b></div>
            <i className="material-icons" onClick={() => setSize('size-0')}>close</i>
          </header>
          <section style={{overflowY: 'auto'}}>

            {listDialog}

          </section>
          <footer className="d-row">
            <input style={{height: '2rem', width: '90%'}} type="text"
              onChange={event => setPrivMsg(event.target.value)} ref={d_input}
              onKeyPress={sendPrivMsgByEnter}>
            </input>
            <i className="material-icons"
              onClick={sendPrivMsg}>send</i>
          </footer>
        </div>
      </section>
    </section>
  )
}