const express = require('express');
const router = express.Router();
const path = require('path');

const isAuthenticated = require('../../middleware/authenticated.js');

router.get("/", isAuthenticated, (req, res) => {
    res.render('sideNavBar/profile.ejs')
});

module.exports = router;