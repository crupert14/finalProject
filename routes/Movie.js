const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
    const response = await fetch(`https://www.omdbapi.com/?t=joker&apikey=${process.env.OMDB_KEY}`);
    const data = await response.json();
  
    console.log(data);
  
    //img: data["Search"][7].Poster, **Only works when an array of JSON objects is returned using the s= parameter

    if(data.Response != 'False') {
        res.render('movieView.ejs', {
        img: data.Poster,
        title: data.Title,
        year: data.Year,
        rated: data.Rated,
        released: data.Released,
        runtime: data.Runtime,
        genre: data.Genre,
        summary: data.Plot,
        cast: data.Actors,
        director: data.Director,
        writers: data.Writer,
        languages: data.Language,
        country: data.Country,
        awards: data.Awards,
        imdbrating: data.imdbRating,
        rt: data.Ratings[1].Value,
        meta: data.Metascore,
        boxoffice: data.BoxOffice
        });
    }
    else {
        res.send(data.Error); //Will make dedicated error page
    }
  });

module.exports = router;