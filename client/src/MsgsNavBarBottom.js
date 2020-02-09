import React, { useRef, useContext } from 'react'
import {Context} from './context'
import {fetchMsgs} from './FormMiddleware'
let message = ''

export default function MsgsNavBarBottom({ messages, currUser, socket, currRoom }) {
  const { dispatchMsgs } = useContext(Context)
  const msgRef = useRef('')
  const imgRef = useRef('')

  const sendIO = (message) => {
    let req = JSON.stringify({'USER: SENDED MESSAGE': message})
    socket.send(req)
  }

  const h_BtnSend_onClick = () => {
    if (message) {
      let data = {
        text: message,
        user_id: currUser._id,
        user_name: currUser.name,
        user_avatar: currUser.avatar,
        room_id: currRoom._id,
        method: 'add'
      }
      fetchMsgs(data)
        .then(res => {  dispatchMsgs({
                          type: 'SET_CURRENT_MSGS',
                          payload: [...messages, res.msgs]
                        })
                        sendIO(res.msgs)
                      }
              )
      msgRef.current.value = ''
      message = ''
    }
  }

  const h_Input_onKeyPress = (e) => {
    if (e.key === 'Enter') {
      h_BtnSend_onClick()
    }
  }

  const h_Input_onChange = (event) => {
    message = event.target.value
  }

  const h_InputImage_onChange = () => {
    console.log('files', imgRef.current.files[0])
  }

  return (
    <section className="h-wrap">
      <div className="input-field w-90">
        <input id="icon_prefix" type="text" className="validate" ref={msgRef}
          onChange = {h_Input_onChange}
          onKeyPress = {h_Input_onKeyPress}/>
        <label htmlFor="icon_prefix">Send message</label>
      </div>
      <i className="material-icons" onClick={h_BtnSend_onClick}>send</i>

      <i className="material-icons" >
        <input id="file-input" hidden type="file" name="file" 
          onChange={h_InputImage_onChange} ref={imgRef} />
        <label htmlFor="file-input" className="hover" style={{'fontSize':'24px', 'color':'#000'}}>image</label>   
      </i>
    </section>
  )
}