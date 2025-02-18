const express = require('express');
const router = express.Router();
const path = require('path');

router.get("/", (req, res) => {
    res.render('sideNavBar/profile.ejs')
});

module.exports = router;