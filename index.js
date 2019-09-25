const Joi = require('Joi')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const contacts = require('./routes/contacts');
const users = require('./routes/users');
const config = require('config');
const auth = require('./routes/auth');


if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/biodata')
 .then( () => console.log('Connected to MongoDB...'))
 .catch( err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/contacts' , contacts);
app.use('/api/users' , users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Listening on port ${port}...`));