const express = require('express');
const router = express.Router();
const path = require('path');
const { getJSONData } = require('../utils/jsonBinService');

router.get('/', async (req, res) => {
    res.render('home.ejs');
});

module.exports = router;