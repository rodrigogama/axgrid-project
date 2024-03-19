const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = 3000;

// JSON server router
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// use default middlewares
app.use(middlewares);
app.use(jsonServer.bodyParser); // handle POST, PUT and PATCH
app.use('/api', router); // serve json-server under /api route

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Example of emitting a message to clients
  socket.emit('welcome', { message: 'Welcome to the Real-time API' });
});

httpServer.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});