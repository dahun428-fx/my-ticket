
export default class Movie {
    constructor(original_title, overview, poster_path, release_date, title, vote_average, vote_count, id, genre_ids, likeCount, likeStatus) {
        this.original_title = original_title;
        this.overview = overview;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.title = title;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
        this.id=id;
        this.likeCount = likeCount;
        this.likeStatus = likeStatus;
        this.genre_ids = genre_ids;
    }
 
    getMovieId(){
        return this.id;
    }

    getImageFullPath(){
        return `https://image.tmdb.org/t/p/w500/${this.poster_path}`;
    }

    getMovieGenres(){
    }

    createMovieByApiData(movieApiData) {
        if(!movieApiData) {
            return {};
        }
        const {original_title, overview, poster_path, release_date, title, vote_average, vote_count, id, likeCount, likeStatus, genre_ids} = movieApiData;
        return new Movie(original_title, overview, poster_path, release_date, title, vote_average, vote_count, id, genre_ids, likeCount, likeStatus);
    }
}