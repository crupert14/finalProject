const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
    res.render('login.ejs', {
        err: ""
    })    
});

router.post('/', async (req, res) => {
    let { user, pass } = req.body;

    let User = {
        username: user,
        password: pass
    }

    if(pass == "" || user == "") {
        res.render('login.ejs', {
            err: "No field can be left blank!"
        });
    }

    const url = "https://api.jsonbin.io/v3/b/"+process.env.JSONBIN_USER_BINID+"?meta=false";

    const getJSONData = async () => {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Master-Key': process.env.JSONBIN_KEY,
                'Content-Type': 'application/json'
            }   
        });

        let data = await response.json();
    
        delete data.metadata;
        delete data.records;

        data = JSON.parse(JSON.stringify(data));
        return data;
    };

    try {
        const data = await getJSONData();

        const validUser = data.users.find(u => u.username === user && u.password === pass);

        if (validUser) {
            req.session.user = { username: user };
            res.redirect('/Login');
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