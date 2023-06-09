const GET_MOVIE_POPULAR_LIST=`movie/popular`
const GET_MOVIE_NOW_PLAYING=`movie/nowplaying`
const GET_MOVIE_UPCOMMING=`movie/upcomming`
const GET_MOVIE_GENRES=`movie/genres`
const SEARCH_MOVIE=`movie/search`
const GET_MOVIE_DETAIL=`movie/detail`
const GET_MOVIE_KEYWORD=`movie/keyword`
const GET_MOVIE_SIMILAR=`movie/similar`
//ACTOR AND CREW
const GET_MOVIE_CREDITS=`movie/credits`
const GET_MOVIE_ACTOR_DETAIL=`movie/credits/detail`;
const GET_ACTOR_MOVIE_LIST=`movie/credits/movie-list`;
const GET_ACTOR_PERSON_DETAIL=`movie/person/detail`;
const GET_ACTOR_SNS_IDS=`movie/person/ids`;


//search keyword
const SEARCH_KEYWORD=`movie/keyword`
const GET_MOVIE_LIST_BY_KEYWORDS=`movie/search-keyword`

const GET_MOVIE_LIKE=`/api/get/movielike`
const ADD_MOVIE_LIKE=`/api/add/movielike`
const GET_MOVIE_LIKE_BY_USER=`/api/list/movielike-user`
const GET_MOVIE_LIST=`/api/list/movie`



module.exports = {
    GET_MOVIE_POPULAR_LIST,
    GET_MOVIE_DETAIL,
    GET_MOVIE_LIKE,
    ADD_MOVIE_LIKE,
    GET_MOVIE_LIKE_BY_USER,
    GET_MOVIE_LIST,
    GET_MOVIE_NOW_PLAYING,
    GET_MOVIE_UPCOMMING,
    GET_MOVIE_GENRES,
    SEARCH_MOVIE,
    GET_MOVIE_KEYWORD,
    GET_MOVIE_SIMILAR,
    GET_MOVIE_CREDITS,
    SEARCH_KEYWORD,
    GET_MOVIE_LIST_BY_KEYWORDS,
    GET_MOVIE_ACTOR_DETAIL,
    GET_ACTOR_MOVIE_LIST,
    GET_ACTOR_PERSON_DETAIL,
    GET_ACTOR_SNS_IDS
}