import Movie from "../../models/movie";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { movieAddOrCancleLike } from "../../api/movie";
import setError from '../../middleware/axiosErrorInstance';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Collapse, IconButton, Popover } from "@mui/material";
import Badge from '@mui/material/Badge';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import SnsPopOver from "../Common/sns/popover";
import Link from "next/link";
import { PAGE_DETAIL } from "../../api/url/enum/movie.page.url";
import { useRouter } from "next/router";

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

    useEffect(()=>{
      let m = new Movie().createMovieByApiData(props.movie)
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

    return (
      <>
      { movie &&
      <>
      <Card sx={{ maxWidth: 345 }}>
        <Link href={{
          pathname : `${PAGE_DETAIL}/${movie.id}`,
          query : {
            backPage: nowPage
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
            <Typography gutterBottom variant="h5" component="div" noWrap={true}>
              {movie.title}
            </Typography>
          }
        </CardContent>
        </Link>
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
          </CardContent>
        </Collapse>
      </Card>
      </>
      }
      </>

    )
    
}
export default MovieCard;
