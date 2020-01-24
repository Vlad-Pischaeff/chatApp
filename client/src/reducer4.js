export default function(state, action) {
  // console.log('MSGS reducer4 state', state, 'action', action.payload)
  switch (action.type) {
    case 'SET_CURRENT_MSGS':
      return action.payload
    default:
      return state
  }
}