export default class Movie_detail {
    constructor (budget, genres, homepage, id,
                     original_title, original_language, overview, popularity, poster_path,
                     production_companies, production_contries, release_date, revenue, runtime,
                     spoken_language, status, tagline, title, video, vote_average, vote_account) {
        this.budget = budget;
        this.genres = genres;
        this.homepage = homepage;
        this.id = id;
        this.original_title = original_title;
        this.original_language = original_language;
        this.overview = overview;
        this.popularity = popularity;
        this.poster_path = poster_path;
        this.production_companies = production_companies;
        this.production_contries = production_contries;
        this.release_date = release_date;
        this.revenue = revenue;
        this.runtime = runtime;
        this.spoken_language = spoken_language;
        this.status = status;
        this.tagline = tagline;
        this.title = title;
        this.video = video;
        this.vote_average = vote_average;
        this.vote_account = vote_account;
    }
    getVoteAverage(){
        return Number.parseFloat(this.vote_average).toFixed(1);
    }

    getRevenuAsString(){
        let USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        if(typeof this.budget === "number") {
            return USDollar.format(this.revenue).toString();
        } else {
            return '---';
        }
    }

    getBudgetAsString(){
        let USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        if(typeof this.budget === "number") {
            return USDollar.format(this.budget).toString();
        } else {
            return '---';
        }
    }
    getOriginalLanguage(){
        const lang = new Intl.DisplayNames(['ko'], {type: 'language'});
        return lang.of(this.original_language);
    }
    getImageFullPath(){
        return `https://image.tmdb.org/t/p/w500/${this.poster_path}`;
    }
    getPopularity(){
        return Number.parseInt(this.popularity);
    }
    getMovieStatus(){
        //Allowed Values: Rumored, Planned, In Production, Post Production, Released, Canceled
        switch (this.status) {
            case 'Rumored':
                return '예정없음'
            case 'Planned':
                return '기획중'
            case 'In Production':
                return '제작중'
            case 'Post Production':
                return '사전발표 중'
            case 'Released' : 
                return '개봉됨'
            case 'Canceled' :
                return '제작취소'
        }
    }
    createMovieByApiData(movieApiData) {
        if(!movieApiData) {
            return {};
        }
        const {budget, genres, homepage, id,
            original_title, original_language, overview, popularity, poster_path,
            production_companies, production_contries, release_date, revenue, runtime,
            spoken_language, status, tagline, title, video, vote_average, vote_account} = movieApiData;
        return new Movie_detail(budget, genres, homepage, id,
            original_title, original_language, overview, popularity, poster_path,
            production_companies, production_contries, release_date, revenue, runtime,
            spoken_language, status, tagline, title, video, vote_average, vote_account);
    }
}