import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Actor from "../../models/movie/actor";
import Link from "next/link";
import { MOVIE_ACTOR_DETAIL } from "../../api/url/enum/movie.page.url";

const MovieCardActor = ({actor}) => {

    const [actorDetail, setActorDetail] = useState(null);

    useEffect(()=>{
        let ac = new Actor().createActorByApiData(actor);
        setActorDetail(ac);
    },[actor])

    return (
        <>
            {
                actorDetail &&
                <Card
                    sx={{
                        maxWidth:345,
                        width:138,
                        height:250,
                    }}
                >
                    <Link
                        href={{
                            pathname: `${MOVIE_ACTOR_DETAIL}/${actorDetail.credit_id}`,
                        }}
                    >
                    <CardMedia 
                        sx={{
                            height:175,
                            backgroundSize:'cover'
                        }}
                        image={`${actorDetail.getProfileImagePath()}`}
                        title={`${actorDetail.name}`}
                    />
                    <CardContent>
                        <Typography variant="subtitle2" component="div">
                            {actorDetail.name}
                        </Typography>
                    </CardContent>
                    </Link>
                </Card>
            }
        </>
    )
}

export default MovieCardActor;