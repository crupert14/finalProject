const express = require('express');
const router = express.Router();
const path = require('path');
require('dotenv').config();
const { getJSONData, editParam } = require('../utils/jsonBinService');
const { getDate } = require('../utils/accountCreation');

router.get('/', async (req, res) => {
    res.render('login.ejs', {
        err: ""
    })    
});

router.post('/', async (req, res) => {
    let { user, pass } = req.body;

    if(pass == "" || user == "") {
        return res.render('login.ejs', {
            err: "No field can be left blank!"
        });
    }

    try {
        const data = await getJSONData(process.env.JSONBIN_USER_BINID);
        const validUser = data.users.find(u => u.username === user && u.password === pass);

        if (validUser) {
            req.session.user = { username: user, pfp: validUser.pfp || '/imgs/defaultPFP.png' };
            await editParam(process.env.JSONBIN_USER_BINID, user, "lastOnline", getDate());
            res.redirect('/Profile');
        } else {
            res.render('login.ejs', {
                err: "Not logged in"
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;