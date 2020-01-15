const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

// MongoDB
mongoose.connect(
  'mongodb+srv://omnistack:omnistack@cluster0-ohfxr.mongodb.net/week10?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Express
app.use(express.json()); // Allow JSON body
app.use(routes);

app.listen(3333);
