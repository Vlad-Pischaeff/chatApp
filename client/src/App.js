import React, {useReducer} from 'react';
import {Context} from './context';
import roomsReducer from './reducer1'
import loginReducer from './reducer2';
import FormLogIn from './FormLogIn'
import FormSignUp from './FormSignUp'
import FormChat from './FormChat'
import FormAddChat from './FormAddChat'

export default function App() {
  const [forms, dispatchLogin] = useReducer(loginReducer, {login:'', signup:'hide', chat:'hide', addroom: 'hide'})
  const [rooms, dispatchRooms] = useReducer(roomsReducer, '')
  console.log('App rooms', rooms)
  return (
    <Context.Provider value={{dispatchLogin, dispatchRooms}}>
        <FormLogIn forms={forms}/>
        <FormSignUp forms={forms}/>
        <FormChat forms={forms} rooms={rooms}/>
        <FormAddChat forms={forms}/>
    </Context.Provider>
  );
}

