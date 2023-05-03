import axiosInstance from '../middleware/axiosInterceptorHook';
import axios from 'axios';
import { ADD_MOVIE_LIKE, GET_MOVIE_GENRES, GET_MOVIE_LIKE, GET_MOVIE_LIKE_BY_USER, GET_MOVIE_LIST, GET_MOVIE_NOW_PLAYING, GET_MOVIE_POPULAR_LIST, GET_MOVIE_UPCOMMING, SEARCH_MOVIE } from './url/enum/movie.api.url';

export const movieGetPopularList = async (pageNumber) => {
    return await axios.get(`/${GET_MOVIE_POPULAR_LIST}/${pageNumber}`);
}
export const movieGetNowPlayingMovieList = async (pageNumber) => {
    return await axios.get(`/${GET_MOVIE_NOW_PLAYING}/${pageNumber}`);
}
export const movieGetUpcommingMovieList = async (pageNumber) => {
    return await axios.get(`/${GET_MOVIE_UPCOMMING}/${pageNumber}`);
}
export const getMovieGenres = async () => {
    return await axios.get(`/${GET_MOVIE_GENRES}`);
}
export const movieLikeListForUser = async () => {
    return await axiosInstance.get(`${GET_MOVIE_LIKE_BY_USER}`);
}
export const getMovieLikeByMovieid = async (movieid) => {
    return await axios.get(`${GET_MOVIE_LIKE}/${movieid}`);
}
export const movieAddOrCancleLike = async (req) => {
    return await axiosInstance.post(`${ADD_MOVIE_LIKE}/${req.movieid}`, req);
}
export const getMovieListForGetMovieInfo = async (req) => {
    return await axios.post(`${GET_MOVIE_LIST}`, req);
}
export const searchMovieList = async (req) => {
    if(!req.keyword) {
        return {};
    }
    return await axios.get(`/${SEARCH_MOVIE}/${req?.keyword}/${req.pageNumber}`);
}