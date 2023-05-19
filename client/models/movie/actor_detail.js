import MoviePerson from "./person";

export default class ActorDetail {
    constructor(credit_type, department, id, job, media, media_type, person) {
        this.credit_type = credit_type;
        this.department = department;
        this.id = id;
        this.job = job;
        this.media = media;
        this.media_type = media_type;
        this.person = person
    };

    getPerson(){
        return new MoviePerson().createPersonByApiData(this.person);
    }

    createActorDetailByApiData(apiData){
        const {credit_type, department, id, job, media, media_type, person} = apiData;
        return new ActorDetail(credit_type, department, id, job, media, media_type, person);
    }

}