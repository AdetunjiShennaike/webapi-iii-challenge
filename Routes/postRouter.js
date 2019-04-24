//import express
const express = require('express');

//import database
const Posts = require('../data/helpers/postDb');

//define the router
const router = express.Router();

//make a constant reply for 404 & 500
const sendError = (msg, res) => {
  res.status(500);
  res.json({ errorMessage: `${msg}` })
};

const sendMissingID = (res) => {
  res.status(404);
  res.json({ errorMessage: 'The post with the specified ID does not exist.' });
}

//make crud endpoints
//get request
router.get('/', (req, res) => {
  Posts
  .get()
  .then( post => {
    res.status(200).json(post);
  })
  .catch( err => {
    return sendError( 'Post information Unavailable at this moment', err );
  })
})

//get post by id
router.get('/:id', (req, res) => {
  //define id
  const ID = req.params.id
  Posts
  .getById(ID)
  .then( post => {
    console.log(post);
    if (post === undefined) {
      return sendMissingID(res);
    }
    else{
      return res.status(200).json(post);
    }
  })
  .catch( err => {
    return sendError( 'post information Unavailable at this moment', err );
  })
})

//update post
router.put('/:id', (req, res) => {
  //define id 
  const ID = req.params.id

  //define req.body
  const name = req.body;
  const post = { name };

  //check the req body
  if(!name) { 
    return res.status(400).json({ error: 'Please provide the NEW post name' });
  }
  Posts
  .update(ID, post)
  .then( person => {
    if (person === undefined) {
      return sendMissingID(res);
    }
    else{
      newPost = { ...person, post }
      return res.status(201).json(newPost);
    }
  })
  .catch( err => {
    return sendError( 'This function is currently unavailable', err );
  })
})

//delete post
router.delete('/:id', (req, res) => {
  //set id
  const ID = req.params.id
  //grab post information 
  Posts.findById(ID)
  .then( post => { 
    if (post === undefined) {
      return sendMissingID(res);
    }
    else{
      return res.status(200).json(post);
    }
  })
  .catch( err => {
    return sendError( 'This function is currently unavailable', err );
  })
  //delete the post
  Posts
  .remove(ID)
  .then( post => { 
    if (post === undefined) {
      return sendMissingID(res);
    }
    else{
      return res.status(200).json(post);
    }
  })
  .catch( err => {
    return sendError( 'This function is currently unavailable', err );
  })
})

//new post
router.post('/', (req, res) => {
  //define req.body
  const name = req.body;
  const post = { name };

  //check the req body
  if(!name) { 
    return res.status(400).json({ error: 'Please provide the NEW post name' });
  }
  Posts
  .insert(post)
  .then( person => {
    let newPost = { ...person, post }
    res.status(200).json(newPost);
  })
  .catch( err => {
    return sendError( 'This function is currently unavailable', err );
  })
})



//export
module.exports = router;