import React, {useState, useContext, useRef, useEffect} from 'react'
import {Context} from './context'
import fetchUser from './FormMiddleware'
require('dotenv').config()

export default function FormSignIn({forms}) {
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userAvatar, setUserAvatar] = useState('./img/user00.jpg')
    const [avatars, setAvatars] = useState([])
    const [avatarClass, setAvatarClass] = useState([])
    const [verify, setVerify] = useState(true)
    const {dispatchLogin, dispatchCurrUser} = useContext(Context)
    const alert = useRef('')
    const remember = useRef('')
    
    useEffect(() => {
      const url = `https://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_PORT}/api/userimg`;
      async function fetchAvatars() {
        const response = await fetch(url);
        const json = await response.json();
        setAvatars(json);
      }
      fetchAvatars();
    }, [])

    const addUser = () => {
      let data = {
        name: userName,
        password: userPassword,
        avatar: `./img/user/${userAvatar}`,
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
          setVerify(true)
        } else {
          setVerify(false)
        }
      }

      if ((userName === '') || (userPassword === '')) {
        setVerify(false)
      } else {
        checkUser()
      }
    }

    const rememberUser = () => {
      if (remember.current.checked === true) {
        localStorage.setItem('savedUser', JSON.stringify({name: userName, password: userPassword}))
      }
    }
    
    const setClass = (n, index) => {
      setUserAvatar(n)
      setAvatarClass(avatars.map((n, i) => {
          return i === index ? 'border' : ''
        }))
    }

    const avatarsMap = avatars.map((n, i) => {
      return  <div key={`${i}`} onClick={() => setClass(n, i)}>
                <img src={`./img/user/${n}`} className={`${avatarClass[i]}`}/>
              </div>
    })

    let containerClass = (verify && (forms.signup === 'hide')) ? 'row container hide' : 'row container'
    let alertText = verify ? '\xa0' : 'Such user is already exists OR incorrect name or password'

    return (
      <div className={containerClass}>
          <h4 className="center-align">My App</h4>
        
          <form className="col s6 offset-s3 card">
            <main className="card-content">

              <span className="card-title center-align">Enter Your credentials</span>

              <section className="input-field col s12">
                <input type="text" id="username" className="validate" 
                  onChange = {event => setUserName(event.target.value)} 
                  onFocus = {() => setVerify(true)} />
                <label htmlFor="username">Username</label>
              </section>
  
              <section className="input-field col s12">
                <input type="password" id="password" className="validate" 
                  onChange = {event => setUserPassword(event.target.value)} 
                  onFocus = {() => setVerify(true)} />
                <label htmlFor="password">Password</label>
              </section>

              <section className="col s12">
                <div className="add-card-wrap-img">
                  {avatarsMap}
                </div>
              </section>
  
              <footer className="col s12" style={{margin: "1rem 0"}}>
                <a href="#!" className="waves-effect waves-light btn-large left" onClick={addUser}>
                    Sign up
                </a>
                <label htmlFor="remember-me-s" className="right">
                  <input type="checkbox" id="remember-me-s" ref={remember} onClick={rememberUser} />
                  <span>Remember me</span>
                </label>
              </footer>

            </main>
  
            <div className="card-action col s12">
              <p className="center-align red-text" ref={alert}>{alertText}</p>
            </div>
  
          </form>
      </div>
    )
}