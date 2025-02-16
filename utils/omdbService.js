require('dotenv').config();

const getMovieBySearch = async (search, type) => {
    const title = encodeURIComponent(search).replace(/[!'()*]/g, "%27");
    const data = await fetch(`https://www.omdbapi.com/?${type}=${title}&apikey=${process.env.OMDB_KEY}`);
    const response = await data.json();
    return response;
}

module.exports = { getMovieBySearch }