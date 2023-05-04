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
