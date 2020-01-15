const mongoose = require('mongoose');
const Messages = mongoose.model('Messages');

const path = require('path');
const fs = require('fs');

module.exports = (app) => {

  app.get(`/api/msgs`, async (req, res) => {
    const directoryPath = path.join(__dirname, '..', 'client', 'public', 'img', 'room');
    let directoryContent = await fs.readdirSync(directoryPath);
    return res.status(200).send(directoryContent);
  });

  app.post(`/api/msgs`, async (req, res) => {
    let msgs;
    // console.log('request', req.params, req.body)
    switch (req.body.method) {
      case 'add':
        msgs = await Messages.create(req.body);
        return res.status(201).send({
          error: false,
          msgs
        });
      case 'check':
        // console.log('check messages -- ', req.body)
        msgs = await Messages.find( { 'room_id': req.body.room_id } );
        return res.status(200).send(msgs);
      case 'search':
        msgs = await Messages.find({$and: [ { 'name': 
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
        return res.status(200).send(msgs);
      case 'follow':
        let keys = [...req.body.id]
        msgs = await Messages.updateMany( { _id: keys }, { $push: { followers: req.body.user_id } })
        msgs = await Messages.find( {$or: [ 
                                          { 'owner.id': req.body.user_id },
                                          { 'followers': req.body.user_id }
                                        ]
                                  });
        return res.status(200).send(msgs);
      case 'unfollow':
        msgs = await Messages.updateOne( { _id: req.body.id }, { $pull: { followers: req.body.user_id } })
        msgs = await Messages.find( {$or: [ 
                                          { 'owner.id': req.body.user_id },
                                          { 'followers': req.body.user_id }
                                        ]
                                  });
        return res.status(200).send(msgs);
    }
  });
}

