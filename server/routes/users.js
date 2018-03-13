var router = require('express').Router();
var Board = require('../models/board');
var Users = require('../models/user');

//Get Users by email
router.get('/users', (req, res, next) => {
  Users.findOne({email: req.body.email})
    .then( user => {
      console.log(user)
      if(!user) {
        return res.status(401).send({error: 'Invalid username'})
      }
      user.password = null // probably Mongoose doesn't let you delete the password!!
      delete user.password // don't send the (hashed) password to the front-end
      res.send({user})
    })
    .catch( err => {
      res.status(401).send({error: 'Invalid username'}) // do not send the 'err' object back -- giving too much info to potential hackers!
    })
})






module.exports = { router };