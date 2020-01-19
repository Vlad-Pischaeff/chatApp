export default function(state, action) {
  console.log('CURRENT_ROOM reducer5 state', state, 'action', action.payload)
  switch (action.type) {
    case 'SET_CURRENT_ROOM':
      return action.payload
    default:
      return state
  }
}