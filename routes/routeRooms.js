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
        });
      case 'check':
        // console.log('id', req.body.name)
        rooms = await Rooms.find( {$or: [ 
                                          { 'owner.id': req.body.id },
                                          { 'followers': req.body.id }
                                        ]
                                  }
                                );
        return res.status(200).send(rooms);
      case 'search':
        rooms = await Rooms.find({$and: [ { 'name': 
                                            { $regex: req.body.name, $options: "i" } 
                                          }, 
                                          { 'owner.id': 
                                            { $not: 
                                              { $regex: req.body.owner, $options: "i" }
                                            }
                                          },
                                          { 'followers':
                                            { $not:
                                              { $regex: req.body.owner, $options: "i" }
                                            }
                                          }
                                        ] 
                                  });
        return res.status(200).send(rooms);
      case 'follow':
        let keys = [...req.body.id]
        rooms = await Rooms.updateMany( { _id: keys }, { $push: { followers: req.body.user_id } })
        rooms = await Rooms.find( {$or: [ 
                                          { 'owner.id': req.body.user_id },
                                          { 'followers': req.body.user_id }
                                        ]
                                  });
        return res.status(200).send(rooms);
    }
  });
}

