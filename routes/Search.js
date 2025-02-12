const express = require('express');
const router = express.Router();
const path = require('path');
require('dotenv').config();

const searchResults = async(query) => {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${process.env.OMDB_KEY}`);
    const movies = await response.json();
    return movies.Search;
};

// API route to handle search requests
router.get('/Search', async (req, res) => {
    const query = req.query.q;
    const results = await searchResults(query);
    res.json(results);
});

module.exports = router;