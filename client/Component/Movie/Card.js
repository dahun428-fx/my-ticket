import Movie from "../../models/movie";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { getMovieGenres, movieAddOrCancleLike } from "../../api/movie";
import setError from '../../middleware/axiosErrorInstance';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CardHeader, Chip, Collapse, Grid, IconButton, Popover, Stack } from "@mui/material";
import Badge from '@mui/material/Badge';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import SnsPopOver from "../Common/sns/popover";
import Link from "next/link";
import { PAGE_DETAIL } from "../../api/url/enum/movie.page.url";
import { useRouter } from "next/router";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MovieCard = (props) => {

    const router = useRouter();

    const [movie, setMovie] = useState(null);
    const [likeStatus, setLikeStatus] = useState(false);
    const [likeTotalCount, setLikeTotalCount] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [nowPage, setNowPage ] = useState(Number.parseInt(router.query.nowPage) || 1);
    const [tabValue, setTabValue] = useState(props.tabValue || 1);

    useEffect(()=>{
      let m = new Movie().createMovieByApiData(props.movie);
      setMovie(m);
      setLikeStatus(m.likeStatus);
      setLikeTotalCount(m.likeCount ? m.likeCount : 0);
      setNowPage(props.nowPage);
    },[props.movie]);

    const addLikeMovie = async (e) => {
      
      e.preventDefault();
      const session = await getSession();
      if(!session) {
        setError({response:{data:{message:"로그인이 필요한 서비스 입니다."}, status:401}});
      }
      const likeData = {
        movieid: movie.id,
        status : movie.likeStatus,
      }
      const {data} = await movieAddOrCancleLike(likeData);
      setLikeStatus(data.status);
      if(likeStatus) {
        setLikeTotalCount(likeTotalCount-1);
      } else {
        setLikeTotalCount(likeTotalCount+1);
      }
    }

    const handleExpandClick = (e) => {
      e.preventDefault();
      setExpanded(!expanded);
    };

    const movieGenresAttach = (genreList) => {
      let genres = props.genres.genres;
 
      if(genreList && genres && genreList.length > 0 && genres.length > 0) {
        let results = genreList.map((item, index) => {
          return genres.find(genre => genre.id === item); 
        })
 
        return results;
      }
      return [];
    }

    return (
      <>
      { movie &&
      <>
      <Card sx={{ maxWidth: 345 }}>
        <Link href={{
          pathname : `${PAGE_DETAIL}/${movie.id}`,
          query : {
            backPage: nowPage,
            tabValue: tabValue,
          }
        }}
          as={`${PAGE_DETAIL}/${movie.id}`}
        >
        <CardMedia
          sx={{ height: 200 }}
          image={`${movie.getImageFullPath()}`}
          title={`${movie.title}`}
        />
        <CardContent>
          {
            !expanded &&
            <Typography variant="h5" component="div" noWrap={true}>
              {movie.title}
            </Typography>
          }
        </CardContent>
        </Link>
        <CardContent>
            <Grid container spacing={1}>
              <Grid item>
                <Chip icon={<CalendarMonthIcon/>} label={movie?.release_date} color="primary" variant="outlined"/>
              </Grid>
              <Grid item>
                <Chip icon={<SentimentVerySatisfiedIcon/>} label={movie?.vote_average} color="primary" variant="outlined"/>
              </Grid>
              <Grid item>
                <Chip icon={<PeopleOutlineIcon/>} label={movie?.getPopularity()} color="primary" variant="outlined"/>
              </Grid>
            </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={(e)=>addLikeMovie(e)}>
            <Badge 
            color="secondary" 
            badgeContent={likeTotalCount} max={999}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              {likeStatus ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
            </Badge>
          </IconButton>
          <SnsPopOver movie={movie}/>
          <ExpandMore
            expand={expanded}
            onClick={(e)=>handleExpandClick(e)}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.overview}
            </Typography>
              <Grid container spacing={1} mt={1}>
              {
                movieGenresAttach(movie?.genre_ids)
                .map((item, index) => {
                  let genre = item.name
                  return <Grid key={index} item><Chip icon={<TagIcon/>} label={genre} variant="outlined"/></Grid>
                })
              }
              </Grid>
          </CardContent>
        </Collapse>
      </Card>
      </>
      }
      </>

    )
    
}
export default MovieCard;
