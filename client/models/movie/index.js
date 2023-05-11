
export default class Movie {
    constructor(original_title, overview, poster_path, release_date, title, vote_average, vote_count, id, genre_ids, popularity, likeCount, likeStatus) {
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
        this.popularity = popularity;
    }
 
    getMovieId(){
        return this.id;
    }

    getImageCardSize(){
        //https://www.themoviedb.org/t/p/w220_and_h330_face/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg
        return `https://www.themoviedb.org/t/p/w220_and_h330_face${this.poster_path}`;
    }

    getImageFullPath(){
        //	https://www.themoviedb.org/t/p/w300_and_h450_bestv2/2LfL0flDTgwJgoEhO9NhDLeDTTK.jpg
        return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.poster_path}`;
    }

    getMovieGenres(){
    }
    getPopularity(){
        return Number.parseInt(this.popularity);
    }

    createMovieByApiData(movieApiData) {
        if(!movieApiData) {
            return {};
        }
        const {original_title, overview, poster_path, release_date, title, vote_average, vote_count, id, likeCount, likeStatus, genre_ids, popularity} = movieApiData;
        return new Movie(original_title, overview, poster_path, release_date, title, vote_average, vote_count, id, genre_ids, popularity, likeCount, likeStatus);
    }
}