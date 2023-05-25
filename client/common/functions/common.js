export const CheckValidDate = (date) => {
    return date && Object.prototype.toString.call(new Date(date)) === '[object Date]';
}

export const getAgeByDate = (date) => {
    return new Date().getFullYear() - new Date(date).getFullYear();
}