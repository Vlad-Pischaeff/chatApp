export default function(state, action) {
  console.log('reducer1 state', state, 'action', action.payload)
  switch (action.type) {
    case 'addUser':
      return [
        ...state,
          {
            name: action.payload.userName,
            password: action.payload.userPassword
          }
      ]
    case 'remove':
      return state.filter(n => n.id !== action.payload )
    case 'init':
      return action.payload
    default:
      return state
  }
}