const {Schema, model} = require('mongoose')

const schema = new Schema({
  text: {
    type: String,
    required: true
  },
  user_id : {    
    type: String,
    required: true
  },
  user_name : {    
    type: String,
    required: true
  },
  user_avatar : {    
    type: String,
    required: true
  },
  room_id: {
    type: String,
    required: true
  },
  data: {
    type: Date, 
    default: Date.now
  }
})

module.exports = model('Messages', schema)