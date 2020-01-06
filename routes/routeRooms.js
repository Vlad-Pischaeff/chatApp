const mongoose = require('mongoose');
const Rooms = mongoose.model('Rooms');

const path = require('path');
const fs = require('fs');

module.exports = (app) => {

  app.get(`/api/roomimg`, async (req, res) => {
    const directoryPath = path.join(__dirname, '..', 'client', 'public', 'img', 'room');
    let directoryContent = await fs.readdirSync(directoryPath);
    return res.status(200).send(directoryContent);
  });

  app.post(`/api/rooms`, async (req, res) => {
    let rooms;
    // console.log('request', req.params, req.body)
    switch (req.body.method) {
      case 'add':
        rooms = await Rooms.create(req.body);
        return res.status(201).send({
          error: false,
          rooms
        })
      case 'check':
        rooms = await Rooms.find({'name': req.body.name})
        return res.status(200).send(rooms)
      case 'validate':
        rooms = await Rooms.find({'name': req.body.name, 'password': req.body.description})
        return res.status(200).send(rooms)
    }
  });
}

