import { useEffect, useState } from "react";
import GoogleLoginPage from "./google/googleLoginPage";
import GithubLoginPage from "./github/githubLoginPage";
import FacebookLoginPage from "./facebook/facebookLoginPage";
import KakaoLoginPage from "./kakao/kakaoLoginPage";
import NaverLoginPage from "./naver/naverLoginPage";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { FACEBOOK_PROVIDER, GITHUB_PROVIDER, GOOGLE_PROVIDER, KAKAO_PROVIDER, NAVER_PROVIDER } from "../../../configs/provider/config.oAuth2.provider.enum";
import { deleteProvider } from "../../../api/auth";
import { useRouter } from "next/router";

function ConnectProvider(props) {

    const [provider, setProvider] = useState([]);

    const [googleProvider, setGoogleProvider ] = useState(false);
    const [githubProvider, setGithubProvider ] = useState(false);
    const [fbProvider, setFbProvider ] = useState(false);
    const [kakaoProvider, setKakaoProvider ] = useState(false);
    const [naverProvider, setNaverProvider ] = useState(false);
    const [userProviderName, setUserProviderName] = useState("");

    const router = useRouter();

    useEffect(()=>{
        setProvider(props.providerList);
        setUserProviderName(props.user.providerType);
        if(provider) {
            provider.forEach((item) => {
                setProviderHandler(item?.name);
            })
        }
        return () => {};
    },[provider]);

     

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

    const closeProviderHandler = (provider) => {
        provider = provider.toUpperCase();
        switch (provider) { 
            case "GOOGLE":
                setGoogleProvider(false);
                break;
            case "GITHUB":
                setGithubProvider(false);
                break;    
            case "FACEBOOK":
                setFbProvider(false);
                break;
            case "KAKAO" :
                setKakaoProvider(false);
                break;
            case "NAVER" :
                setNaverProvider(false); 
                break;   
            default:
                break;
        }
    }

    const isProviderUser = (provider) => {
        return userProviderName.toLocaleLowerCase() === provider;
    }

    const providerCancleEventHanlder = async (e, provider) => {
        e.preventDefault();
        let con = confirm('해당 계정 연동을 취소하시겠습니까?')
        if ( con ) {
            let request = {
                userid : props.user.id,
                providerName : provider.toUpperCase() 
            }
            const { data } = await deleteProvider(request);
            if(data) {
                alert('계정 연동을 취소 하였습니다.')
                closeProviderHandler(request.providerName);
            }
        }
    }

    return (
        <>
            <Paper sx={{
                padding:2,
                marginTop:2
            }}>
            <Stack>
            {
                provider && provider.length > 0 &&
                <>
                {
                    !isProviderUser(GOOGLE_PROVIDER) && 
                    <Box mt={2} padding={1} display={'flex'}>
                        <GoogleLoginPage 
                            variant="outlined" 
                            title={`Google 로그인 연동`}
                            setProviderHandler={setProviderHandler}
                            disabled={googleProvider}
                        />
                        {googleProvider ?
                            <>
                                <Chip sx={{'marginLeft':2}} color="primary" label="연동완료" />
                                <Chip sx={{'marginLeft':2, cursor:'pointer'}} color="warning" label="연동취소" />
                            </>
                            :
                            <Chip sx={{'marginLeft':2}} label="미연동" />
                        }
                    </Box>
                }
                {
                    !isProviderUser(GITHUB_PROVIDER) && 
                    <Box mt={2} padding={1} display={'flex'}>
                        <GithubLoginPage 
                            variant="outlined" 
                            title={`Github 로그인 연동`}
                            setProviderHandler={setProviderHandler}
                            disabled={githubProvider}
                        />
                        {githubProvider ?
                            <>
                                <Chip sx={{'marginLeft':2}} color="primary" label="연동완료" />
                                <Chip sx={{'marginLeft':2, cursor:'pointer'}} color="warning" onClick={(e)=>providerCancleEventHanlder(e, GITHUB_PROVIDER)} label="연동취소" />
                            </>
                            :
                            <Chip sx={{'marginLeft':2}} label="미연동" />
                        }
                    </Box>
                }
                {
                !isProviderUser(FACEBOOK_PROVIDER) && 
                    <Box mt={2} padding={1} display={'flex'}>
                        <FacebookLoginPage 
                            variant="outlined"
                            title="Facebook 로그인 연동"
                            disabled={fbProvider}
                            setProviderHandler={setProviderHandler}
                        />
                        {fbProvider ?
                            <>
                                <Chip sx={{'marginLeft':2}} color="primary" label="연동완료" />
                                <Chip sx={{'marginLeft':2}} color="warning" label="연동취소" />
                            </>
                            :
                            <Chip sx={{'marginLeft':2}} label="미연동" />
                        }
                    </Box>
                
                }
                {
                    !isProviderUser(KAKAO_PROVIDER) &&     
                    <Box mt={2} padding={1} display={'flex'}>
                        <KakaoLoginPage 
                            variant="outlined"
                            title="Kakao 로그인 연동"
                            disabled={kakaoProvider}
                            setProviderHandler={setProviderHandler}
                        />
                        {kakaoProvider ?
                            <>
                                <Chip sx={{'marginLeft':2}} color="primary" label="연동완료" />
                                <Chip sx={{'marginLeft':2}} color="warning" label="연동취소" />
                            </>
                            :
                            <Chip sx={{'marginLeft':2}} label="미연동" />
                        }
                    </Box>
                }
                {
                    !isProviderUser(NAVER_PROVIDER) &&     
                    <Box mt={2} padding={1} display={'flex'}>
                        <NaverLoginPage 
                            variant="outlined"
                            title="Naver 로그인 연동"
                            disabled={naverProvider}
                            setProviderHandler={setProviderHandler}
                        />
                        {naverProvider ?
                            <>
                                <Chip sx={{'marginLeft':2}} color="primary" label="연동완료" />
                                <Chip sx={{'marginLeft':2}} color="warning" label="연동취소" />
                            </>
                            :
                            <Chip sx={{'marginLeft':2}} label="미연동" />
                        }
                    </Box>
                }
                </>
            }
            </Stack>
            </Paper>
        </>
    )
}
export default ConnectProvider;
