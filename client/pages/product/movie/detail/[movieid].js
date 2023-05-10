import { useEffect, useState } from "react";
import { option } from "../../../api/auth/[...nextauth]";
import { GET_MOVIE_DETAIL, GET_MOVIE_KEYWORD, GET_MOVIE_SIMILAR } from "../../../../api/url/enum/movie.api.url";
import { getServerSession } from "next-auth";
import makeAxiosInstance from "../../../../middleware/axiosInstance";
import Movie from "../../../../models/movie";
import Btn from "../../../../Component/Common/Button";
import { useRouter } from "next/router";
import { getMovieLikeByMovieid, getMovieListForGetMovieInfo, movieAddOrCancleLike, movieLikeListForUser } from "../../../../api/movie";
import { getSession } from "next-auth/react";
import setError from '../../../../middleware/axiosErrorInstance';
import KakaoShare from "../../../../common/sns/kakaoShare";
import NaverShare from "../../../../common/sns/naverShare";
import Head from "next/head";
import HeadMeta from "../../../../common/seo/movie/headMeta";
import FacebookShare from "../../../../common/sns/fbShare";
import { Box, Card, CardContent, CardMedia, Chip, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import SnsPopOver from "../../../../Component/Common/sns/popover";
import Like from "../../../../Component/Movie/Like";
import Movie_detail from "../../../../models/movie/detail";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MovieDetail = (props) => {

    const [movieDetail, setMovieDetail] = useState(null);
    const [movieKeywords, setMovieKeywords] = useState([]);

    const [similarMovieList, setSimilarMovieList] = useState([]);
    const [similarMovieTotalPages, setSimilarMovieTotalPages] = useState(0);
    const [similarMovieTotalResults, setSimliarMovieTotalResults] = useState(0);

    const router = useRouter();

    useEffect(()=>{
        ( async () => {
            console.log('movie detail : ', props.movie);
            await movieRender(props.movie);
        })();
        console.log(props.similarMovie);
        setMovieKeywords(props.movieKeywords);
    },[]);

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

        router.push({
            pathname:`/product/movie`,
            query:{
                nowPage: router.query.backPage,
                tabValue : router.query.tabValue,
            },

        },'/product/movie')
    }

    return (
        <>
        {movieDetail && 
            <Stack>
                <Box alignItems="center">
                    <Paper variant="outlined" square={true}>
                        <Grid container spacing={2} justifyContent='center' padding={2}>
                            <Grid item xs={12} sm={6} md={6} lg={6} 
                                sx={{
                                    textAlign:'center'
                                }}
                            >
                                {/* <Box component='img'
                                    sx={{
                                        width:'100%',
                                        maxWidth:'500px',
                                    }}
                                    src={movieDetail.getImageFullPath()}
                                /> */}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}
                                sx={{
                                    margin:'auto 0',
                                }}
                            >
                                <Typography variant="h6">
                                    <Box component='span' sx={{fontWeight:'bold'}}>{movieDetail.title}</Box> ( {movieDetail.original_title} )</Typography>
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
                    <Typography variant="h6" mt={2} sx={{fontWeight:'bold'}}>주요 출연진</Typography>
                    <Divider />
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
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

                                <Grid item>
                                    <Card
                                        sx={{width:'250px', height:'250px'}}
                                    >
                                        <CardContent>h</CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card
                                        sx={{width:'250px', height:'250px'}}
                                    >
                                        <CardContent>h</CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card
                                        sx={{width:'250px', height:'250px'}}
                                    >
                                        <CardContent>h</CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card
                                        sx={{width:'250px', height:'250px'}}
                                    >
                                        <CardContent>h</CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} >
                            <Grid container>
                                <Grid item xs={6}>
                                <Stack
                                    >
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
                                </Stack>
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
                                                            <Chip size="small" label={item.name} color="secondary" variant="outlined"/>
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
                <Box mt={2} padding={2}>
                    <Typography variant="h6" sx={{fontWeight:'bold'}} >이 영화와 비슷한 추천 작품</Typography>
                    <Divider />
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

                        <Grid item>
                            <Card
                                sx={{width:'250px', height:'250px'}}
                            >
                                <CardContent>h</CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card
                                sx={{width:'250px', height:'250px'}}
                            >
                                <CardContent>h</CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card
                                sx={{width:'250px', height:'250px'}}
                            >
                                <CardContent>h</CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card
                                sx={{width:'250px', height:'250px'}}
                            >
                                <CardContent>h</CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
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

    return {
        props: {
            movie : movieDetail, 
            movieKeywords : movieKeywords.keywords,
            similarMovie : {
                list : movieSimilarRes.data?.results,
                totalPages: movieSimilarRes.data?.total_pages,
                totalResults : movieSimilarRes.data?.total_results,
            }
        },
      }
}