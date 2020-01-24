export default function(state, action) {
  console.log('NEW DIALOG reducer7 state', state, 'action', action.payload)
  switch (action.type) {
    case 'SET_NEW_DIALOG':
      return action.payload
    default:
      return state
  }
}