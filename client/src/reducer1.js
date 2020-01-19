export default function(state, action) {
  console.log('MANAGE RMS reducer1 state', state, 'action', action.payload)
  switch (action.type) {
    case 'GET_OWNER_ROOMS':
      return [...state, ...action.payload]
    case 'GET_ADDED_OWNER_ROOMS':
      return [...state, action.payload]
    case 'GET_UPDATED_OWNER_ROOMS':
      return [...action.payload]
    case 'remove':
      return state.filter(n => n.id !== action.payload )
    case 'init':
      return action.payload
    default:
      return state
  }
}