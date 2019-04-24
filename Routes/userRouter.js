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

})


//export
module.exports = router;