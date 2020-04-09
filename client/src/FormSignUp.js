import React, {useContext, useRef, useEffect, useState} from 'react'
import {Context, useFormInput, useForms} from './context'
import {fetchUser, fetchUserAvatars} from './FormMiddleware'
import MapUserAvatars from './MapUserAvatars'
let credentials = {avatar: './img/user00.jpg'}
let avatars = []

export default function FormSignIn() {
  const {forms, setCurrUser} = useContext(Context)
  const [isEnabledLS, setIsEnabledLS] = useState(false) //enable or disable LocalStorage savings
  const userName = useFormInput('userName', isEnabledLS)
  const userPass = useFormInput('userPass', isEnabledLS)
  const form = useForms()
  const alert = useRef('')
  
  useEffect(() => {
    fetchUserAvatars().then(resp => avatars = resp);
  }, [])

  useEffect(() => {
    (userName.value && userPass.value)
      ? alert.current.innerHTML = '\xa0'
      : alert.current.innerHTML = 'Incorrect name or password'
  }, [userName, userPass] )

  const h_Btn_onClick = () => {
    let data = {
      name: userName.value,
      password: userPass.value,
      avatar: credentials.avatar,
      method: 'check'
    }
    async function checkUser() {
      let users = await fetchUser(data)     // check user
      if (users.length === 0) {             // if user not exists
        data.method = 'add'
        try {
          users = await fetchUser(data)     // try to add new user
        } catch(e) {
          console.log('add user error', e)
        }
        setCurrUser(users.users)            // set new user as a "Current User" globally
        form.hideSignUp()                   // hide "SignUp" window
      } else {
        alert.current.innerHTML = 'Such user is already exists'
      }
    }

    if (userName.value && userPass.value ) checkUser()
  }

  return (
    <div className={`row container ${forms.signup}`}>
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

            <section className="col s12">
              <div className="add-card-wrap-img">
                <MapUserAvatars avatars={avatars} credentials={credentials} />
              </div>
            </section>

            <footer className="col s12" style={{margin: "1rem 0"}}>
              <a href="#!" className="waves-effect waves-light btn-large left" 
                  onClick={h_Btn_onClick} > Sign up </a>
              <label htmlFor="remember-me-s" className="right">
                <input type="checkbox" id="remember-me-s" onClick={() => setIsEnabledLS(!isEnabledLS)} />
                <span>Remember me</span>
              </label>
            </footer>

          </main>

          <div className="card-action col s12">
            <p className="center-align red-text" ref={alert}>{'\xa0'}</p>
          </div>

        </form>
    </div>
  )
}