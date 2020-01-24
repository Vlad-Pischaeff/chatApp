const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket  = require('ws');
const clients = new Set();
require('dotenv').config()
const PORT = process.env.REACT_APP_PORT || 3001

// IMPORT MODELS
require('./models/users');
require('./models/rooms');
require('./models/messages');

const app = express()
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());
app.use(cors());

//IMPORT ROUTES
require('./routes/routeUsers')(app);
require('./routes/routeRooms')(app);
require('./routes/routeMessages')(app);
// require('./routes/routeWS')(app);

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

wss.on('connection', (socket, req) => {
  // console.log('User connected', req.connection.remoteAddress, wss.clients.entries(), wss.clients.size, app.locals.clients)

  let client = {}
  socket.on('message', (message) => {
    let data = JSON.parse(message)   
    console.log('SERVER MESSAGE -- ', message)
    if (data['USER: SENDED MESSAGE']) {
      clients.forEach((client) => {
        let resp = JSON.stringify({'SERVER: UPDATE ROOM': data['USER: SENDED MESSAGE'].room_id})
        client.socket.send(resp)
      })
    }
    if (data['USER: LOGINED']) {
      client.id = data['USER: LOGINED']._id
      client.socket = socket
      clients.add(client)           // add clients to new Set()
    }
    if (data['USER: OPEN DIALOG']) {
      console.log('OPEN DIALOG', data['USER: OPEN DIALOG'])
    }
    if (data['USER: SENDED PRIV MSG']) {
      let to =  data['USER: SENDED PRIV MSG'].to
      for (let client of clients) {
        if (client.id === to) {
          // console.log('sended priv message to', to)
          client.socket.send(JSON.stringify({'SERVER: SENDED PRIV MSG': data['USER: SENDED PRIV MSG']}))
        }
      }
    }
  });

  // socket.on('USER: SENDED MESSAGE', (data) => {
  //   socket.broadcast.emit('SERVER: UPDATE ROOM', { room_id: data.room_id });
  // })

  socket.send(JSON.stringify({'Hi there, I am a WebSocket server' : 'server'}));

  socket.on('close', function close() {
    console.log('User disconnected');
  });
})

