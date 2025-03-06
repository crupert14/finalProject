const express = require('express');
const router = express.Router();
const path = require('path');
require('dotenv').config();

const { getJSONData, updateJSONData } = require('../utils/jsonBinService');
const { getDate } = require('../utils/accountCreation');

router.get('/', async (req, res) => {
    res.render('signup.ejs', { 
        err: ""
    })    
});

router.post('/', async (req, res) => {

    let { user, pass, passconf } = req.body;

    let User = {
        username: user,
        password: pass
    }

    if(pass != passconf) {
        res.render('signup.ejs', {
            err: "Passwords don't match!"
        });
    }
    else if(pass == "" || passconf == "" || user == "") {
        res.render('signup.ejs', {
            err: "No field can be left blank!"
        });
    }

    try {
        let data = await getJSONData(process.env.JSONBIN_USER_BINID);
        const userExists = data.users.some(u => u.username === user);

        if(userExists) {
            res.render('signup.ejs', {
                err: "Username already in use"
            });
        }
        else {
            data.users.push({
                username: user, 
                password: pass, 
                pfp: "/imgs/defaultPFP.png",
                bio: "",
                lastOnline: getDate(),
                favorites: [],
                forumPosts: [],
                reviews: [],
                hypeVotes: []
            });

            const updateResponse = await updateJSONData({users: data.users}, process.env.JSONBIN_USER_BINID);

            if (!updateResponse.ok)  {
                throw new Error("Failed to update bin");
            }
            else {
                req.session.user = { username: user, pfp: '/imgs/defaultPFP.png' };
                res.redirect('/');
            }

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
    
});

module.exports = router;