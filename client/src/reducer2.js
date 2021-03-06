export default function(state, action) {
  // console.log('MANAGE FORMS reducer2 state -- ', state, 'action --', action.payload)
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

    case 'HIDE_ADDROOM':
      state.addroom = 'hide'
      return {...state}

    case 'OPEN_ADDROOM':
      state.addroom = ''
      return {...state}

    case 'HIDE_FINDEDROOM':
      state.findedroom = 'hide'
      return {...state}

    case 'OPEN_FINDEDROOM':
      state.findedroom = ''
      return {...state}

    default:
      return state
  }
}
