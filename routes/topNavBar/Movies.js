const express = require('express');
const router = express.Router();
const path = require('path');

const { getMovieBySearch } = require('../../utils/omdbService');

router.get("/", async (req, res) => {
    if(req.query.title != undefined) {
        const title = req.query.title;
        const data = await getMovieBySearch(title, "t");
    }
    res.render('Movies.ejs');
});

module.exports = router;