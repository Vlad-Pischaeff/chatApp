import React, {useReducer} from 'react'
import {Context} from './context'
import roomsReducer from './reducer1'
import loginReducer from './reducer2'
import userReducer from './reducer3'
import FormLogIn from './FormLogIn'
import FormSignUp from './FormSignUp'
import FormChat from './FormChat'
import FormAddChat from './FormAddChat'
import { urlencoded } from 'body-parser'
// import FormFindedRooms from './FormFindedRooms'

export default function App() {
  const [forms, dispatchLogin] = useReducer(loginReducer, {login:'', signup:'hide', chat:'hide', addroom: 'hide', findedroom:'hide'})
  const [rooms, dispatchRooms] = useReducer(roomsReducer, '')
  const [currUser, dispatchCurrUser] = useReducer(userReducer, '')
  
  return (
    <Context.Provider value={{dispatchLogin, dispatchRooms, dispatchCurrUser}}>
        <FormLogIn forms={forms}/>
        <FormSignUp forms={forms}/>
        <FormChat forms={forms} rooms={rooms} currUser={currUser}/>
        <FormAddChat forms={forms} currUser={currUser}/>
        {/* <FormFindedRooms forms={forms}/> */}
    </Context.Provider>
  );
}

