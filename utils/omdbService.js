require('dotenv').config();

const getMovieBySearch = async (search, type) => {
    const data = await fetch(`https://www.omdbapi.com/?${type}=${search}&apikey=${process.env.OMDB_KEY}`);
    const response = await data.json();
    return response;
}

module.exports = { getMovieBySearch }