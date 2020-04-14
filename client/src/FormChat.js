import React, {useContext, useState} from 'react'
import {Context} from './context'
import FormFindedRooms from './FormFindedRooms'
import FormChatRooms from './FormChatRooms'
import FormChatMessages from './FormChatMessages'
import MsgsNavBarBottom from './MsgsNavBarBottom'
import MsgsNavBarTop from './MsgsNavBarTop'
import FormChatRoomsTop from './FormChatRoomsTop'

export default function FormChat() {
  const {forms} = useContext(Context)
  const [findedRooms, setFindedRooms] = useState([])

  return (
    <div className={`row ${forms.chat}`} >
      <h4 className="center-align">My App</h4>
      <main className="card col s10 offset-s1 h-40rem" style={{padding: "0.5rem"}}>
        
        <section className="col s4 h-100">
          <FormChatRoomsTop setFindedRooms={setFindedRooms} />
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