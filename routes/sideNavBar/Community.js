const express = require('express');
const router = express.Router();
const path = require('path');
const { getJSONData } = require('../../utils/jsonBinService');

router.get('/', async (req, res) => {
    const data = await getJSONData(process.env.JSONBIN_ANNOUNCEMENT_BINDID);
    const resp = data.announcements;

    res.render('sideNavBar/community.ejs', {
        announcements: resp
    })    
});

module.exports = router;