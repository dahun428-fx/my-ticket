export default class MoviePersonDetail {
    constructor(adult, also_known_as, biography, birthday, deathday, 
                gender, homepage, id, imdb_id, known_for_department, name, place_of_birth, popularity, profile_path) {

        this.adult = adult;
        this.also_known_as = also_known_as;
        this.biography = biography;
        this.birthday = birthday;
        this.deathday = deathday;
        this.gender = gender;
        this.homepage = homepage;
        this.id = id;
        this.imdb_id = imdb_id;
        this.known_for_department = known_for_department;
        this.name = name;
        this.place_of_birth = place_of_birth;
        this.popularity = popularity;
        this.profile_path = profile_path;                    
    }

    getFullPathProfileImage(){
      return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${this.profile_path}`
    }
    createPersonDetailByApiData(apiData) {
        const {adult, also_known_as, biography, birthday, deathday, 
            gender, homepage, id, imdb_id, known_for_department, name, place_of_birth, popularity, profile_path} = apiData;
        return new MoviePersonDetail(adult, also_known_as, biography, birthday, deathday, 
            gender, homepage, id, imdb_id, known_for_department, name, place_of_birth, popularity, profile_path);
    }
}

/*
{
  "adult": false,
  "also_known_as": [
    "Sidney Pollack"
  ],
  "biography": "Sydney Irwin Pollack (July 1, 1934 – May 26, 2008) was an American film director, producer and actor. For his film Out of Africa (1985), Pollack won the Academy Award for Best Director and Best Picture. He was also nominated for Best Director Oscars for They Shoot Horses, Don't They? (1969) and Tootsie (1982).\n\nSome of his other best-known works include Jeremiah Johnson (1972), The Way We Were (1973), Three Days of the Condor (1975) and Absence of Malice (1981). His subsequent films included Havana (1990), The Firm (1993), The Interpreter (2005), and he produced and acted in Michael Clayton (2007). Pollack also made appearances in Robert Altman's Hollywood mystery The Player (1992), Woody Allen's relationship drama Husbands and Wives (1993), and Stanley Kubrick's erotic psychological drama Eyes Wide Shut (1999).\n\nDescription above from the Wikipedia article Sydney Pollack, licensed under CC-BY-SA, full list of contributors on Wikipedia.",
  "birthday": "1934-07-01",
  "deathday": "2008-05-26",
  "gender": 2,
  "homepage": null,
  "id": 2226,
  "imdb_id": "nm0001628",
  "known_for_department": "Directing",
  "name": "Sydney Pollack",
  "place_of_birth": "Lafayette, Indiana, USA",
  "popularity": 3.98,
  "profile_path": "/j3iXrQDiceGrAzEF6HE49zA7Wwj.jpg"
}
*/