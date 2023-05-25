const {ServerURL} = require('../config.export.module');

let SERVER_BASE_URL = ServerURL();

const { GET_MOVIE_POPULAR_LIST, GET_MOVIE_DETAIL, GET_MOVIE_LIKE, GET_MOVIE_LIKE_BY_USER, ADD_MOVIE_LIKE, GET_MOVIE_LIST, GET_MOVIE_NOW_PLAYING, GET_MOVIE_UPCOMMING, GET_MOVIE_GENRES, SEARCH_MOVIE, GET_MOVIE_KEYWORD, GET_MOVIE_SIMILAR, GET_MOVIE_CREDITS, SEARCH_KEYWORD, GET_MOVIE_LIST_BY_KEYWORDS, GET_MOVIE_ACTOR_DETAIL, GET_ACTOR_MOVIE_LIST, GET_ACTOR_PERSON_DETAIL, GET_ACTOR_SNS_IDS } = require("../../api/url/enum/movie.api.url");

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
const getMovieUrl_en = (uri, additionalOption = null) => {
    let fulldomain = `${THE_MOVIE_API_URL}${uri}`;
    const option={
        'api_key' : THE_MOVIE_API_KEY,
        // 'language' : 'ko',
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
    },
    {
        source : `${GET_MOVIE_LIKE_BY_USER}`,
        destination : `${SERVER_BASE_URL}/api/v1/movie/get/like`
    },
    {
        source : `${GET_MOVIE_LIKE}/:movieid`,
        destination : `${SERVER_BASE_URL}/api/v1/movie/get/like/:movieid`
    },
    {
        source : `${ADD_MOVIE_LIKE}/:movieid`,
        destination : `${SERVER_BASE_URL}/api/v1/movie/add/like/:movieid`
    },
    {
        source : `${GET_MOVIE_LIST}`,
        destination : `${SERVER_BASE_URL}/api/v1/movie/get/movie`
    },
    {
        source : `/${GET_MOVIE_NOW_PLAYING}/:page`,
        destination : getMovieUrl_kor('/3/movie/now_playing', {page:':page'})
    },
    {
        source : `/${GET_MOVIE_UPCOMMING}/:page`,
        destination : getMovieUrl_kor('/3/movie/upcoming', {page:':page'})
    },
    {
        source : `/${GET_MOVIE_GENRES}`,
        destination : getMovieUrl_kor('/3/genre/movie/list'),
    },
    //search
    {
        source : `/${SEARCH_MOVIE}/:keyword/:page`,
        destination : getMovieUrl_kor('/3/search/movie', {page:':page', query:':keyword'}),
    },
    //keyword
    {
        source : `/${GET_MOVIE_KEYWORD}/:movieid`,
        destination : getMovieUrl_kor('/3/movie/:movieid/keywords')
    },
    //similar
    {
        source:`/${GET_MOVIE_SIMILAR}/:movieid`,
        destination : getMovieUrl_kor('/3/movie/:movieid/similar')
    },
    //credits
    {
        source:`/${GET_MOVIE_CREDITS}/:movieid`,
        destination: getMovieUrl_kor('/3/movie/:movieid/credits')
    },
    {
        source:`/${GET_MOVIE_ACTOR_DETAIL}/:actorid`,
        destination: getMovieUrl_kor('/3/credit/:actorid')
    },
    {
        source:`/${GET_ACTOR_MOVIE_LIST}/:personid`,
        destination: getMovieUrl_kor('/3/person/:personid/movie_credits')
    },
    {
        source: `/${GET_ACTOR_PERSON_DETAIL}/:personid`,
        destination: getMovieUrl_en(`/3/person/:personid`),
    },
    {
        source: `/${GET_ACTOR_SNS_IDS}/:personid`,
        destination: getMovieUrl_en('/3/person/:personid/external_ids')
    },
    //search keyword
    {
        source : `/${SEARCH_KEYWORD}/:keyword/:page`,
        destination : getMovieUrl_kor('/3/search/keyword', {page:':page', query:':keyword'})
    },
    //search movie by keyword
    {
        source : `/${GET_MOVIE_LIST_BY_KEYWORDS}/:keywordid`,
        destination : getMovieUrl_kor('/3/keyword/:keywordid/movies')
    }
]



module.exports = {
    MovieRewrites,
}