export default class PersonSnsIds {
    constructor(facebook_id, freebase_id, freebase_mid, id, 
        imdb_id, instagram_id, tiktok_id, tvrage_id, twitter_id,
        wikidata_id, youtube_id){
        this.facebook_id = facebook_id;
        this.freebase_id = freebase_id;
        this.freebase_mid = freebase_mid,
        this.id = id;
        this.imdb_id = imdb_id;
        this.instagram_id = instagram_id;
        this.tiktok_id = tiktok_id;
        this.tvrage_id = tvrage_id;
        this.wikidata_id = wikidata_id;
        this.twitter_id = twitter_id;
        this.youtube_id = youtube_id;
    }
    createPersonSnsIdsByApiData(apiData){
        if (!apiData) {
            return {};
        }
        const {facebook_id, freebase_id, freebase_mid, id, 
            imdb_id, instagram_id, tiktok_id, tvrage_id, twitter_id,
            wikidata_id, youtube_id} = apiData;
        return new PersonSnsIds(facebook_id, freebase_id, freebase_mid, id, 
            imdb_id, instagram_id, tiktok_id, tvrage_id, twitter_id,
            wikidata_id, youtube_id);
    }
}