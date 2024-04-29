import { getServerSession } from "next-auth";
import makeAxiosInstance from "../../../../../middleware/axiosInstance";
import { option } from "../../../../api/auth/[...nextauth]";
import { getMovieActorDetail } from "../../../../../api/movie";
import { useEffect, useRef, useState } from "react";
import { GET_ACTOR_MOVIE_LIST, GET_ACTOR_PERSON_DETAIL, GET_ACTOR_SNS_IDS, GET_MOVIE_ACTOR_DETAIL } from "../../../../../api/url/enum/movie.api.url";
import actor_detail from "../../../../../models/movie/actor_detail";
import Movie from "../../../../../models/movie";
import MoviePerson from "../../../../../models/movie/person";
import PersonSnsIds from "../../../../../models/movie/person_sns_ids";
import { Box, Card, CardActions, CardContent, CardMedia, Collapse, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import MoviePersonDetail from "../../../../../models/movie/person_detail";
import styled from "@emotion/styled";
import { ExpandMore } from "../../../../../Component/Common/Item/ExpandMore";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MovieList from "../../../../../Component/Movie/MovieList";
import MovieCard from "../../../../../Component/Movie/Card";
import { movieListSortDescByDate } from "../../../../../common/functions/changeList";
import { CheckValidDate, getAgeByDate } from "../../../../../common/functions/common";
import { useRouter } from "next/router";
import { PAGE_DETAIL } from "../../../../../api/url/enum/movie.page.url";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from 'next/image'


const ActorDetail = ({actorid, actorDetail, personMovie, personDetail, personSnsIds}) => {

    const router = useRouter();

    const [actor, setActor] = useState(new actor_detail().createActorDetailByApiData(actorDetail));
    // const [movieList, setMovieList] = useState(movieListSortDescByDate(personMovie?.cast));
    const [movieList, setMovieList] = useState([]);
    const [person, setPerson] = useState(new MoviePersonDetail().createPersonDetailByApiData(personDetail));
    const [snsIds, setSnsIds] = useState(new PersonSnsIds().createPersonSnsIdsByApiData(personSnsIds))

    const [expanded, setExpanded] = useState(false);
    const [expandedList, setExpandedList] = useState(false);

    // console.log('person : ', person);
    // console.log('actor : ', actor);
    console.log('personSnsIds : ', personSnsIds);
    useEffect(()=>{
        (async () => {
            setMovieList( await movieListSortDescByDate(personMovie?.cast) ?? []);
        })();
    },[])

    const handleExpandClick = (e) => {
        setExpanded(!expanded);
    }
    const handleExpandListClick = (e) => {
        setExpandedList(!expandedList);
    }
    const personMovieClickHandler = (movieid) => {
        router.push({
            pathname:`${PAGE_DETAIL}/${movieid}`
        })
    }
    const onClickSnsId = (snsType) => {
        let snsDomain = '';
        let snsId = '';
        switch (snsType) {
            case 'fb':
                snsDomain = 'https://facebook.com';
                snsId= snsIds.facebook_id;
                break;
            case 'twitter':
                snsDomain = 'https://twitter.com';
                snsId= snsIds.twitter_id;
                break;
            case 'instagram':
                snsDomain = 'https://instagram.com';
                snsId= snsIds.instagram_id;
                break;
        
            default:
                break;
        }

        if(snsDomain !== '' && snsId !== '') {
            window.open(`${snsDomain}/${snsId}`);
        }
    }

    return (
        <>
            {actor && person && movieList && snsIds &&
                <Box m={2}>
                    <Grid container spacing={1}>
                        <Grid item 
                        xs={12} sm={6} md={4} lg={3}>
                            <Box 
                            textAlign='center'
                            >
                                <Image width={150} height={150} src={`${person.getFullPathProfileImage()}`} />
                            </Box>
                            <Box mt={1}>

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
                                <Box mt={2}>
                                {
                                    snsIds.facebook_id &&
                                    <IconButton size="large" onClick={()=>onClickSnsId('fb')}>
                                        <FacebookIcon fontSize="inherit"/>
                                    </IconButton>
                                }
                                {
                                    snsIds.twitter_id &&
                                    <IconButton size="large" onClick={()=>onClickSnsId('twitter')}>
                                        <TwitterIcon fontSize="inherit"/>
                                    </IconButton>
                                }
                                {
                                    snsIds.instagram_id &&
                                    <IconButton size="large" onClick={()=>onClickSnsId('instagram')}>
                                        <InstagramIcon fontSize="inherit"/>
                                    </IconButton>
                                }
                                </Box>
                                <Box mt={2}>
                                    <Typography variant="h6">약력</Typography>
                                    <Divider />

                                    <Collapse in={expanded} timeout='auto'>
                                        {person.biography}
                                    </Collapse>
                                </Box>
                                <Box>
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
                        <Grid item xs={12} sm={4} md={4} lg={3}>
                            <Box mt={3}>
                                <Typography variant="h6">인물정보</Typography>
                                <Paper variant="outlined">
                                    <Box
                                        sx={{
                                            padding:2,
                                        }}
                                    >
                                        <Box mt={1}>
                                            <Typography variant="subtitle1"
                                                sx={{
                                                    fontWeight:'bold',
                                                }}
                                            >유명분야</Typography>
                                            <Typography variant="subtitle2">
                                            {person.known_for_department}
                                            </Typography>
                                        </Box>
                                        <Box mt={1}>
                                            <Typography variant="subtitle1"
                                                sx={{
                                                    fontWeight:'bold',
                                                }}
                                            >성별</Typography>
                                            <Typography variant="subtitle2">
                                            {person.gender === 2 ? '남성' : '여성'}
                                            </Typography>
                                        </Box>
                                        <Box mt={1}>
                                            <Typography variant="subtitle1"
                                                sx={{
                                                    fontWeight:'bold',
                                                }}
                                            >생년월일</Typography>
                                            <Typography variant="subtitle2">
                                            {person.birthday}
                                            {
                                                person.deathday &&
                                                `~ ${person.deathday}`
                                            }
                                            </Typography>
                                        </Box>
                                        {
                                            !person.deathday &&

                                        <Box mt={1}>
                                            <Typography variant="subtitle1"
                                                sx={{
                                                    fontWeight:'bold',
                                                }}
                                            >나이</Typography>
                                            <Typography variant="subtitle2">
                                            만 {getAgeByDate(person.birthday)}세
                                            </Typography>
                                        </Box>
                                        }
                                        <Box mt={1}>
                                            <Typography variant="subtitle1"
                                                sx={{
                                                    fontWeight:'bold',
                                                }}
                                            >출생지</Typography>
                                            <Typography variant="subtitle2">
                                            {person.place_of_birth}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={8} lg={9}>
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
                                                                cursor:'pointer',
                                                            }}
                                                            disablePadding
                                                            alignItems="flex-start"
                                                            onClick={(e)=>personMovieClickHandler(item.id)}
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
    const session = null;
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