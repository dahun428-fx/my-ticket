import { useEffect, useState } from "react";
import { option } from "../../../api/auth/[...nextauth]";
import { GET_MOVIE_CREDITS, GET_MOVIE_DETAIL, GET_MOVIE_KEYWORD, GET_MOVIE_SIMILAR } from "../../../../api/url/enum/movie.api.url";
import { getServerSession } from "next-auth";
import makeAxiosInstance from "../../../../middleware/axiosInstance";
import { useRouter } from "next/router";
import { getMovieLikeByMovieid, getMovieListForGetMovieInfo } from "../../../../api/movie";
import { getSession } from "next-auth/react";
import { Box, Button, Chip, Divider, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import SnsPopOver from "../../../../Component/Common/sns/popover";
import Like from "../../../../Component/Movie/Like";
import Movie_detail from "../../../../models/movie/detail";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MovieCardSimilar from "../../../../Component/Movie/CardSimilar";
import MovieCardActor from "../../../../Component/Movie/CardActor";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeywordSeachDetail from "../../search/detail/[keywordid]";

const MovieDetail = (props) => {

    const [isRefreshing, setIsRefreshing] = useState(false);

    const [movieDetail, setMovieDetail] = useState(null);
    const [movieKeywords, setMovieKeywords] = useState([]);

    const [similarMovieList, setSimilarMovieList] = useState([]);
    const [similarMovieTotalPages, setSimilarMovieTotalPages] = useState(0);
    const [similarMovieTotalResults, setSimliarMovieTotalResults] = useState(0);

    const [actors, setActors] = useState([]);
    const [keywordid, setKeywordid] = useState("");

    const router = useRouter();

    useEffect(()=>{
        refreshData();
        ( async () => {
            await movieRender(props.movie);
        })();
        setMovieKeywords(props.movieKeywords);
        setSimilarMovieList(props.similarMovie.list);
        setActors(props.creditsMovie.cast);
        setKeywordid("");
    },[router.asPath]);

    useEffect(()=>{
        setIsRefreshing(false);
    },[props.movie.id])

    const refreshData = () => {
        router.replace(router.asPath);
        setIsRefreshing(true);
    }

    const movieRender = async (movie) => {
        if(movie) {
            let m = movie;
            const session = await getSession();

            m = await movieAttachLikeCount(m);
            if(session) {
                m = await movieAttachLikeStatus(m);  
            }

            m = new Movie_detail().createMovieByApiData(m);
            setMovieDetail(m);
        }
    }

    const movieAttachLikeStatus = async(movie) => {
        const {data} = await getMovieLikeByMovieid(movie.id);
        movie.likeStatus = data.status;
        return movie;
    }

    const movieAttachLikeCount = async(movie) => {
        const param = [{movieid:movie.id}];

        const {data} = await getMovieListForGetMovieInfo(param);
        if(data) {
            movie.likeCount = data[0].likeCount;
        }
        return movie;
    }

    const backBtnHandler = () => {

        if(!router.query.backPage || !router.query.tabValue) {
            return router.back();
        }

        router.push({
            pathname:`/product/movie`,
            query:{
                nowPage: router.query.backPage,
                tabValue : router.query.tabValue,
            },

        },'/product/movie')
    }

    const keywordClickHandler = (keywordid) => {
        setKeywordid(keywordid);
    }

    const showAllActorHandler = (movieid, movietitle) => {
        console.log('showAllActorHandler');
        router.push({
            pathname:`/product/movie/actor/${movieid}`,
        })
    }

    return (
        <>
        { !isRefreshing && movieDetail && 
            <Stack>
                <Box>
                    <IconButton onClick={backBtnHandler}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>
                <Box alignItems="center">
                    <Paper variant="outlined" square={true}>
                        <Grid container spacing={2} justifyContent='center' padding={2}>
                            <Grid item xs={12} sm={6} md={6} lg={6} 
                                sx={{
                                    textAlign:'center'
                                }}
                            >
                                <Box component='img'
                                    sx={{
                                        // width:'100%',
                                        // maxWidth:'500px',
                                    }}
                                    src={movieDetail.getImageFullPath()}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}
                                sx={{
                                    margin:'auto 0',
                                }}
                            >
                                <Box>
                                    <Typography variant="h6" sx={{fontWeight:'bold'}}>{movieDetail.title}</Typography>
                                    <Typography variant="subtitle1">( {movieDetail.original_title} )</Typography>
                                </Box>
                                <Box mt={2}>
                                    <Grid container direction='row' spacing={1}>
                                        <Grid item>
                                            <Chip icon={<SentimentVerySatisfiedIcon/>} label={movieDetail?.getVoteAverage()} color="primary" variant="outlined"/>
                                        </Grid>
                                        <Grid item>
                                          <Chip icon={<CalendarMonthIcon/>} label={movieDetail?.release_date} color="primary" variant="outlined"/>
                                        </Grid>
                                        <Grid item>
                                            <Chip icon={<AccessTimeIcon />} label={`${movieDetail?.runtime} 분`} color="primary" variant="outlined" />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box mt={1}>
                                    <Grid container direction='row'>
                                        <Grid item>
                                            <SnsPopOver movie={movieDetail}/>
                                        </Grid>
                                        <Grid item>
                                            <Like movie={movieDetail}/>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box mt={1}>
                                    <Typography
                                        mb={1}
                                        sx={{
                                            fontWeight:'bold'
                                        }}
                                    >개요</Typography>
                                    <Typography variant="subtitle2">{movieDetail.overview}</Typography>
                                </Box>
                                <Box>
                                    <Grid container spacing={1} mt={1}>
                                        {
                                            movieDetail.genres.length > 0 &&
                                            movieDetail.genres.map((item, index) => {
                                                return <Grid key={item.id} item><Chip icon={<TagIcon/>} label={item.name} variant="outlined"/></Grid>
                                            })
                                        }
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
                <Box padding={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Stack>
                                <Box>
                                    <Typography variant="h6" mt={2} sx={{fontWeight:'bold'}}>주요 출연진</Typography>
                                    <Typography variant="overline" 
                                        sx={{
                                            cursor:'pointer',
                                        }}
                                    onClick={()=>showAllActorHandler(movieDetail.id, movieDetail.title)}>전체보기</Typography>
                                    <Divider />
                                </Box>
                                <Grid container spacing={1}
                                    sx={{
                                        flexWrap:'nowrap',
                                        overflowX:'auto',
                                        margin: 0,
                                        padding: 2,
                                        listStyle: "none",
                                        height: "100%",
                                        '&::-webkit-scrollbar': {
                                        width: '0.4em'
                                        },
                                        '&::-webkit-scrollbar-track': {
                                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                        background: 'rgba(33, 122, 244, .1)'
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            height: '30%', /* 스크롤바의 길이 */
                                            background: '#217af4', /* 스크롤바의 색상 */
                                            borderRadius: '10px'
                                        }
                                    }}
                                >
                                {
                                    actors.length > 0 &&
                                    actors.map((item, index) => {
                                        return (
                                            <Grid item  key={index}>
                                                <MovieCardActor actor={item}/>
                                            </Grid>
                                        )
                                    })
                                }
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4} >
                            <Grid container>
                                <Grid item xs={6}>
                                    <Box>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight:'bold'
                                            }}>원제</Typography>
                                            <Typography>{movieDetail.original_title}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight:'bold'
                                            }}>상태</Typography>
                                            <Typography>{movieDetail.getMovieStatus()}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight:'bold'
                                            }}>원어</Typography>
                                            <Typography>{movieDetail.getOriginalLanguage()}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight:'bold'
                                            }}>제작비</Typography>
                                            <Typography>{movieDetail.getBudgetAsString()}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight:'bold'
                                            }}>수익</Typography>
                                            <Typography>{movieDetail.getRevenuAsString()}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                    <Typography sx={{
                                            fontWeight:'bold'
                                        }}>키워드</Typography>
                                        <Box>
                                            <Grid container spacing={1}>
                                                {
                                                    movieKeywords.length > 0 && 
                                                    movieKeywords.map((item, index) => {
                                                        return (
                                                        <Grid item key={item.id}>
                                                            <Chip size="small" label={item.name} color="secondary" variant="outlined"
                                                             onClick={(e)=>keywordClickHandler(item.id)}
                                                            />
                                                        </Grid>
                                                        )
                                                    })
                                                }
                                                
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <KeywordSeachDetail keywordid={keywordid} />
                </Box>
                {
                    similarMovieList.length > 0 && 

                    <Box mt={2} padding={2}>
                        <Typography variant="h6" sx={{fontWeight:'bold'}} >이 영화와 비슷한 추천 작품</Typography>
                        <Divider />
                        <Stack padding={2}>
                            <Grid container spacing={{ xs: 2, md: 3, sm:3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                                sx={{
                                    flexWrap:'nowrap',
                                    overflowX:'auto',
                                    margin: 0,
                                    padding: 2,
                                    listStyle: "none",
                                    height: "100%",
                                    '&::-webkit-scrollbar': {
                                        width: '0.4em'
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                        background: 'rgba(33, 122, 244, .1)'
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        height: '30%', /* 스크롤바의 길이 */
                                        background: '#217af4', /* 스크롤바의 색상 */
                                        borderRadius: '10px'
                                    }
                                }}
                            >
                                {
                                    similarMovieList.map((movie, index) => {
                                        return (
                                            <Grid item key={index}>
                                                <MovieCardSimilar movie={movie} />
                                            </Grid>
                                        )
                                    })
                                }
                                
                            </Grid>
                        </Stack>
                    </Box>
                }
            </Stack>
        }
        </>
    )
}

export default MovieDetail;

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, option);
    const axios = await makeAxiosInstance(session);

    const {params:{movieid}} = context;

    const {data:movieDetail} = await axios.get(`${GET_MOVIE_DETAIL}/${movieid}`);
    const {data:movieKeywords} = await axios.get(`${GET_MOVIE_KEYWORD}/${movieid}`);
    const movieSimilarRes = await axios.get(`${GET_MOVIE_SIMILAR}/${movieid}`);
    const movieCreditsRes = await axios.get(`${GET_MOVIE_CREDITS}/${movieid}`);

    return {
        props: {
            movie : movieDetail, 
            movieKeywords : movieKeywords.keywords,
            similarMovie : {
                list : movieSimilarRes.data?.results,
                totalPages: movieSimilarRes.data?.total_pages,
                totalResults : movieSimilarRes.data?.total_results,
            },
            creditsMovie : {
                cast : movieCreditsRes.data?.cast,
                crew : movieCreditsRes.data?.crew,
            }
        },
      }
}