const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  owner: {
    id: String,
    name: String  
  },
  followers: 
    [String]
})

module.exports = model('Rooms', schema)