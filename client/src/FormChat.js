import React, {useState, useContext, useRef} from 'react'
import {Context} from './context'
import ChatRoomThumb from './ChatRoomThumb'

export default function FormChat({forms}) {
  const {dispatchLogin} = useContext(Context)

  const addRoom = () => {
    // console.log('click on add chat icon')
    dispatchLogin({
      type: 'SHOW_ADDROOM',
      payload: ''
    })
  }

  return (
    <div className={`row ${forms.chat}`}>
      <h4 className="center-align">My App</h4>
      <main className="card col s10 offset-s1 h-40rem" style={{padding: "0.5rem"}}>
        <section className="col s4 orange lighten-5 h-100">
          <section className="h-wrap">
            <div className="input-field">
              <input id="icon_prefix" type="text" className="validate" />
              <label htmlFor="icon_prefix">Search chatroom</label>
            </div>
            <i className="material-icons">search</i>
            <i className="material-icons"
              onClick = {addRoom} >
              library_add
            </i>
          </section>
          <div className="wrap h-85">
            <ul>
              <li><ChatRoomThumb /></li>
            </ul>
          </div>
        </section>

        <section className="col s8 blue lighten-5 h-100 ">
          <section className="h-15 h-wrap">
            <div className="input-field col s12">
              <input id="icon_prefix" type="text" className="validate"/>
              <label htmlFor="icon_prefix">Search users</label>
            </div>
            <i className="material-icons">search</i>
          </section>
            <div className="divider"></div>
          <section className="h-75">chat field
            <ul>
              <li>one</li>
              <li>two</li>
              <li>three</li>
            </ul>
          </section>
            <div className="divider"></div>
          <section >
            <div className="input-field">
              <i className="material-icons prefix">send</i>
              <input id="icon_prefix" type="text" className="validate"/>
              <label htmlFor="icon_prefix">Send message</label>
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}