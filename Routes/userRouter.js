//import express
const express = require('express');

//import database
const Users = require('../data/helpers/userDb');

//define the router
const router = express.Router();

//make a constant reply for 404 & 500
const sendError = (msg, res) => {
  res.status(500);
  res.json({ errorMessage: `${msg}` })
};

const sendMissing = (res) => {
  res.status(404);
  res.json({ errorMessage: 'The User does not exist.' });
}

//make crud endpoints
//get request
router.get('/', (req, res) => {
  Users
  .get()
  .then( user => {
    res.status(200).json(user);
  })
  .catch( err => {
    return sendError( 'User information Unavailable at this moment', err );
  })
})

//get user by id
router.get('/:id', (req, res) => {
  //define id
  const ID = req.params.id
  Users
  .getById(ID)
  .then( user => {
    if (user === undefined) {
      return sendMissing(res);
    }
    else{
      return res.status(200).json(user);
    }
  })
  .catch( err => {
    return sendError( 'User information Unavailable at this moment', err );
  })
})

//get users post data
router.get(':id/posts', (req, res) => {
  //define id
  const ID = req.params.id
  Users
  .getUserPosts(ID)
  .then( user => {
    if (user === undefined) {
      return sendMissing(res);
    }
    else{
      return res.status(200).json(user);
    }
  })
  .catch( err => {
    return sendError( 'User information Unavailable at this moment', err );
  })
})

//update user
router.put('/:id', (req, res) => {
  //define id 
  const ID = req.params.id

  //define req.body
  const { name } = req.body;
  const user = { name };

  //check the req body
  if(!name) { 
    return res.status(400).json({ error: 'Please provide the NEW user name' });
  }
  Users
  .update(ID, user)
  .then( person => {
    if (person === undefined) {
      return sendMissing(res);
    }
    else{
      newUser = { ...person, user }
      return res.status(201).json(newUser);
    }
  })
  .catch( err => {
    return sendError( 'This function is currently unavailable', err );
  })
})

//delete user
router.delete('/:id', (req, res) => {
  //set id
  const ID = req.params.id
  //grab user information 
  Users.getById(ID)
  .then( user => { 
    if (user === undefined) {
      return sendMissing(res);
    }
    else{
      return res.status(200).json(user);
    }
  })
  .catch( err => {
    return sendError( 'This function is currently unavailable', err );
  })
  //delete the user
  Users
  .remove(ID)
  .then( user => { 
    if (user === undefined) {
      return sendMissing(res);
    }
    else{
      return res.status(200).json(user);
    }
  })
  .catch( err => {
    return sendError( 'This function is currently unavailable', err );
  })
})

//new user
router.post('/', (req, res) => {
  //define req.body
  const { name } = req.body;
  const user = { name };

  //check the req body
  if(!name) { 
    return res.status(400).json({ error: 'Please provide the NEW user name' });
  }
  Users
  .insert(user)
  .then( person => {
    let newUser = { ...person }
    res.status(200).json(newUser);
  })
  .catch( err => {
    return sendError( 'This function is currently unavailable', err );
  })
})


//export
module.exports = router;