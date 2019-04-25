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

//define custom middleware that will be used 
const upperCase = (req, res, next) => {
  let { name } = req.body;
  capitalName = name.charAt(0).toUpperCase() + name.slice(1)

  if (name !== capitalName) {
    return sendError( 'Please make sure your name starts with a Capital', res );
  }
  else{ 
    next();
  }
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
    return sendError( 'User information Unavailable at this moment', res );
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
    return sendError( 'User information Unavailable at this moment', res );
  })
})

//get users post data
router.get('/:id/posts', (req, res) => {
  //define id
  const ID = req.params.id
  Users
  .getUserPosts(ID)
  .then( user => {
    if (user.length == 0) {
      return sendMissing(res);
    }
    else{
      return res.status(200).json(user);
    }
  })
  .catch( err => {
    return sendError( 'User information Unavailable at this moment', res );
  })
})

//update user
router.put('/:id', upperCase, (req, res) => {
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
      newUser = { ID, name }
      return res.status(201).json(newUser);
    }
  })
  .catch( err => {
    return sendError( 'This function is currently unavailable', res );
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
    return sendError( 'This function is currently unavailable', res );
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
    return sendError( 'This function is currently unavailable', res );
  })
})

//new user
router.post('/', upperCase, (req, res) => {
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
    res.status(200).json(person);
  })
  .catch( err => {
    console.log(err)
    return sendError( 'This function is currently unavailable', res );
  })
})


//export
module.exports = router;