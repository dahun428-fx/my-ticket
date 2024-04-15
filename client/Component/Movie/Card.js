import Image from "next/image";
import Movie from "../../models/movie";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { movieAddOrCancleLike } from "../../api/movie";
import SaveIcon from '@mui/icons-material/Save'
import setError from '../../middleware/axiosErrorInstance';

const MovieCard = (props) => {

    const [movie, setMovie] = useState(null);
    const [likeStatus, setLikeStatus] = useState(false);
    const [likeTotalCount, setLikeTotalCount] = useState(0);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);

    useEffect(()=>{
      let m = new Movie().createMovieByApiData(props.movie)
      setMovie(m);
      setLikeStatus(m.likeStatus);
      setLikeTotalCount(m.likeCount ? m.likeCount : 0);
    },[props.movie]);

    const addLikeMovie = async (e) => {
        setIsLoadingBtn(true);
      
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
      console.log('errr: ',data);
      setLikeStatus(data.status);
      if(likeStatus) {
        setLikeTotalCount(likeTotalCount-1);
      } else {
        setLikeTotalCount(likeTotalCount+1);
      }
      setIsLoadingBtn(false);
    }

    return (
      <>
      { movie &&
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={`${movie.getImageFullPath()}`}
          title={`${movie.title}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.overview}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small" onClick={(e)=>addLikeMovie(e)}>LIKE {likeStatus ? 'O' : 'X'} {likeTotalCount}</Button> */}
          {/* <Button size="small" onClick={(e)=>addLikeMovie(e)}>LIKE {likeStatus ? 'O' : 'X'} {likeTotalCount}</Button> */}
          <LoadingButton
            loading={isLoadingBtn}
            variant="outlined"
            onClick={(e)=>addLikeMovie(e)}
          >
            LIKE {likeStatus ? 'O' : 'X'} [{likeTotalCount}]
          </LoadingButton>
          {/* <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
      }
      </>

    )
    
}
export default MovieCard;
