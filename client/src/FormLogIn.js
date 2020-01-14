import React, {useState, useContext, useRef, useEffect} from 'react'
import socketIOClient from "socket.io-client"
import {Context} from './context'
import fetchUser from './FormMiddleware'
import fetchRoom from './FormAddChatMiddleware'


export default function FormLogIn({forms}) {
    const [userName, setUserName] = useState(localStorage.getItem('savedUser') !== null ? JSON.parse(localStorage.getItem('savedUser')).name: '')
    const [userPassword, setUserPassword] = useState(localStorage.getItem('savedUser') !== null ? JSON.parse(localStorage.getItem('savedUser')).password: '')
    const [verify, setVerify] = useState(true)
    const {dispatchLogin, dispatchRooms, dispatchCurrUser} = useContext(Context)
    const alert = useRef('')
    const remember = useRef('')
    const nameRef = useRef('')
    const passwordRef = useRef('')

    useEffect(() => {
      if (localStorage.getItem('savedUser') === null ) {
        localStorage.setItem('savedUser', JSON.stringify({name: '', password: ''})) 
      }
      nameRef.current.value = userName
      passwordRef.current.value = userPassword
    }, [])

    const sendIO = (user) => {
      const socket = socketIOClient("http://localhost:3001");
      socket.emit('username', user)
    }

    const checkUser = () => {
      const dataUser = {
        name: userName,
        password: userPassword,
        method: 'validate'
      }

      const dataRoom = {
        method: 'check'
      }

      async function check() {
        let users = await fetchUser(dataUser)
        if (users.length !== 0) {
          dispatchLogin({
            type: 'HIDE_LOGIN',
            payload: ''
          })
          // fetch list of owner rooms
          dataRoom.id = users[0]._id
          let rooms = await fetchRoom(dataRoom)
          dispatchRooms({
            type: 'GET_OWNER_ROOMS',
            payload: rooms
          })
          // fetch list of owner rooms
          setVerify(true)
          sendIO(users[0])
          dispatchCurrUser({
            type: 'SET_CURRENT_USER',
            payload: users[0] 
          })
        } else {
          setVerify(false)
        }
      }
      check()
    }

    const registerUser = () => {
      dispatchLogin({
        type: 'OPEN_SIGNUP',
        payload: ''
      })
    }

    const rememberUser = () => {
      if (remember.current.checked === true) {
          localStorage.setItem('savedUser', JSON.stringify({name: userName, password: userPassword}))
      }
    }

    let alertText = verify ? '\xa0' : 'No such user or password'

    return (
      <div className={`row container ${forms.login}`}>
        {/* <div className="row"> */}
          <h4 className="center-align">My App</h4>
        
          <form className="col s6 offset-s3 card">
            <main className="card-content">

              <span className="card-title center-align">Enter Your credentials</span>

              <section className="input-field col s12">
                <input type="text" id="username" className="validate" ref={nameRef}
                  onChange = {event => setUserName(event.target.value)} 
                  onFocus = {() => alert.current.innerHTML='&nbsp;'} />
                <label htmlFor="username">Username</label>
              </section>
  
              <section className="input-field col s12">
                <input type="password" id="password" className="validate" ref={passwordRef}
                  onChange = {event => setUserPassword(event.target.value)} 
                  onFocus = {() => alert.current.innerHTML='&nbsp;'}
                  />
                <label htmlFor="password">Password</label>
              </section>
  
              <footer className="col s12" style={{marginBottom: "1rem"}}>
                <a className="waves-effect waves-light btn-large left" onClick={checkUser}>
                  Log in
                </a>
                <label htmlFor="remember-me" className="right">
                  <input type="checkbox" id="remember-me" ref={remember} onClick={rememberUser} />
                  <span>Remember me</span>
                </label>
              </footer>

            </main>
  
            <div className="card-action col s12">
              <p className="center-align red-text" ref={alert}>{alertText}</p>
              <p className="center-align">Not registered? <a style={{cursor: "pointer"}} 
                onClick={registerUser}>sign up</a></p>
            </div>
  
          </form>
        {/* </div> */}
      </div>
    )
}