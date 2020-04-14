import React, {useContext} from 'react'
import {Context, useFormInput, useForms} from './context'
import {fetchRoom} from './FormMiddleware'

export default function FormChatRoomsTop({setFindedRooms}) {
  const {currUser} = useContext(Context)
  const form = useForms()
  const roomName = useFormInput('', false)

  const handleClick = () => {
    if (roomName.value) {
      const data = {
        owner: currUser._id,
        name: roomName.value,
        method: 'search'
      }
      fetchRoom(data)
        .then(res => setFindedRooms(res))
        .then(form.openFindedRooms)
        .catch(e => console.log('search rooms', e))
      roomName.onFocus()
    }
  }

  return (
      <section className="h-wrap">
        <div className="input-field w-100">
          <input id="icon_prefix" type="text" className="validate" {...roomName} />
          <label htmlFor="icon_prefix">Search chatroom</label>
        </div>
        <i className="material-icons mrgn-03" onClick={handleClick}>search</i>
        <i className="material-icons mrgn-03" onClick={form.openAddRoom}>library_add</i>
      </section>
    )
}
