const mongoose = require('mongoose');
const Users = mongoose.model('Users');

module.exports = (app) => {

  app.get(`/api/users`, async (req, res) => {
    let users = await Users.find();
    return res.status(200).send(users);
  });

  app.post(`/api/users`, async (req, res) => {
    let users;
    switch (req.body.method) {
      case 'add':
        users = await Users.create(req.body);
        // console.log('users create -- ', req.body);
        return res.status(201).send({
          error: false,
          users
        })
      case 'check':
        users = await Users.find({'name': req.body.name})
        return res.status(200).send(users)
      case 'validate':
        users = await Users.find({'name': req.body.name, 'password': req.body.password})
        return res.status(200).send(users)
    }
  });

  app.put(`/api/users/:id`, async (req, res) => {
    const {id} = req.params;

    let users = await Users.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      users
    })
  });

  app.delete(`/api/users/:id`, async (req, res) => {
    const {id} = req.params;

    let users = await Users.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      users
    })
  });

}