const express = require('express');
const path = require('path');
const app = express();
const session = require("express-session");
require('dotenv').config()

//app.set('views',  'public');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 }
}));

const movieViewRoute = require('./routes/Movie');
const homeRoute = require('./routes/Home');
const signupRoute = require('./routes/Signup');
const loginRoute = require('./routes/Login');
const logoutRoute = require('./routes/Logout');
const searchRoute = require('./routes/Search');
const moviesRoute = require('./routes/Movies');

app.use((req, res, next) => {
  res.locals.loggedin = req.session.user ? true : false;
  res.locals.username = req.session.user ? req.session.user.username : null;
  next();
});

app.use('/', homeRoute);
app.use('/MovieInfo', movieViewRoute);
app.use('/Signup', signupRoute);
app.use('/Login', loginRoute);
app.use('/Logout', logoutRoute);
app.use(searchRoute);
app.use('/Movies', moviesRoute);

app.listen(process.env.PORT, () => {
  console.log('Server listening on port ' + process.env.PORT);
});