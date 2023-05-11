import { getMovieListForGetMovieInfo, movieLikeListForUser } from "../../api/movie";

export const movieListAttachLikeStatus = async (movieList) => {
    const {data} = await movieLikeListForUser();
    if (data) {
        const dataMap = data.reduce((newObj, obj) => {
            newObj[obj.movieid] = obj.status;
            return newObj;
        }, {});
        const resultList = movieList.map((item, index) => {
            return {
                ...item,
                likeStatus : dataMap[item.id] ? dataMap[item.id] : false,
            }
        })
        return resultList;
    }
    return movieList;
}
export const movieListAttachLikeCount = async (movieList) => {
    const param = movieList.map((item, index) => {
        return {
            movieid:item.id,
        }
    })
    const {data} = await getMovieListForGetMovieInfo(param);

    if(data) {

        const dataMap = data.reduce((newObj, obj) => {
            newObj[obj.movieid] = obj.likeCount;
            return newObj;
        }, {});
        
        const resultList = movieList.map((item, index) => {
            return {
                ...item,
                likeCount : dataMap[item.id] ? dataMap[item.id] : 0
            }
        })
        return resultList;
    }
    return movieList;
}