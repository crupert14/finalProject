const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()

//app.set('views',  'public');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

const movieViewRoute = require('./routes/Movie');

app.use('/MovieInfo', movieViewRoute);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.get('/', (req, res) => {
  res.send("in progress...")
})