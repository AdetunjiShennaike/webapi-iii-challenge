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

//export
module.exports = router;