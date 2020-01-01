export default function(state, action) {
  // console.log('reducer2 state -- ', state, 'action --', action.payload)
  switch (action.type) {

    case 'HIDE_LOGIN':
      state.login = 'hide'
      state.chat = ''
      return {...state};

    case 'HIDE_SIGNIN':
      state.signin = 'hide'
      state.chat = ''
      return {...state}

    case 'OPEN_SIGNIN':
      state.login = 'hide'
      state.signin = ''
      return {...state}
  
    default:
      return state
  }
}
