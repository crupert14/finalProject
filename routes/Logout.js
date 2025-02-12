const express = require('express');
const router = express.Router();
const path = require('path');

router.get("/", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Could not log out.");
        }
        res.redirect('/');
    });
});

module.exports = router;