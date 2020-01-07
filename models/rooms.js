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
    id: {type: String},
    name: {type: String}
  },
  folowers: {
    type: Array
  }
})

module.exports = model('Rooms', schema)