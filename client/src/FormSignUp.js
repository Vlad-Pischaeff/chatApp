import React, {useContext, useRef, useEffect} from 'react'
import {Context} from './context'
import {fetchUser, fetchUserAvatars} from './FormMiddleware'
import MapUserAvatars from './MapUserAvatars'
let credentials = { name: '', password: '', avatar: './img/user00.jpg' }
let avatars = []

export default function FormSignIn({forms}) {
    const {dispatchLogin, dispatchCurrUser} = useContext(Context)
    const alert = useRef('')
    const remember = useRef('')
    
    useEffect(() => {
      fetchUserAvatars().then(resp => avatars = resp);
    }, [])

    const h_Btn_onClick = () => {
      let data = {
        name: credentials.name,
        password: credentials.password,
        avatar: credentials.avatar,
        method: 'check'
      }

      async function checkUser() {
        let users = await fetchUser(data)
         if (users.length === 0) {
          data.method = 'add'
          try {
            users = await fetchUser(data)
          } catch(e) {
            console.log('users', e)
          }
          dispatchCurrUser({
            type: 'SET_CURRENT_USER',
            payload: users.users 
          })
          dispatchLogin({
            type: 'HIDE_SIGNUP',
            payload: ''
          })
        } else {
          alert.current.innerHTML = 'Such user is already exists OR incorrect name or password'
        }
      }

      if ((credentials.name === '') || (credentials.password === '')) {
        alert.current.innerHTML = 'Such user is already exists OR incorrect name or password'
      } else {
        checkUser()
      }
    }

    const h_Chck_onClick = () => {
      if (remember.current.checked === true) {
        localStorage.setItem('savedUser', JSON.stringify({name: credentials.name, password: credentials.password}))
      }
    }
    
    const h_Input_onChange = (event) => {
      credentials[event.target.name] = event.target.value
    }

    return (
      <div className={`row container ${forms.signup}`}>
          <h4 className="center-align">My App</h4>
        
          <form className="col s6 offset-s3 card">
            <main className="card-content">

              <span className="card-title center-align">Enter Your credentials</span>

              <section className="input-field col s12">
                <input type="text" id="username" className="validate" name="name"
                  onChange = {h_Input_onChange} 
                  onFocus = {() => alert.current.innerHTML = '\xa0'} />
                <label htmlFor="username">Username</label>
              </section>
  
              <section className="input-field col s12">
                <input type="password" id="password" className="validate" name="password"
                  onChange = {h_Input_onChange} 
                  onFocus = {() => alert.current.innerHTML = '\xa0'} />
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
                  <input type="checkbox" id="remember-me-s" ref={remember} onClick={h_Chck_onClick} />
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