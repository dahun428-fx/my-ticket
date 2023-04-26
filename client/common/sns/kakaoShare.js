import React, { useEffect, useState } from 'react';
import Btn from '../../Component/Common/Button';
import { useRouter } from 'next/router';

const KakaoShare = () => {

    const router = useRouter();


    useEffect(() => {


        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.crossOrigin;
        script.async = true;
        document.body.appendChild(script);
        console.log('router ::: ', router.asPath);
        return () => document.body.removeChild(script);
      }, []);

    const kakaoShareBtnEvent = () => {
        console.log('kakao share');
        shareKakao(router.asPath, 'title');
    }

    const shareKakao = (route, title) => { // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
        if (window.Kakao) {
          const kakao = window.Kakao;
          if (!kakao.isInitialized()) {
            kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
          }
      
          kakao.Link.sendDefault({
            objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
            content: {
              title: title, // 인자값으로 받은 title
              description: "설명", // 인자값으로 받은 title
              imageUrl: "이미지 url",
              link: {
                mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
                webUrl: route
              }
            },
            buttons: [
              {
                title: "title",
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
        <Btn title={`KakaoShare`} onClick={kakaoShareBtnEvent}/>
    )
}
export default KakaoShare;