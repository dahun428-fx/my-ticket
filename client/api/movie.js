// import axios from '../middleware/axiosInterceptorHook';
import axios from 'axios';
import { GET_MOVIE_POPULAR_LIST } from './url/enum/movie.api.url';

export const movieGetPopularList = async (pageNumber) => {
    return await axios.get(`/${GET_MOVIE_POPULAR_LIST}/${pageNumber}`);
}