import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Actor from "../../models/movie/actor";

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
                </Card>
            }
        </>
    )
}

export default MovieCardActor;