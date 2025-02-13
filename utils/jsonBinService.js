require('dotenv').config

const url = "https://api.jsonbin.io/v3/b/"+process.env.JSONBIN_USER_BINID+"?meta=false";

const getMovieBySearch = async (search, type) => {
    const data = await fetch(`https://www.omdbapi.com/?${type}=${search}&apikey=${process.env.OMDB_KEY}`);
    const response = await data.json();
    return response;
}

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

async function updateJSONData(users) {
    return fetch(url, {
        method: "PUT",
        headers: {
            "X-Master-Key": process.env.JSONBIN_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ users })
    });
}

module.exports =  { getJSONData, updateJSONData, getMovieBySearch };