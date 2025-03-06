const express = require('express');
const router = express.Router();
const path = require('path');
require('dotenv').config();

const { getMovieBySearch } = require('../utils/omdbService');
const { getJSONData, editParam } = require('../utils/jsonBinService');
const isAuthenticated = require('../middleware/authenticated');

router.get("/", async (req, res) => {
    if(req.query.title != undefined) {
        const title = req.query.title;
        const data = await getMovieBySearch(title, "t");
    }
    res.render('Movies.ejs');
});

router.post("/interact", isAuthenticated, async (req, res) => {
    const title = decodeURIComponent(req.body.movie);
    const data = await getJSONData(process.env.JSONBIN_USER_BINID);
    const user = req.session.user.username;
    const currentUser = data.users.find(u => u.username === user);

    let currentFavorites = currentUser.favorites;
    let currentHype = currentUser.hypeVotes;

    if(req.body.action == "load") {
        if(currentFavorites.includes(title)) {
            return res.json({ message: "favorited" });
        }
        else {
            return res.json({ message: "not favorited"});
        }
    }
    else if(req.body.action == "favorite" || req.body.action == "hype") {
        if(req.body.action == "favorite") {
            if(currentFavorites.includes(title)) {
                return res.json({ message: "Already added", method: "favorite" }); //Add error message
            }
            else {
                currentFavorites.push(title);
                await editParam(process.env.JSONBIN_USER_BINID, user, "favorites", currentFavorites);
            }
        }
        else {
            if(currentHype.includes(title)) {
                return res.json({ message: "Already added", method: "hype" }); //Add error message
            }
            else {
                currentHype.push(title);
                await editParam(process.env.JSONBIN_USER_BINID, user, "hypeVotes", currentHype);
            }
        }
    }
})

module.exports = router;