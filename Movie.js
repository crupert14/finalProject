const express = require('express');
const router = express.Router();
const path = require('path');

const { getMovieBySearch } = require('../utils/omdbService');

router.get('/', async (req, res) => {

    const title = req.query.title;
    const data = await getMovieBySearch(title, "t");

    async function getSimilarMovies() {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${data.Title}`;
        const resp = await fetch(url);
        const data2 = await resp.json();

        if (!data2.results || data2.results.length === 0) return [];

        const id = data2.results[0].id;
        const similarURL = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_KEY}`;
        const similarResponse = await fetch(similarURL);
        const similarData = await similarResponse.json();
        
        console.log(similarData);

        return similarData.results.slice(0,10);
    }

    const similarMovies = await getSimilarMovies();

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
            boxoffice: data.BoxOffice || 'N/A', // Default Box Office
            similarMovies: similarMovies || []
        });
    }
    else {
        res.send(data.Error); //Will make dedicated error page
    }
  });

module.exports = router;