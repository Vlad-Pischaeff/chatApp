import React, {useState, useContext, useRef, useEffect} from 'react'
import {Context} from './context'
import fetchData from './FormLoginMiddleware'

export default function FormLogIn({forms}) {
    const [userName, setUserName] = useState(localStorage.getItem('currentUser') !== null ? JSON.parse(localStorage.getItem('currentUser')).name: '')
    const [userPassword, setUserPassword] = useState(localStorage.getItem('currentUser') !== null ? JSON.parse(localStorage.getItem('currentUser')).password: '')
    const {dispatchLogin} = useContext(Context)
    const alert = useRef('')
    const remember = useRef('')
    const nameRef = useRef('')
    const passwordRef = useRef('')

    useEffect(() => {
      if (localStorage.getItem('currentUser') === null ) {
        localStorage.setItem('currentUser', JSON.stringify({name: '', password: ''})) 
      }
      nameRef.current.value = userName
      passwordRef.current.value = userPassword
    }, [])

    const checkUser = () => {
      const data = {
        name: userName,
        password: userPassword,
        method: 'validate'
      }
      const clb = () => {
        dispatchLogin({
        type: 'validate',
        payload: ''
      })}
      fetchData(data, clb)
      if ((forms.login) !== 'hide')
        alert.current.innerHTML = 'No such user or password'
    }

    const registerUser = () => {
      dispatchLogin({
        type: 'register',
        payload: ''
      })
    }

    const rememberUser = () => {
      if (remember.current.checked === true) {
        localStorage.setItem('currentUser', JSON.stringify({name: userName, password: userPassword}))
      }
    }

    return (
      <div className={`container ${forms.login}`}>
        <div className="row">
          <h4 className="center-align">My App</h4>
        
          <form className="col s6 offset-s3 card">
            <div className="card-content">
              <span className="card-title center-align">Enter Your credentials</span>
              <div className="input-field col s12">
                <input type="text" id="username" className="validate"  ref={nameRef}
                  onChange = {event => setUserName(event.target.value)} 
                  onFocus = {() => alert.current.innerHTML='&nbsp;'} />
                <label htmlFor="username">Username</label>
              </div>
  
              <div className="input-field col s12">
                <input type="password" id="password" className="validate"  ref={passwordRef}
                  onChange = {event => setUserPassword(event.target.value)} 
                  onFocus = {() => alert.current.innerHTML='&nbsp;'}
                  />
                <label htmlFor="password">Password</label>
              </div>
  
              <div className="col s12" style={{marginBottom: "1rem"}}>
                <a className="waves-effect waves-light btn-large left" 
                    onClick = {checkUser}>Log in</a>
                <label htmlFor="remember-me" className="right">
                  <input type="checkbox" id="remember-me" ref={remember} onClick={rememberUser} />
                  <span>Remember me</span>
                </label>
              </div>
            </div>
  
            <div className="card-action col s12">
              <p className="center-align red-text" ref={alert}>&nbsp;</p>
              <p className="center-align">Not registered? <a style={{cursor: "pointer"}} 
                onClick={registerUser}>sign in</a></p>
            </div>
  
          </form>
        </div>
      </div>
    )
}