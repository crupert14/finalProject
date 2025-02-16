require('dotenv').config

const getJSONData = async (binid) => {

    const url = `https://api.jsonbin.io/v3/b/${binid}?meta=false`;

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

async function updateJSONData(data, binid) {

    const url = `https://api.jsonbin.io/v3/b/${binid}?meta=false`;

    return fetch(url, {
        method: "PUT",
        headers: {
            "X-Master-Key": process.env.JSONBIN_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

module.exports = { getJSONData, updateJSONData };