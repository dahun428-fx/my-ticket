import { IconButton, Popover } from "@mui/material";
import { useEffect, useState } from "react";
import KakaoShare from "../../../common/sns/kakaoShare";
import NaverShare from "../../../common/sns/naverShare";
import FacebookShare from "../../../common/sns/fbShare";
import ShareIcon from '@mui/icons-material/Share'

const SnsPopOver = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [movie, setMovie] = useState(null);
    const [detailPageUrl, setDetailPageUrl] = useState("");
    
    useEffect(()=>{
        setMovie(props.movie);
        setDetailPageUrl(`${window.location.href}/detail/${props.movie.id}`);
    },[]);

    const snsPopOverOpen = Boolean(anchorEl);
    const snsPopOverId = snsPopOverOpen ? 'simple-popover' : undefined;

    const shareClickEventHandler = (e) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    }
    const shareHandleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
        {
            movie &&
            <>
            <IconButton onClick={(e)=>shareClickEventHandler(e)}>
                <ShareIcon/>
            </IconButton>
            <Popover
                id={snsPopOverId}
                open={snsPopOverOpen}
                anchorEl={anchorEl}
                onClose={shareHandleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
                <KakaoShare
                title={movie.title} 
                pageUrl={detailPageUrl}
                imagePath={movie.getImageFullPath()}
                desc={movie.overview}
                />
                <NaverShare
                title={movie.title} 
                pageUrl={detailPageUrl}
                />
                <FacebookShare
                pageUrl={detailPageUrl}
                />
            </Popover>
            </>
        }
        </>       

    )
}

export default SnsPopOver;