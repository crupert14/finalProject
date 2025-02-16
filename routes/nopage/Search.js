const express = require('express');
const router = express.Router();
const path = require('path');
require('dotenv').config();

const { getMovieBySearch } = require('../../utils/omdbService');

const searchResults = async(query) => {
    const movies = await getMovieBySearch(query, "s");
    return movies.Search;
};

// API route to handle search requests
router.get('/Search', async (req, res) => {
    const query = req.query.q;
    const results = await searchResults(query);
    res.json(results);
});

module.exports = router;