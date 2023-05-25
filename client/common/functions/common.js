export const CheckValidDate = (date) => {
    return date && Object.prototype.toString.call(new Date(date)) === '[object Date]';
}