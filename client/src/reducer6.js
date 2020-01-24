export default function(state, action) {
  console.log('NEW MSGS reducer6 state', state, 'action', action.payload)
  switch (action.type) {
    case 'SET_NEW_MSGS':
      return action.payload
    default:
      return state
  }
}