import React, {useReducer} from 'react';
import {Context} from './context';
import loginReducer from './reducer2';
import FormLogIn from './FormLogIn'
import FormSignUp from './FormSignUp'
import FormChat from './FormChat'
import FormAddChat from './FormAddChat'

export default function App() {
  const [forms, dispatchLogin] = useReducer(loginReducer, {login:'', signup:'hide', chat:'hide', addroom: 'hide'})

  return (
    <Context.Provider value={{dispatchLogin}}>
        <FormLogIn forms={forms}/>
        <FormSignUp forms={forms}/>
        <FormChat forms={forms}/>
        <FormAddChat forms={forms}/>
    </Context.Provider>
  );
}

