import React, {useContext} from 'react'
import {Context, useFormInput, useForms} from './context'
import {fetchRoom} from './FormMiddleware'
import FormFindedRooms from './FormFindedRooms'
import FormChatRooms from './FormChatRooms'
import FormChatMessages from './FormChatMessages'
import MsgsNavBarBottom from './MsgsNavBarBottom'
import MsgsNavBarTop from './MsgsNavBarTop'
let findedRooms = []

export default function FormChat() {
  const {forms, currUser} = useContext(Context)
  const form = useForms()
  const roomName = useFormInput('', false)

  const h_BtnSearch_onClick = () => {
    if (roomName.value) {
      const data = {
        owner: currUser._id,
        name: roomName.value,
        method: 'search'
      }
      fetchRoom(data)
        .then(res => findedRooms = res)
        .then(form.openFindedRooms)
        .catch(e => console.log('search rooms', e))
    }
  }

  return (
    <div className={`row ${forms.chat}`} >
      <h4 className="center-align">My App</h4>
      <main className="card col s10 offset-s1 h-40rem" style={{padding: "0.5rem"}}>
        <section className="col s4 h-100">
          <section className="h-wrap">
            <div className="input-field w-100">
              <input id="icon_prefix" type="text" className="validate" {...roomName} />
              <label htmlFor="icon_prefix">Search chatroom</label>
            </div>
            <i className="material-icons mrgn-03" onClick={h_BtnSearch_onClick}>search</i>
            <i className="material-icons mrgn-03" onClick={form.openAddRoom}>library_add</i>
          </section>

          <FormChatRooms />

        </section>

        <section className="col s8 h-100">

          <MsgsNavBarTop />
          <FormChatMessages />
          <MsgsNavBarBottom />

        </section>
      </main>

      <FormFindedRooms findedRooms={findedRooms} />

    </div>
  )
}