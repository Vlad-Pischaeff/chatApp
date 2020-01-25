import React, {useState, useContext} from 'react'
import {Context} from './context'
import fetchRoom from './FormAddChatMiddleware'
import fetchMsgs from './FormAddMsgsMiddleware'
import ChatRoomThumb from './ChatRoomThumb'

export default function FormChatRooms({rooms, currUser, currRoom, newMessages}) {
  const {dispatchRooms, dispatchMsgs, dispatchCurrRoom, dispatchNewMessages} = useContext(Context)
  const [unfollowedRoom, setUnfollowedRoom] = useState('')

  const chooseElement = (item) => {
    dispatchCurrRoom({
      type: 'SET_CURRENT_ROOM',
      payload: item
    })
    checkMessages(item)
    // remove current room id from list of new messages
    if (newMessages.length !== 0) {
      let arr = newMessages.filter(n => n !== item._id)
      dispatchNewMessages({
        type: 'SET_NEW_MSGS',
        payload: arr
      })
    }
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
    // let selected = n._id === currRoom._id ? 'r-wrap-selected' : ''
    let selected = ''
    if (currRoom) selected = n._id === currRoom._id ? 'r-wrap-selected' : ''
    return  <li key={n._id} onContextMenu={(e) => showModal(e, n)} onClick={() => chooseElement(n)}>
                <ChatRoomThumb room={n} bg={selected} currUser={currUser} roommsg={newMessages}/>
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
