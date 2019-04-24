//import express, cors, helmet, and morgan
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

//import the routers
const userRouter = require('./Routes/userRouter');
const postRouter = require('./Routes/postRouter');

//define the server and add use imports
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('common'));


//load the routes that were imported
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter)

//check to see if the server is running 
server.get('/', (req, res) => {
  res.send(`
    <h1> You Complete Me! </h1>
  `)
})

//export 
module.exports = server;
