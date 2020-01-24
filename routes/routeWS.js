const path = require('path');
const fs = require('fs');

module.exports = (app) => {

  app.get(`/ws`, async (req, res) => {
 
    let client = req.app.locals.clients
    console.log('ws client', client)
    return res.status(200).send(client);
  });

 
}