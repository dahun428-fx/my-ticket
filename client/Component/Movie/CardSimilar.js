import { useEffect, useState } from "react";
import Movie from "../../models/movie";
import { Card, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { PAGE_DETAIL } from "../../api/url/enum/movie.page.url";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const MovieCardSimilar = ({movie}) => {
    
    const [movieDetail, setMovieDetail] = useState(null);

    useEffect(()=>{
        let createdMovie = new Movie().createMovieByApiData(movie);
        setMovieDetail(createdMovie);
    },[movie])

    return (
        <>
        {
            movieDetail &&
            <Card sx={{ maxWidth: 345, width:250 }}>
                <Link href={{
                    pathname : `${PAGE_DETAIL}/${movieDetail.id}`,
                }}
                    as={`${PAGE_DETAIL}/${movieDetail.id}`}
                >
                    <CardMedia 
                        sx={{ height: 200 }}
                        // sx={{height:'100%'}}
                        image={`${movieDetail.getImageFullPath()}`}
                        title={`${movieDetail.title}`}
                    />
                </Link>
                <CardContent>
                    <Typography variant="h5" component="div" noWrap={true}>
                        {movieDetail.title}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Grid container spacing={1}>
                    <Grid item>
                        <Chip icon={<CalendarMonthIcon/>} label={movieDetail?.release_date} color="primary" variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <Chip icon={<SentimentVerySatisfiedIcon/>} label={movieDetail?.vote_average} color="primary" variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <Chip icon={<PeopleOutlineIcon/>} label={movieDetail?.getPopularity()} color="primary" variant="outlined"/>
                    </Grid>
                    </Grid>
                </CardContent>
            </Card>
        }
        </>
    )
}

export default MovieCardSimilar;