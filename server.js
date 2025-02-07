const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()

//app.set('views',  'public');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.get('/', async (req, res) => {
    const response = await fetch(`https://www.omdbapi.com/?t=bladerunner&apikey=${process.env.OMDB_KEY}`);
    const data = await response.json();

    console.log(data);

    res.render('sample.ejs', {
      img: data.Poster,
      title: data.Title,
      year: data.Year,
      rated: data.Rated,
      released: data.Released,
      runtime: data.Runtime,
      genre: data.Genre
    });
});