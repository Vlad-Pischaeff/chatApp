import React, {useState, useContext, useEffect} from 'react'
import {Context} from './context'
import fetchRoom from './FormAddChatMiddleware'
import fetchMsgs from './FormAddMsgsMiddleware'
import ChatRoomThumb from './ChatRoomThumb'

export default function FormChatRooms({rooms, socket, currUser, currentRoom}) {
  const {dispatchRooms, dispatchMsgs, dispatchCurrRoom} = useContext(Context)
  const [unfollowedRoom, setUnfollowedRoom] = useState('')
  const [roommsg, setRoommsg] = useState([])

  useEffect(() => {
    checkMessages(currentRoom)
  }, [])

  socket.onmessage = evt => {
    const message = JSON.parse(evt.data)
    if (message['SERVER: UPDATE ROOM'] === currentRoom._id) {
      checkMessages(currentRoom)
    } else {
      let arr = [...roommsg, message['SERVER: UPDATE ROOM']]
      setRoommsg(arr)
    }
  }

  const chooseElement = (item) => {
    dispatchCurrRoom({
      type: 'SET_CURRENT_ROOM',
      payload: item
    })
    checkMessages(item)
    let arr = roommsg.filter(n => n !== item._id)
    setRoommsg(arr)
  }

  const checkMessages = (room) => {
    let data = {
      room_id: room._id,
      method: 'check'
    }
    async function chkMsg() {
      try {
        let msgs = await fetchMsgs(data)
        dispatchMsgs({
          type: 'SET_CURRENT_MSGS',
          payload: msgs
        })
      } catch(e) {
        console.log('error', e)
      }
    }
    chkMsg()
  }

  const showModal = (event, room) => {
    event.preventDefault()
    setUnfollowedRoom(room)
    if (room.owner.id !== currUser._id) {
      let elems = document.querySelectorAll('.modal');
      let instances = window.M.Modal.init(elems);
      instances[0].open();
    } 
  }
  
  const unfollowRoom = () => {
    let data = {
      id: unfollowedRoom._id,
      user_id: currUser._id,
      method: 'unfollow'
    }
    async function fetchAddRoom() {
      try {
        let rooms = await fetchRoom(data)
        dispatchRooms({
          type: 'GET_UPDATED_OWNER_ROOMS',
          payload: rooms
        })
      } catch(e) {
        console.log('error', e)
      }
    }
    fetchAddRoom()
  }

  const elements = [...rooms]
  const r_element = elements.map(n => {
    let selected = n._id === currentRoom._id ? 'r-wrap-selected' : ''
    return  <li key={n._id} onContextMenu={(e) => showModal(e, n)} onClick={() => chooseElement(n)}>
                <ChatRoomThumb room={n} bg={selected} currUser={currUser} roommsg={roommsg}/>
            </li>
  })

return (
  <>
    <ul>
      {r_element}
    </ul>

    {/* // <!-- Modal Structure --> */}
    <div id="modal1" className="modal">
      <div className="modal-content">
        <h4>Do you want to unsubscribe from...</h4>
        <p>{unfollowedRoom.name}</p>
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">
            No
        </a>
        <a href="#!" className="modal-close waves-effect waves-green btn-flat"
          onClick={unfollowRoom}>
            Agree
        </a>
      </div>
    </div>
    {/* // <!-- Modal Structure --> */}
  </>
  )
}
