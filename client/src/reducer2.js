export default function(state, action) {
  // console.log('reducer2 state -- ', state, 'action --', action.payload)
  switch (action.type) {

    case 'HIDE_LOGIN':
      state.login = 'hide'
      state.chat = ''
      return {...state};

    case 'HIDE_SIGNUP':
      state.signup = 'hide'
      state.chat = ''
      return {...state}

    case 'OPEN_SIGNUP':
      state.login = 'hide'
      state.signup = ''
      return {...state}
  
    default:
      return state
  }
}
