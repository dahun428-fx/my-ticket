const { GET_MOVIE_POPULAR_LIST } = require("../../api/url/enum/movie.api.url");

const THE_MOVIE_API_URL=process.env.THE_MOVIE_API_URL;
const THE_MOVIE_API_KEY=process.env.THE_MOVIE_API_KEY;

const MovieRewrites = [
    {
        source : `/${GET_MOVIE_POPULAR_LIST}/:page`,
        destination : `${THE_MOVIE_API_URL}${`/3/movie/popular?api_key=${THE_MOVIE_API_KEY}&page=:page`}`,
    }
]

module.exports = {
    MovieRewrites,
}