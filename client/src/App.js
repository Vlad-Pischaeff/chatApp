import React, {useReducer} from 'react';
import {Context} from './context';
import loginReducer from './reducer2';
import FormLogIn from './FormLogIn'
import FormSignUp from './FormSignUp'
import FormChat from './FormChat'

export default function App() {
  const [forms, dispatchLogin] = useReducer(loginReducer, {login:'', signup:'hide', chat:'hide'})

  return (
    <Context.Provider value={{dispatchLogin}}>
        <FormLogIn forms={forms}/>
        <FormSignUp forms={forms}/>
        <FormChat forms={forms}/>
    </Context.Provider>
  );
}

