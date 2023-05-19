import { getServerSession } from "next-auth";
import makeAxiosInstance from "../../../../../middleware/axiosInstance";
import { option } from "../../../../api/auth/[...nextauth]";
import { getMovieActorDetail } from "../../../../../api/movie";
import { useEffect, useState } from "react";
import { GET_ACTOR_MOVIE_LIST, GET_MOVIE_ACTOR_DETAIL } from "../../../../../api/url/enum/movie.api.url";

const ActorDetail = ({actorid, actorDetail, person}) => {

    const [actor, setActor] = useState({});

    useEffect(()=>{
        console.log('actorDetail',actorDetail);
        console.log('person',person);
    },[])

    return (
        <>{actorid} ! actor detail page</>
    )
}

export default ActorDetail;

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, option);
    const axios = await makeAxiosInstance(session);
    
    const {params:{actorid}} = context;

    try {

        const {data : actorDetail} = await axios.get(`${GET_MOVIE_ACTOR_DETAIL}/${actorid}`);
        const {data : personMovie } = await axios.get(`${GET_ACTOR_MOVIE_LIST}/${actorDetail.person.id}`)

        return {
            props : {
                actorid,
                actorDetail,
                personMovie,
            }
        }
        
    } catch (error) {
        console.log(error);
        const {status} = error.response;
        if(status === 404) {
            return {
                notFound:true,
            }
        }
        return Promise.reject(error);
    }
}