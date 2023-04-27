import { useEffect, useState } from "react";
import Btn from "../../Component/Common/Button";
import FacebookIcon from '@mui/icons-material/Facebook';
import { IconButton } from "@mui/material";

const FacebookShare = (props) => {

    const [pageUrl, setPageUrl] = useState("");

    const fbStyle = {
        width: 50,
        height:50,
        verticalAlign:'middle',
        fontSize:30
    }

    useEffect(()=> {
        setPageUrl(props.pageUrl);
    }, [])

    const fbShareBtnEvent = (e) => {
        e.preventDefault();

        const option = {
            url : `${`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}`,
            name : 'fbShare',
            feature : 'location=0,status=0,width=400,height=800'
        }

        window.open(option.url, option.name, option.feature);
    }

    return (
        <>
            <IconButton style={fbStyle} color="primary" onClick={(e)=>fbShareBtnEvent(e)}>
                <FacebookIcon 
                // style={{fontSize:30}}
                    fontSize="large"
                />
            </IconButton>
        </>
    )
}

export default FacebookShare;