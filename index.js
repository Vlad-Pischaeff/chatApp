const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001
// IMPORT MODELS
require('./models/users');
require('./models/rooms');

const app = express()
// const chatRouter = require('./routes/routes')
// app.engine('html', require('ejs').renderFile);

// app.use(chatRouter)
app.use(bodyParser.json());
app.use(cors());

//IMPORT ROUTES
require('./routes/routeUsers')(app);
require('./routes/routeRooms')(app);

async function start() {
  try {
    await mongoose.connect ('mongodb+srv://vlad:123321@cluster0-pfbwp.mongodb.net/chatapp',{
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (e) {
      console.log(e)
  }
}

start()