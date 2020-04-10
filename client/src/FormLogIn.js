import React, {useContext, useRef, useState} from 'react'
import {Context, useFormInput, useForms} from './context'
import {fetchUser, fetchRoom} from './FormMiddleware'

export default function FormLogIn() {
  const [isEnabledLS, setIsEnabledLS] = useState(false) //enable or disable LocalStorage savings
  const userName = useFormInput('userName', isEnabledLS)
  const userPass = useFormInput('userPass', isEnabledLS)
  const {setCurrUser, forms, socket} = useContext(Context)
  const form = useForms()
  const alert = useRef('')

  const h_Btn_onClick = () => {
    const dataUser = {
      name: userName.value,
      password: userPass.value,
      method: 'validate'
    }

    const dataRoom = {
      method: 'check'
    }

    async function check() {
      let users = await fetchUser(dataUser)
      if (users.length !== 0) {               // if user exists
        dataRoom.id = users[0]._id
        let rooms = await fetchRoom(dataRoom) // fetch list of owner rooms
        form.getUserRooms(rooms)              // set list of rooms
        setCurrUser(users[0])                 // set current user globally 
        let req = JSON.stringify({'USER: LOGINED': users[0]})
        socket.send(req)
        form.hideLogIn()
      } else {
        alert.current.innerHTML = 'No such user or password'
      }
    }
    check()
  }

  return (
    <div className={`row container ${forms.login}`}>
        <h4 className="center-align">My App</h4>
      
        <form className="col s6 offset-s3 card">
          <main className="card-content">

            <span className="card-title center-align">Enter Your credentials</span>

            <section className="input-field col s12">
              <input type="text" id="username" className="validate" name="name"
                {...userName} />
              <label htmlFor="username">Username</label>
            </section>

            <section className="input-field col s12">
              <input type="password" id="password" className="validate" name="password"
                {...userPass} />
              <label htmlFor="password">Password</label>
            </section>

            <footer className="col s12" style={{marginBottom: "1rem"}}>
              <a href="#!" className="waves-effect waves-light btn-large left" onClick={h_Btn_onClick}>
                Log in
              </a>
              <label htmlFor="remember-me" className="right">
                <input type="checkbox" id="remember-me" onClick={() => setIsEnabledLS(!isEnabledLS)} />
                <span>Remember me</span>
              </label>
            </footer>

          </main>

          <div className="card-action col s12">
            <p className="center-align red-text" ref={alert}>{'\xa0'}</p>
            <p className="center-align">Not registered? <a href="#!" style={{cursor: "pointer"}} 
              onClick={form.openSignUp}>sign up</a></p>
          </div>

        </form>
    </div>
  )
}