var router = require('express').Router();
var Users = require('../models/user');

router.post('/auth/register', (req, res) => { 
  req.body.password = Users.generateHash(req.body.password)
  Users.create(req.body)
    .then(user => {
      if(!user) {
        return res.status(401).send({error: 'Invalid username and/or password'})
      }
      user.password = null; // probably Mongoose doesn't let you delete the password!!
      req.session.uid = user._id; // save the userId into the session
      res.send(user)
    })
    .catch( err => {
      res.status(401).send({error: 'Invalid username and/or password'}) // do not send the 'err' object back -- giving too much info to potential hackers!
    })
});
router.post('/auth/login', (req, res) => {
  Users.findOne({email: req.body.email})
    .then( user => {
      console.log(user)
      if(!user) {
        return res.status(401).send({error: 'Invalid username and/or password'})
      }
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({error: 'Invalid username and/or password'})
      }
      user.password = null // probably Mongoose doesn't let you delete the password!!
      delete user.password // don't send the (hashed) password to the front-end
      req.session.uid = user._id // save the userId into the session
      res.send({Message: "Successfully Logged In", user})
    })
    .catch( err => {
      res.status(401).send({error: 'Invalid username and/or password'}) // do not send the 'err' object back -- giving too much info to potential hackers!
    })
});
router.get('/auth/authenticate', (req, res) =>{
  Users.findById(req.session.uid)
    .then(user=>{
      if(!user){
        return res.status(401).send({error: "Please Login to Continue"})
      }
      user.password = null;
      return res.status(200).send(user)
    }).catch(err=>{
      return res.status(500).send({
        error:err
      })
    })
});
router.delete('/auth/logout', (req, res)=>{
  req.session.destroy()
  res.send("Successfully logged out")
});
module.exports = router;