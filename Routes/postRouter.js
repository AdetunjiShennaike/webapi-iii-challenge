//import express
const express = require('express');

//import database
const Posts = require('../data/helpers/postDb');

//define the router
const router = express.Router();

//make a constant reply for 404 & 500
const sendError = (msg, res) => {
  res.status(500).json({ errorMessage: `${msg}` })
};

const sendMissingID = (res) => {
  res.status(404).json({ errorMessage: 'The post with the specified ID does not exist.' });
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
    return sendError( 'Post information Unavailable at this moment', res );
  })
})

//get post by id
router.get('/:id', (req, res) => {
  //define id
  const ID = req.params.id
  Posts
  .getById(ID)
  .then( post => {
    if (post === undefined) {
      return sendMissingID(res);
    }
    else{
      return res.status(200).json(post);
    }
  })
  .catch( err => {
    return sendError( 'post information Unavailable at this moment', res );
  })
})

//update post
router.put('/:id', (req, res) => {
  //define id 
  const ID = req.params.id

  //define req.body
  const text = req.body;
  const posted = { text };

  //check the req body
  if(!text) { 
    return res.status(400).json({ error: 'Please provide the NEW post text' });
  }
  Posts
  .update(ID, posted)
  .then( person => {
    if (person === undefined) {
      return sendMissingID(res);
    }
    else{
      newPost = { ...person, posted }
      return res.status(201).json(newPost);
    }
  })
  .catch( err => {
    return sendError( 'This function is currently unavailable', res );
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
    return sendError( 'This function is currently unavailable', res );
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
    return sendError( 'This function is currently unavailable', res );
  })
})

//new post
router.post('/', (req, res) => {
  //define req.body
  const { text } = req.body;
  const posted = text;

  console.log(text, posted)
  //check the req body
  if(!text) { 
    return res.status(400).json({ error: 'Please provide the NEW post text' });
  }
  Posts
  .insert(req.body)
  .then( post => {
    // console.log(post)
    // let newPost = { ...post, posted }
    res.status(200).json(post);
  })
  .catch( err => {
    console.log(err)
    return sendError( 'This function is currently unavailable', res );
  })
})



//export
module.exports = router;