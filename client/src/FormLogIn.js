import React, {useContext, useRef, useEffect} from 'react'
import {Context} from './context'
import {fetchUser, fetchRoom} from './FormMiddleware'
let credentials = { name:'', password:'' }

export default function FormLogIn({forms, socket}) {
    const {dispatchLogin, dispatchRooms, dispatchCurrUser} = useContext(Context)
    const alert = useRef('')
    const checkbox = useRef('')
    const nameRef = useRef('')
    const passwordRef = useRef('')

    useEffect(() => {
      let savedUser = JSON.parse(localStorage.getItem('savedUser'))
      if (!savedUser) {
        localStorage.setItem('savedUser', JSON.stringify(credentials)) 
      } else {
        credentials = savedUser
        nameRef.current.value = credentials.name
        passwordRef.current.value = credentials.password
      }
    }, [])

    const h_Btn_onClick = () => {
      const dataUser = {
        name: credentials.name,
        password: credentials.password,
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
          dispatchCurrUser({
            type: 'SET_CURRENT_USER',
            payload: users[0] 
          })
          let req = JSON.stringify({'USER: LOGINED': users[0]})
          socket.send(req)
         } else {
          alert.current.innerHTML = 'No such user or password'
        }
      }
      check()
    }

    const h_Signup_onClick = () => {
      dispatchLogin({
        type: 'OPEN_SIGNUP',
        payload: ''
      })
    }

    const h_Chck_onClick = () => {
      if (checkbox.current.checked === true) {
          localStorage.setItem('savedUser', JSON.stringify(credentials))
      }
    }

    const h_Input_onChange = (event) => {
      credentials[event.target.name] = event.target.value
      if (checkbox.current.checked) checkbox.current.click()
    }

    console.log('form login', credentials)

    return (
      <div className={`row container ${forms.login}`}>
          <h4 className="center-align">My App</h4>
        
          <form className="col s6 offset-s3 card">
            <main className="card-content">

              <span className="card-title center-align">Enter Your credentials</span>

              <section className="input-field col s12">
                <input type="text" id="username" className="validate" ref={nameRef} name="name"
                  onChange = {h_Input_onChange} 
                  onFocus = {() => alert.current.innerHTML='&nbsp;'} />
                <label htmlFor="username">Username</label>
              </section>
  
              <section className="input-field col s12">
                <input type="password" id="password" className="validate" ref={passwordRef} name="password"
                  onChange = {h_Input_onChange} 
                  onFocus = {() => alert.current.innerHTML='&nbsp;'}
                  />
                <label htmlFor="password">Password</label>
              </section>
  
              <footer className="col s12" style={{marginBottom: "1rem"}}>
                <a href="#!" className="waves-effect waves-light btn-large left" onClick={h_Btn_onClick}>
                  Log in
                </a>
                <label htmlFor="remember-me" className="right">
                  <input type="checkbox" id="remember-me" ref={checkbox} onClick={h_Chck_onClick} />
                  <span>Remember me</span>
                </label>
              </footer>

            </main>
  
            <div className="card-action col s12">
              <p className="center-align red-text" ref={alert}>{'\xa0'}</p>
              <p className="center-align">Not registered? <a href="#!" style={{cursor: "pointer"}} 
                onClick={h_Signup_onClick}>sign up</a></p>
            </div>
  
          </form>
      </div>
    )
}