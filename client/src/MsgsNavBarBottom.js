import React, { useRef, useContext, useState, useEffect, useCallback } from 'react'
import {Context} from './context'
import {fetchMsgs} from './FormMiddleware'

export default function MsgsNavBarBottom() {
  const {setMessages, currRoom, currUser, messages, socket} = useContext(Context)
  const message = useMsgInput('', () => setIsReady(true))
  const [isReady, setIsReady] = useState(false)
  const imgRef = useRef('')

  useEffect(() => {
    if (message.value && isReady) {
      let data = {
        text: message.value,
        user_id: currUser._id,
        user_name: currUser.name,
        user_avatar: currUser.avatar,
        room_id: currRoom._id,
        method: 'add'
      }
      fetchMsgs(data)
        .then(res => { setMessages([...messages, res.msgs])
                       sendIO(res.msgs) }
              )
        .catch(e => console.log('messages error', e))
      message.onFocus()   // clear input field
      setIsReady(false)
    }
  }, [isReady])

  const sendIO = (msg) => {
    let req = JSON.stringify({'USER: SENDED MESSAGE': msg})
    socket.send(req)
  }

  const h_InputImage_onChange = () => {
    console.log('files', imgRef.current.files[0])
  }

  return (
    <section className="h-wrap">
      <div className="input-field w-90">
        <input id="text-input" type="text" className="validate" {...message} />
        <label htmlFor="text-input">Send message</label>
      </div>
      <i className="material-icons" onClick={() => setIsReady(true)}>send</i>

      <i className="material-icons" >
        <input id="file-input" hidden type="file" name="file" 
          onChange={h_InputImage_onChange} ref={imgRef} />
        <label htmlFor="file-input" className="hover" style={{'fontSize':'24px', 'color':'#000'}}>image</label>   
      </i>
    </section>
  )
}

function useMsgInput(initState, fn) {
  const [value, setValue] = useState(initState)

  const handleChange = useCallback(e => setValue(e.target.value))

  const handleKeyPress = useCallback(e => (e.key === 'Enter') && fn())

  const handleFocus = useCallback(() => setValue(''))

  return {
    value,
    onChange: handleChange,
    onKeyPress: handleKeyPress,
    onFocus: handleFocus
  }
}