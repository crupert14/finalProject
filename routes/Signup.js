const express = require('express');
const router = express.Router();
const path = require('path');
require('dotenv').config();

router.get('/', async (req, res) => {
    res.render('signup.ejs', { err: "" })    
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

    const url = "https://api.jsonbin.io/v3/b/"+process.env.JSONBIN_USER_BINID+"?meta=false";

    const getJSONData = async () => {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Master-Key': process.env.JSONBIN_KEY,
                'Content-Type': 'application/json'
            }   
        });

        if (response.status !== 200) {
            throw new Error("cannot fetch data");
        }

        let data = await response.json();
    
        delete data.metadata;
        delete data.records;

        data = JSON.parse(JSON.stringify(data));
        return data;
    };

    try {
        let data = await getJSONData();
        const userExists = data.users.some(u => u.username === user);

        if(userExists) {
            res.render('signup.ejs', {
                err: "Username already in use"
            });
        }
        else {
            data.users.push({username: user, password: pass});

            users = data.users;

            const updateResponse = await fetch(url, {
                method: "PUT",
                headers: {
                    "X-Master-Key": process.env.JSONBIN_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ users })
            });

            if (!updateResponse.ok)  {
                throw new Error("Failed to update bin");
            }
            else {
                res.render('signup.ejs', {
                    err: "User successfully added"
                });
            }

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
    
});

module.exports = router;