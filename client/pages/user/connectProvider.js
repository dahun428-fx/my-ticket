import { useCallback, useEffect, useState } from "react";
import { getUser, userProviderInfo } from "../../api/user";
import GoogleLoginPage from "./provider/google/googleLoginPage";
import GithubLoginPage from "./provider/github/githubLoginPage";
import FacebookLoginPage from "./provider/facebook/facebookLoginPage";
import KakaoLoginPage from "./provider/kakao/kakaoLoginPage";
import { Skeleton } from "@mui/material";

function connectProvider(props) {

    const [provider, setProvider] = useState([]);
    const [loading, setLoading ] = useState(false);

    const [googleProvider, setGoogleProvider ] = useState(false);
    const [githubProvider, setGithubProvider ] = useState(false);
    const [fbProvider, setFbProvider ] = useState(false);
    const [kakaoProvider, setKakaoProvider ] = useState(false);

    useEffect(()=>{
        setLoading(true);
        (async () => {
            const {data} = await userProviderInfo();
            setProvider(data);
            if(data) {
                data.forEach((item) => {
                    setProviderHandler(item?.name);
                })
            }
            setLoading(false);
        })();
        return () => {setLoading(false)}
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
            default:
                break;
        }
    }

    return (
        <div>
            hello update 
            {
                (provider && !loading) &&

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
                </>
            }
        </div>
    )
}
export default connectProvider;


