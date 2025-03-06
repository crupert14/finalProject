const express = require('express');
const router = express.Router();
const path = require('path');
require('dotenv').config

const isAuthenticated = require('../middleware/authenticated.js');
const { getJSONData, editParam } = require('../utils/jsonBinService.js');

router.get("/", isAuthenticated, async (req, res) => {
    const data = await getJSONData(process.env.JSONBIN_USER_BINID);
    let user = data.users.find(user => user.username === req.session.user.username);

    req.session.user.pfp = user.pfp;
    
    res.render('profile.ejs', {
        bio: user.bio,
        pfp: req.session.user.pfp
    })
});

router.post("/editBio", isAuthenticated, async (req, res) => {
    const bio = req.body.bio;
    await editParam(process.env.JSONBIN_USER_BINID, req.session.user.username, "bio", bio);
    res.redirect('/Profile');
});

router.post("/editPhoto", isAuthenticated, async (req, res) => {
    const pfp = req.body.photo;
    await editParam(process.env.JSONBIN_USER_BINID, req.session.user.username, "pfp", pfp);
    req.session.user.pfp = req.body.photo;
    res.redirect('/Profile');
});

module.exports = router;