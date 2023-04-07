import { useCallback, useEffect, useState } from "react";
import GoogleLoginPage from "./provider/google/googleLoginPage";
import GithubLoginPage from "./provider/github/githubLoginPage";
import FacebookLoginPage from "./provider/facebook/facebookLoginPage";
import KakaoLoginPage from "./provider/kakao/kakaoLoginPage";
import NaverLoginPage from "./provider/naver/naverLoginPage";
import { getServerSession } from "next-auth";
import {option} from "../api/auth/[...nextauth]";
import { USER_PROVIDER_INFO } from "../../api/url/enum/user.api.url";
import makeAxiosInstance from "../../middleware/axiosInstance";

function connectProvider(props) {

    const [provider, setProvider] = useState(props.providerList);

    const [googleProvider, setGoogleProvider ] = useState(false);
    const [githubProvider, setGithubProvider ] = useState(false);
    const [fbProvider, setFbProvider ] = useState(false);
    const [kakaoProvider, setKakaoProvider ] = useState(false);
    const [naverProvider, setNaverProvider ] = useState(false);

    useEffect(()=>{
        (async () => {
            setProvider(provider);
            if(provider) {
                provider.forEach((item) => {
                    setProviderHandler(item?.name);
                })
            }
        })();
        return () => {setProvider([])}
    },[]);

     

    const setProviderHandler = (provider) => {
        provider = provider.toUpperCase();
        switch (provider) { 
            case "GOOGLE":
                setGoogleProvider(true);
                break;
            case "GITHUB":
                setGithubProvider(true);
                break;    
            case "FACEBOOK":
                setFbProvider(true);
                break;
            case "KAKAO" :
                setKakaoProvider(true);
                break;
            case "NAVER" :
                setNaverProvider(true); 
                break;   
            default:
                break;
        }
    }

    return (
        <div>
            hello update 
            {
                (provider) &&

                <>
                    <div>
                        <GoogleLoginPage 
                            variant="outlined" 
                            title={`Google 로그인 연동`}
                            setProviderHandler={setProviderHandler}
                            disabled={googleProvider}
                        />
                        {googleProvider &&
                            <span>연동 완료</span>
                        }
                    </div>
                    <div>
                        <GithubLoginPage 
                            variant="outlined" 
                            title={`Github 로그인 연동`}
                            setProviderHandler={setProviderHandler}
                            disabled={githubProvider}
                        />
                        {githubProvider &&
                            <span>연동 완료</span>
                        }
                        
                    </div>
                    <div>
                        <FacebookLoginPage 
                            variant="outlined"
                            title="Facebook 로그인 연동"
                            disabled={fbProvider}
                            setProviderHandler={setProviderHandler}
                        />
                        {fbProvider &&
                            <span>연동 완료</span>
                        }
                    </div>
                    <div>
                        <KakaoLoginPage 
                            variant="outlined"
                            title="Kakao 로그인 연동"
                            disabled={kakaoProvider}
                            setProviderHandler={setProviderHandler}
                        />
                        {kakaoProvider &&
                            <span>연동 완료</span>
                        }
                    </div>
                    <div>
                        <NaverLoginPage 
                            variant="outlined"
                            title="Naver 로그인 연동"
                            disabled={naverProvider}
                            setProviderHandler={setProviderHandler}
                        />
                        {naverProvider &&
                            <span>연동 완료</span>
                        }
                    </div>
                </>
            }
        </div>
    )
}
export default connectProvider;

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, option)
    const axios = await makeAxiosInstance(session);
    
    const {data} = await axios.get(USER_PROVIDER_INFO);

    return {
      props: {
        providerList:data,
      }, // will be passed to the page component as props
    }
  }

