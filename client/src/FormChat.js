import React, {useState, useContext, useRef} from 'react'
import {Context} from './context'

export default function FormChat({forms}) {

  return (
    <div className={`row ${forms.chat}`}>
      <h4 className="center-align">My App</h4>
      <main className="card col s10 offset-s1 h-40rem">
        <section className="col s3 grey h-100">
          <p className="center-align">chat rooms</p>
        </section>

        <section className="col s9 red h-100">
          <section className="h-10">search field</section>
            <div className="divider"></div>
          <section className="h-80">chat field
            <ul>
              <li>one</li>
              <li>two</li>
              <li>three</li>
            </ul>
          </section>
            <div className="divider"></div>
          <section className="h-10">input field</section>
        </section>
      </main>
    </div>
  )
}