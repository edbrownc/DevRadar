const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./websocket');
const app = express();
const server = http.Server(app);

setupWebSocket(server);

// MongoDB
mongoose.connect(
  'mongodb+srv://omnistack:omnistack@cluster0-ohfxr.mongodb.net/week10?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// cors
app.use(cors());

// Express
app.use(express.json()); // Allow JSON body
app.use(routes);

server.listen(3333);
