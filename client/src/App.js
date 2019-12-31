import React, {useReducer} from 'react';
import {Context} from './context';
import loginReducer from './reducer2';
import FormLogIn from './FormLogIn'
import FormSignIn from './FormSignIn'
import FormChat from './FormChat'

export default function App() {
  // const [users, dispatchState] = useReducer(stateReducer, JSON.parse(localStorage.getItem('users')) || [{ name :"user", password: "123"}])
  const [forms, dispatchLogin] = useReducer(loginReducer, {login:'', signin:'hide', chat:'hide'})

  // useEffect(() => {
  //   async function fetchData() {
  //     let url = "http://localhost:3001/api/users"
  //     const response = await fetch(url)
  //     const myJson = await response.json();
  //     localStorage.setItem('users', JSON.stringify(myJson))
  //   } 
  //   try {
  //     fetchData();
  //   } catch (error) {
  //     console.log('catch error', error)
  //   }
  // }, [])

  // console.log('app forms --', forms)
  
  return (
    <Context.Provider value={{dispatchLogin}}>
        <FormLogIn forms={forms}/>
        <FormSignIn forms={forms}/>
        <FormChat forms={forms}/>
    </Context.Provider>
  );
}

