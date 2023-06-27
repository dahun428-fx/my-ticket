import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Movie from "../../models/movie";
import { Box, Card, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';
import Movie_detail from "../../models/movie/detail";

const MovieSideCard = ({movie}) => {

    const router = useRouter();

    const [movieItem, setMovieItem] = useState(null);

    useEffect(()=>{
        let movieObj = new Movie_detail().createMovieByApiData(movie);
        console.log('movie', movie);
        setMovieItem(movieObj);
    },[movie])

    return (
        <>
            {
                movieItem &&
                <>
                    <Card 
                    // sx={{display:'flex', maxWidth:350}}
                    // sx={{width:500, height:250, display:'flex'}}
                    sx={{width:250, height:350,}}
                    >
                        <CardMedia 
                            component="img"
                            // sx={{width:180, height:250}}
                            image={movieItem.getImageFullPath()}
                            alt={movieItem.title}
                        />
                        {/* <Box
                            sx={{display:'flex', flexDirection: 'column'}}
                        >
                            <CardContent 
                                // sx={{flex:'1 0 auto'}}
                            >
                                <Typography component="div" variant="h5">
                                    {movieItem.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary"
                                    sx={{maxHeight:120, overflow:'hidden', textOverflow:'ellipsis'}}
                                >
                                    {movieItem.overview}
                                </Typography>
                                <Grid container spacing={1} mt={1}>
                                {
                                    movieItem?.genres.length > 0 && 
                                    movieItem?.genres
                                    .map((item, index) => {
                                    let genre = item.name
                                    return <Grid key={index} item><Chip icon={<TagIcon/>} label={genre} variant="outlined"/></Grid>
                                    })
                                }
                                </Grid>
                            </CardContent>
                        </Box> */}
                    </Card>
                </>
            }
        </>
    )
}
export default MovieSideCard;