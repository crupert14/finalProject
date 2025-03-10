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

//Base Routes
const movieViewRoute = require('./routes/Movie');
const homeRoute = require('./routes/Home');
//No page
const logoutRoute = require('./routes/nopage/Logout');
const searchRoute = require('./routes/nopage/Search');
//Top Nav Bar
const signupRoute = require('./routes/Signup');
const loginRoute = require('./routes/Login');
const moviesRoute = require('./routes/Movies');
//Side Nav Bar
const profileRoute = require('./routes/Profile');
const communityRoute = require('./routes/Community');

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
app.use('/Profile', profileRoute);
app.use('/Community', communityRoute);

app.listen(process.env.PORT, () => {
  console.log('Server listening on port ' + process.env.PORT);
});