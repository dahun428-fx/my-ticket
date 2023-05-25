import { getServerSession } from "next-auth";
import makeAxiosInstance from "../../../../../middleware/axiosInstance";
import { option } from "../../../../api/auth/[...nextauth]";
import { getMovieActorDetail } from "../../../../../api/movie";
import { useEffect, useState } from "react";
import { GET_ACTOR_MOVIE_LIST, GET_ACTOR_PERSON_DETAIL, GET_ACTOR_SNS_IDS, GET_MOVIE_ACTOR_DETAIL } from "../../../../../api/url/enum/movie.api.url";
import actor_detail from "../../../../../models/movie/actor_detail";
import Movie from "../../../../../models/movie";
import MoviePerson from "../../../../../models/movie/person";
import PersonSnsIds from "../../../../../models/movie/person_sns_ids";
import { Box, Collapse, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import MoviePersonDetail from "../../../../../models/movie/person_detail";
import styled from "@emotion/styled";
import { ExpandMore } from "../../../../../Component/Common/Item/ExpandMore";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MovieList from "../../../../../Component/Movie/MovieList";
import MovieCard from "../../../../../Component/Movie/Card";
import { movieListSortDescByDate } from "../../../../../common/functions/changeList";
import { CheckValidDate } from "../../../../../common/functions/common";


const ActorDetail = ({actorid, actorDetail, personMovie, personDetail, personSnsIds}) => {

    const [actor, setActor] = useState(new actor_detail().createActorDetailByApiData(actorDetail));
    const [movieList, setMovieList] = useState(movieListSortDescByDate(personMovie?.cast));
    const [person, setPerson] = useState(new MoviePersonDetail().createPersonDetailByApiData(personDetail));
    const [snsIds, setSnsIds] = useState(new PersonSnsIds().createPersonSnsIdsByApiData(personSnsIds))

    const [expanded, setExpanded] = useState(false);
    const [expandedList, setExpandedList] = useState(false);
    useEffect(()=>{
    //     setActor(new actor_detail().createActorDetailByApiData(actorDetail));
    //     setMovieList(new Movie().createMovieByApiData(personMovie));
    //     setPerson(new MoviePersonDetail().createPersonDetailByApiData(personDetail));
    //     setSnsIds(new PersonSnsIds().createPersonSnsIdsByApiData(personSnsIds));
        console.log('actorDetail',actorDetail);
        console.log('person',personMovie);
        console.log('person_detail',personDetail);
        console.log('personSnsIds ',personSnsIds);
    },[])
    const handleExpandClick = (e) => {
        setExpanded(!expanded);
    }
    const handleExpandListClick = (e) => {
        setExpandedList(!expandedList);
    }

    return (
        <>
            {actor && person && movieList && snsIds &&
                <Box m={2}>
                    <Grid container spacing={1}>
                        <Grid item 
                        textAlign='center'
                        xs={12} sm={6} md={4} lg={3}>
                            <Box >
                                <img src={`${person.getFullPathProfileImage()}`} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8} lg={9}>
                            <Box sx={{margin:'auto 0'}}>
                                <Typography variant="h5">
                                    {person.name}
                                </Typography>
                                <Typography 
                                    sx={{
                                        display:{
                                            xs:'none',
                                            sm:'flex',
                                            md:'flex',
                                            lg:'flex',
                                        }
                                    }}
                                >
                                    {person.biography}
                                </Typography>
                                <Box
                                    sx={{
                                        display:{
                                            xs:'block',
                                            sm:'none',
                                            md:'none',
                                            lg:'none',
                                        }
                                    }}
                                >
                                <Box>
                                    <Collapse in={expanded} timeout='auto'>
                                        {person.biography}
                                    </Collapse>
                                </Box>
                                <Box>
                                    <Divider />
                                    <ExpandMore
                                        expand={expanded}
                                        onClick={(e)=>handleExpandClick(e)}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon focusable={true} />
                                    </ExpandMore>
                                </Box>
                                </Box>
                            </Box>

                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
                        <Grid item xs={12} sm={6} md={8} lg={9}>
                            {
                            movieList.length > 0 &&
                            <Box mt={3}>
                                <Typography variant="h6">연기</Typography>
                                <Paper variant="outlined">
                                    <Box mt={2}>
                                        <List sx={{ width: '100%', bgcolor: 'background.paper', padding:2 }} >
                                            <Collapse in={expandedList} timeout='auto' collapsedSize='200px'>
                                             {
                                                movieList.map((item, index) => {
                                                    return (
                                                        <ListItem key={index}
                                                            sx={{
                                                                marginTop:2,
                                                            }}
                                                            disablePadding
                                                            alignItems="flex-start"
                                                        >
                                                            <ListItemText 
                                                            sx={{
                                                                fontSize:'12px',
                                                                flex:'none',
                                                                minWidth:'37px'
                                                            }}
                                                            primary={CheckValidDate(item.release_date) ? new Date(item.release_date).getFullYear() :'-'} />
                                                            <ListItemText
                                                            sx={{
                                                                // marginLeft:2
                                                            }}
                                                            inset
                                                            primary={item.title} secondary={item.character} />
                                                        </ListItem>
                                                    )
                                                })
                                             }   
                                            </Collapse>
                                            <Divider />
                                            <ExpandMore
                                                expand={expandedList}
                                                onClick={(e)=>handleExpandListClick(e)}
                                                aria-expanded={expandedList}
                                                aria-label="show more list"
                                            >
                                                <ExpandMoreIcon focusable={true} />
                                            </ExpandMore>
                                        </List>
                                    </Box>
                                </Paper>
                            </Box>
                            }
                        </Grid>
                    </Grid>
                </Box>
            }
        </>
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
        const {data : personDetail } = await axios.get(`${GET_ACTOR_PERSON_DETAIL}/${actorDetail.person.id}`); 
        const {data : personSnsIds } = await axios.get(`${GET_ACTOR_SNS_IDS}/${actorDetail.person.id}`)

        return {
            props : {
                actorid,
                actorDetail,
                personMovie,
                personDetail,
                personSnsIds,
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