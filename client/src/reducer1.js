export default function(state, action) {
  console.log('reducer1 state', state, 'action', action.payload)
  switch (action.type) {
    case 'GET_OWNER_ROOMS':
      // console.log('state', state)
      // console.log('payload', action.payload)
      return [...state, ...action.payload]
    case 'GET_ADDED_OWNER_ROOMS':
      // console.log('state', state)
      // console.log('payload', action.payload)
      return [...state, action.payload]
    case 'remove':
      return state.filter(n => n.id !== action.payload )
    case 'init':
      return action.payload
    default:
      return state
  }
}