import React, {useState, useContext} from 'react'
import {Context, useForms} from './context'
import {fetchRoom, fetchMsgs} from './FormMiddleware'
import ChatRoomThumb from './ChatRoomThumb'

export default function FormChatRooms() {
  const {rooms, currUser, currRoom, setCurrRoom, setMessages, newMessages, setNewMessages} = useContext(Context)
  const form = useForms()
  const [unfollowedRoom, setUnfollowedRoom] = useState('')

  const chooseElement = (item) => {
    localStorage.setItem('currentRoom', JSON.stringify(item))
    setCurrRoom(item)
    checkMessages(item)
    if (newMessages.length !== 0) {     // check new messages in other rooms
      let arr = newMessages.filter(n => n !== item._id)
      setNewMessages(arr)
    }
  }

  const checkMessages = (room) => {     // check messages in room
    let data = {
      room_id: room._id,
      method: 'check'
    }
    fetchMsgs(data)
      .then(res => setMessages(res))
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
    fetchRoom(data)
      .then(res => form.getUpdatedUserRooms(res))
  }

  const elements = [...rooms]
  const r_element = elements.map(n => {
    // let selected = n._id === currRoom._id ? 'r-wrap-selected' : ''
    let selected = ''
    if (currRoom) selected = n._id === currRoom._id ? 'r-wrap-selected' : ''
    return  <li key={n._id} onContextMenu={(e) => showModal(e, n)} onClick={() => chooseElement(n)}>
                <ChatRoomThumb room={n} bg={selected} />
            </li>
  })

return (
  <section className="h-85 w-100 wrap-h">
    <section className="h-100 w-110 h-msgs">
      <ul className="m-ul">
        {r_element}
      </ul>

      {/* <!-- Modal Structure --> */}
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
      {/* <!-- Modal Structure --> */}
    </section>
  </section>
  )
}
