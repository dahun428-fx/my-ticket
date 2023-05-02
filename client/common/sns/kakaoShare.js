import React, { useEffect, useState } from 'react';
import Btn from '../../Component/Common/Button';
import { useRouter } from 'next/router';

const KakaoShare = (props) => {

    const router = useRouter();

    const [title, setTitle] = useState("");
    const [pageUrl, setPageUrl] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [desc, setDesc] = useState("");

    const kakaoStyle = {
        backgroundImage: "url('/image/sns/sns_kakao.png')",
        display: 'inline-block',
        width: 50,
        height:50,
        backgroundRepeat:'no-repeat',
        backgroundPosition:'50% 50%',
        textIndent:'200%',
        whiteSpace:'nowrap',
        overflow:'hidden',
        backgroundSize:30,
        verticalAlign:'middle',
        minWidth:51,
    }

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.crossOrigin;
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    useEffect(()=>{
        setTitle(props.title);
        setPageUrl(props.pageUrl);
        setImagePath(props.imagePath);
        setDesc(props.desc);
        
    },[])
    
    const kakaoShareBtnEvent = (e) => {
        e.preventDefault();
        shareKakao(pageUrl, title);
    }

    const shareKakao = (route, title) => { // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
        if (window.Kakao) {
          const kakao = window.Kakao;
          if (!kakao.isInitialized()) {
            kakao.init(process.env.NEXT_PUBLIC_SHARE_KAKAO_LINK_KEY); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
          }
      
          kakao.Link.sendDefault({
            objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
            content: {
              title: title, // 인자값으로 받은 title
              description: desc, // 인자값으로 받은 title
              imageUrl: imagePath,
              link: {
                mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
                webUrl: route
              }
            },
            buttons: [
              {
                title: "자세히보기",
                link: {
                  mobileWebUrl: route,
                  webUrl: route
                }
              }
            ]
          });
        }
      };
    return (
        <>
            <Btn style={kakaoStyle} title={`kakao`} onClick={(e)=>kakaoShareBtnEvent(e)}/>
        </>
    )
}
export default KakaoShare;