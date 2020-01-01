import React, {useState, useContext, useRef} from 'react'
import {Context} from './context'
import fetchData from './FormMiddleware'

export default function FormSignIn({forms}) {
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [verify, setVerify] = useState(true)
    const {dispatchLogin} = useContext(Context)
    const alert = useRef('')
    const remember = useRef('')
    
    const addUser = () => {
      let data = {
        name: userName,
        password: userPassword,
        method: 'check'
      }

      async function checkUser() {
        let users = await fetchData(data)
        if (users.length === 0) {
          data.method = 'add'
          users = await fetchData(data)
          localStorage.setItem('currentUser', JSON.stringify(users.users))
          dispatchLogin({
            type: 'HIDE_SIGNIN',
            payload: ''
          })
          setVerify(true)
        } else {
          setVerify(false)
        }
      }

      try {
        checkUser()
      } catch(err) {
        console.log(err)
      }
    }

    const rememberUser = () => {
      if (remember.current.checked === true) {
        localStorage.setItem('savedUser', JSON.stringify({name: userName, password: userPassword}))
      }
    }
    
    let containerClass = (verify && (forms.signin === 'hide')) ? 'container hide' : 'container'
    let alertText = verify ? '\xa0' : 'Such user is already exists OR incorrect name or password'

    return (
      <div className={containerClass}>
        <div className="row">
          <h4 className="center-align">My App</h4>
        
          <form className="col s6 offset-s3 card">
            <div className="card-content">
              <span className="card-title center-align">Enter Your credentials</span>
              <div className="input-field col s12">
                <input type="text" id="username" className="validate" 
                  onChange = {event => setUserName(event.target.value)} 
                  onFocus = {() => setVerify(true)} />
                <label htmlFor="username">Username</label>
              </div>
  
              <div className="input-field col s12">
                <input type="password" id="password" className="validate" 
                  onChange = {event => setUserPassword(event.target.value)} 
                  onFocus = {() =>  setVerify(true)}
                  />
                <label htmlFor="password">Password</label>
              </div>
  
              <div className="col s12" style={{marginBottom: "1rem"}}>
                <a className="waves-effect waves-light btn-large left" 
                    onClick = {addUser}>
                    Sign in
                </a>
                <label htmlFor="remember-me-s" className="right">
                  <input type="checkbox" id="remember-me-s" ref={remember} onClick={rememberUser} />
                  <span>Remember me</span>
                </label>
              </div>
            </div>
  
            <div className="card-action col s12">
              <p className="center-align red-text" ref={alert}>{alertText}</p>
            </div>
  
          </form>
        </div>
      </div>
    )
}