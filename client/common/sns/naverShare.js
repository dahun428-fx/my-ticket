import { useEffect, useState } from "react";
import Btn from "../../Component/Common/Button";

const NaverShare = (props) => {

    const [title, setTitle] = useState("");
    const [pageUrl, setPageUrl] = useState("");


    const naverStyle = {
        backgroundImage: "url('/image/sns/sns_naver.png')",
        display: 'inline-block',
        width: 50,
        height:50,
        backgroundRepeat:'no-repeat',
        backgroundPosition:'50% 50%',
        textIndent:'200%',
        whiteSpace:'nowrap',
        overflow:'hidden',
        backgroundSize:45,
        verticalAlign:'middle',
        minWidth:51,
    }

    useEffect(()=>{
        setTitle(encodeURI(props.title));
        setPageUrl(encodeURI(encodeURIComponent(props.pageUrl)));
    },[]);

    const naverShareBtnEvent = (e) => {
        e.preventDefault();
        window.open(makeSnsUrl(), 'naverShare', 'location=0,status=0,width=400,height=800');
    }

    const makeSnsUrl = () => {
        const shareUrl = `https://share.naver.com/web/shareView`;
        const option = {
            'url' : pageUrl,
            'title' : title, 
        }
        let urlOption = new URLSearchParams(option);
        return `${shareUrl}?${urlOption.toString()}`
    }

    return (
        <>
            <Btn style={naverStyle} title={`NaverShare`} onClick={(e)=>naverShareBtnEvent(e)}/>
        </>
    )
}

export default NaverShare;