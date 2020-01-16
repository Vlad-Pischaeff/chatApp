const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001
// IMPORT MODELS
require('./models/users');
require('./models/rooms');
require('./models/messages');

const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const chatRouter = require('./routes/routes')
// app.engine('html', require('ejs').renderFile);

// app.use(chatRouter)
app.use(bodyParser.json());
app.use(cors());
// app.disable('X-Content-Type-Options');

//IMPORT ROUTES
require('./routes/routeUsers')(app);
require('./routes/routeRooms')(app);
require('./routes/routeMessages')(app);

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       

async function start() {
  try {
     await mongoose.connect('mongodb+srv://vlad:123321@cluster0-pfbwp.mongodb.net/chatapp', options
    //  {
  //     useNewUrlParser: true,
  //     useFindAndModify: false,
  //     useUnifiedTopology: true,
  //     socketTimeoutMS: 30000,
  //     keepAlive: 300000
  // }
  )
  
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (e) {
      console.log(e)
  }
}

start()

io.on('connection', socket => {
  console.log('User connected')

  socket.emit('news', { hello: 'world' });
  
  socket.on('username', (data) => {
    console.log('user name', data)
  })

  socket.on('USER: SENDED MESSAGE', (data) => {
    // console.log('USER: SENDED MESSAGE', data)
    socket.broadcast.emit('SERVER: UPDATE ROOM', { room_id: data.room_id });
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
