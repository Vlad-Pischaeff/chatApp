import React from 'react'

export default function MsgsNavBarTop({currUser, currRoom}) {

  return (
    <section className="h-15 h-wrap">
      <div className="input-field w-100">
        <input id="icon_prefix" type="text" className="validate"/>
        <label htmlFor="icon_prefix">Search users</label>
      </div>
      <i className="material-icons mrgn-03">search</i>
      <img className="user-avatar" src={currRoom ? currRoom.avatar: ''} alt="current room" />
      <img className="user-avatar" src={currUser.avatar} alt="current user" />
    </section>
  )
}