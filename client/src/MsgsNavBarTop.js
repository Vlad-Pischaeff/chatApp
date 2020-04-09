import React, {useContext} from 'react'
import {Context} from './context'

export default function MsgsNavBarTop() {
const {currUser, currRoom} = useContext(Context)

  return (
    <section className="h-15 h-wrap">
      <div className="input-field w-100">
        <input id="icon_prefix" type="text" className="validate"/>
        <label htmlFor="icon_prefix">Search users</label>
      </div>
      <i className="material-icons mrgn-03">search</i>
      <img className="user-avatar" src={currRoom.avatar || ''} alt="" />
      <img className="user-avatar" src={currUser.avatar || ''} alt="" />
    </section>
  )
}