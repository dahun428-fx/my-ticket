import { IconButton } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import { useEffect, useState } from "react";

const TwitterShare = (props) => {

    const [pageUrl, setPageUrl] = useState("");
    const [title, setTitle] = useState("");

    const twitterStyle = { 
        width: 50,
        height:50,
        verticalAlign:'middle',
        fontSize:30,
        color:'skyblue',
    }

    useEffect(()=>{
        setPageUrl(props.pageUrl);
        setTitle(encodeURIComponent(props.title));
    },[])

    const twitterShareBtnEvent = (e) => {
        e.preventDefault();

        const option = {
            url : `${`http://twitter.com/intent/tweet?text=${title}&url=${pageUrl}`}`,
            name : 'twitterShare',
            feature : 'location=0,status=0,width=400,height=800'
        }
        window.open(option.url, option.name, option.feature);
    }

    return (
        <>
            <IconButton style={twitterStyle} onClick={(e)=>twitterShareBtnEvent(e)}>
                <TwitterIcon fontSize="large"/>
            </IconButton>
        </>
    )
}
export default TwitterShare;