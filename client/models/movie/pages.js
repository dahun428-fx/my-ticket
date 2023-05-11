export default class MoviePages {
    constructor(total_pages, total_results){
        this.total_pages = total_pages >= 500 ? 500 : total_pages;
        this.total_results = total_results;
    }
    getTotalPages(){
        return this.total_pages;
    }
    getTotalResults(){
        return this.total_results;
    }
    createMoviePagesByApiData(data) {
        if(!data || !data.total_pages) {
            return {};
        }
        const {total_pages, total_results} = data;
        return new MoviePages(total_pages, total_results);
    }
}