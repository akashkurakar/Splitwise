'use strict'
var cors = require('cors');

const con = require('./db/db')

const express = require('express');

const app = express();

const api = require('./api/router.js');

const port = 3001;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.listen(port, console.log('Server is listening on port :', port));

app.use('/api', api);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

con.connect( err => {
  if (err) {
    console.log(`Failed to connect to the database. ${err.stack}`);
  }
});

con.on('error', err => console.log(err.stack));
