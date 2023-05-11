export default class Actor {
    constructor (credit_id, department, gender, id, job, known_for_department, name, original_name, popularity, profile_path) {
        this.credit_id = credit_id;
        this.department = department;
        this.gender = gender;
        this.id = id;
        this.job = job;
        this.known_for_department = known_for_department;
        this.name = name;
        this.original_name = original_name;
        this.popularity = popularity;
        this.profile_path = profile_path;
    }

    getProfileImagePath(){
        //	https://www.themoviedb.org/t/p/w138_and_h175_face/83o3koL82jt30EJ0rz4Bnzrt2dd.jpg
        return `https://www.themoviedb.org/t/p/w138_and_h175_face${this.profile_path}`;
    }
    createActorByApiData(actorApiData) {
        const {credit_id, department, gender, id, job, known_for_department, name, original_name, popularity, profile_path} = actorApiData;
        return new Actor(credit_id, department, gender, id, job, known_for_department, name, original_name, popularity, profile_path);
    }
}