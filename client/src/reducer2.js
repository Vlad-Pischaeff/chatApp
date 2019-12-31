export default function(state, action) {
  // let users = action.payload.users
  // let userName = action.payload.userName
  // let userPassword = action.payload.userPassword
  console.log('reducer2 state -- ', state, 'action --', action.payload)
  switch (action.type) {

    case 'validate':
      state.login = 'hide'
      state.chat = ''
      return {...state};

    case 'check':
      state.signin = 'hide'
      state.chat = ''
      return {...state}

    case 'register':
      state.login = 'hide'
      state.signin = ''
      return {...state}
  
    default:
      return state
  }
}
