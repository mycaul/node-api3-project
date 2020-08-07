
const express = require('express');
const helmet = require('helmet');
const server = express();

const {logger, notFound} = require('./middleware/middleware')
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter')


server.use(helmet());
server.use(logger);
server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(notFound)

module.exports = server;