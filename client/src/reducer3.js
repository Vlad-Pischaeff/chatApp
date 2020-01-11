export default function(state, action) {
  console.log('reducer3 state', state, 'action', action.payload)
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.payload
    default:
      return state
  }
}