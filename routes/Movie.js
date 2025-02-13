const express = require('express');
const router = express.Router();
const path = require('path');

const { getMovieBySearch } = require('../utils/omdbService');

router.get('/', async (req, res) => {
    const data = await getMovieBySearch(encodeURIComponent(req.query.title), "t");

    console.log(data);

    if(data.Response != 'False') {
        res.render('movieView.ejs', {
            img: data.Poster || 'default-image.jpg', // Use a default image if Poster is missing
            title: data.Title || 'Unknown Title', // Default title if missing
            year: data.Year || 'Unknown Year', // Default year
            rated: data.Rated || 'N/A', // Default rating
            released: data.Released || 'Unknown Release Date', // Default release date
            runtime: data.Runtime || 'Unknown Runtime', // Default runtime
            genre: data.Genre || 'Unknown Genre', // Default genre
            summary: data.Plot || 'No plot available.', // Default summary
            cast: data.Actors || 'No cast information available.', // Default cast
            director: data.Director || 'Unknown Director', // Default director
            writers: data.Writer || 'Unknown Writer', // Default writers
            languages: data.Language || 'Unknown Languages', // Default language
            country: data.Country || 'Unknown Country', // Default country
            awards: data.Awards || 'No awards available.', // Default awards
            imdbrating: data.imdbRating || 'N/A', // Default IMDB rating
            rt: data.Ratings?.[1]?.Value || 'N/A', // Default Rotten Tomatoes rating (check if Ratings[1] exists)
            meta: data.Metascore || 'N/A', // Default Metascore
            boxoffice: data.BoxOffice || 'N/A' // Default Box Office
        });
    }
    else {
        res.send(data.Error); //Will make dedicated error page
    }
  });

module.exports = router;