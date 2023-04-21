const { GET_MOVIE_POPULAR_LIST, GET_MOVIE_DETAIL } = require("../../api/url/enum/movie.api.url");

const THE_MOVIE_API_URL=process.env.THE_MOVIE_API_URL;
const THE_MOVIE_API_KEY=process.env.THE_MOVIE_API_KEY;

const getMovieUrl_kor = (uri, additionalOption = null) => {
    let fulldomain = `${THE_MOVIE_API_URL}${uri}`;
    const option={
        'api_key' : THE_MOVIE_API_KEY,
        'language' : 'ko',
        ...additionalOption,
    }
    let urlOption = new URLSearchParams(option);
    return `${fulldomain}?${urlOption.toString()}`;
}

const MovieRewrites = [
    {
        source : `/${GET_MOVIE_POPULAR_LIST}/:page`,
        destination : getMovieUrl_kor(`/3/movie/popular`, {page:':page'}),
    },
    {
        source : `/${GET_MOVIE_DETAIL}/:movieid`,
        destination : getMovieUrl_kor('/3/movie/:movieid')
    }
]



module.exports = {
    MovieRewrites,
}