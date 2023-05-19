export default class MoviePerson {
    constructor (adult, gender, id, known_for_department, media_type, name, original_name, popularity, profile_path){
        this.adult = adult;
        this.gender =gender;
        this.id = id;
        this.known_for_department = known_for_department;
        this.media_type = media_type;
        this.name = name;
        this.original_name = original_name;
        this.popularity = popularity;
        this.profile_path = profile_path;
    }
    createPersonByApiData(apiData){
        const { adult, gender, id, known_for_department, media_type, name, original_name, popularity, profile_path } = apiData;
        return new MoviePerson(adult, gender, id, known_for_department, media_type, name, original_name, popularity, profile_path);
    }
}