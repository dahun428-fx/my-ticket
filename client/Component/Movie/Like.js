import { Badge, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getSession } from "next-auth/react";
import { movieAddOrCancleLike } from "../../api/movie";
import setError from '../../middleware/axiosErrorInstance';
import { useEffect, useState } from "react";

const Like = ({movie,}) => {

    const [likeStatus, setLikeStatus] = useState(false);
    const [likeTotalCount, setLikeTotalCount] = useState(0);

    useEffect(()=>{
        console.log('like', movie);
        setLikeStatus(movie.likeStatus);
        setLikeTotalCount(movie.likeCount ? movie.likeCount : 0);
    },[]);

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

    return (
        <>
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
        </>
    )
}

export default Like;