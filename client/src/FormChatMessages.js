import React, {useState, useRef, useEffect, useContext} from 'react'
import {Context} from './context'
import MessagesThumb from './MessagesThumb'
var visavi_id = ''

export default function FormChatMessages({messages, currUser, currRoom, dialog, socket}) {
  const [size, setSize] = useState('size-0')
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [privMsg, setPrivMsg] = useState('')
  const [privMsgs, setPrivMsgs] = useState([])
  const d_input = useRef('')
  const refMSGS = useRef('')
  const {dispatchDialog} = useContext(Context)
  var inlineStyle = { top: top, left: left };

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
      setTop(c.top - 60 + window.pageYOffset)
      setLeft(c.left - 60)
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
    // refMSGS.current.scrollTo(0,20);
    // console.log('spisok', refMSGS.current.scrollTop, refMSGS.current.scrollHeight)
    return  <li key={n._id} onClick={(e) => showDialog(e, n)} >
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

  // console.log('spisok', refMSGS.current.offsetTop, refMSGS.current.id, refMSGS.current)
 
  return (
    <>
      <div  id="ul" ref={refMSGS}>
        <ul>
          {parsedMsgs}
        </ul>
      </div>

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
    </>
  )
}