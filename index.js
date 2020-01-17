const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const PORT = process.env.REACT_APP_PORT || 3001

// IMPORT MODELS
require('./models/users');
require('./models/rooms');
require('./models/messages');

const app = express()
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
// const chatRouter = require('./routes/routes')
// app.engine('html', require('ejs').renderFile);

// app.use(chatRouter)
app.use(bodyParser.json());
app.use(cors());

//IMPORT ROUTES
require('./routes/routeUsers')(app);
require('./routes/routeRooms')(app);
require('./routes/routeMessages')(app);

async function start() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.REACT_APP_MONGO_USER}:${process.env.REACT_APP_MONGO_PASS}@cluster0-pfbwp.mongodb.net/chatapp?retryWrites=true&w=majority`, 
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        socketTimeoutMS: 30000,
        keepAlive: 300000
      },
      () => { console.log('connected to db')}
    )
  
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (e) {
      console.log('SERVER ERRORS', e)
  }
}

start()

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.on('connection', socket => {
  // console.log('User connected')
  
  // socket.on('username', (data) => {
  //   console.log('user name', data)
  // })

  socket.on('USER: SENDED MESSAGE', (data) => {
    socket.broadcast.emit('SERVER: UPDATE ROOM', { room_id: data.room_id });
  })

  // socket.on('disconnect', () => {
  //   console.log('user disconnected')
  // })
})
