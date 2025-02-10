const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()

//app.set('views',  'public');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

const movieViewRoute = require('./routes/Movie');
const homeRoute = require('./routes/Home');

app.use('/', homeRoute);
app.use('/MovieInfo', movieViewRoute);

app.listen(process.env.PORT, () => {
  console.log('Server listening on port ' + process.env.PORT);
});