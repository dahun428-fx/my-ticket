export const SORT_POPULARITY = 1;
export const SORT_RELEASE_DATE = 2;
export const SORT_LIKE = 3;
export const SORT_VOTE_AVERAGE = 4;
export const ORDER_BY_DESC=1;
export const ORDER_BY_ASC=2;

export const toMessageSort = (sortType) => {
    let message = "";
    switch (sortType) {
        case SORT_POPULARITY:
            message = "인기순"
            break;
        case SORT_RELEASE_DATE:
            message = "날짜순"
            break;
        case SORT_LIKE:
            message = "좋아요순"
            break;
        case SORT_VOTE_AVERAGE:
            message = "평점순"
            break;
    }
    return message;
}
export const toMessageOrderBy = (orderType) => {
    let message = "";
    switch (orderType) {
        case ORDER_BY_DESC:
            message = "내림차순"
            break;
        case ORDER_BY_ASC:
            message = "오름차순"
            break;
    }
    return message;
}
export const sortingExcute = (list, compareItemName, compareItemType, orderType = null) => {
    let newList = [...list].sort((a,b) => {
        if(compareItemType === 'date') {
            if(orderType === 1) {
                return new Date(b[compareItemName]) - new Date(a[compareItemName]);
            }
            return new Date(a[compareItemName]) - new Date(b[compareItemName]);
        } else {
            if(orderType === 1) {
                return b[compareItemName] - a[compareItemName];
            }
            return a[compareItemName] - b[compareItemName];
        }
    })
    return newList;
}
export const changeMovieListBySortingAndOrderBy = (movieList, sortVal, orderVal) => {
    sortVal = Number.parseInt(sortVal);
    orderVal = Number.parseInt(orderVal);
    let sortedMovieList = [];
    switch (sortVal) {
        case SORT_POPULARITY:
            sortedMovieList = sortingExcute(movieList, 'popularity', 'object', orderVal);
            break;
        case SORT_RELEASE_DATE:
            sortedMovieList = sortingExcute(movieList, 'release_date', 'date', orderVal);
            break;
        case SORT_LIKE:
            sortedMovieList = sortingExcute(movieList, 'likeCount', 'object', orderVal);
            break;
        case SORT_VOTE_AVERAGE:
            sortedMovieList = sortingExcute(movieList, "vote_average", 'object', orderVal);
            break;
        default:
            sortedMovieList = sortingExcute(movieList, 'popularity', 'object', orderVal);
            break;
    }
    return sortedMovieList;
}