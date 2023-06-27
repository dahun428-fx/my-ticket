import { useEffect, useState } from "react";
import GoogleLoginPage from "./google/googleLoginPage";
import GithubLoginPage from "./github/githubLoginPage";
import FacebookLoginPage from "./facebook/facebookLoginPage";
import KakaoLoginPage from "./kakao/kakaoLoginPage";
import NaverLoginPage from "./naver/naverLoginPage";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

function connectProvider(props) {

    const [provider, setProvider] = useState([]);

    const [googleProvider, setGoogleProvider ] = useState(false);
    const [githubProvider, setGithubProvider ] = useState(false);
    const [fbProvider, setFbProvider ] = useState(false);
    const [kakaoProvider, setKakaoProvider ] = useState(false);
    const [naverProvider, setNaverProvider ] = useState(false);

    useEffect(()=>{
        setProvider(props.providerList);
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

    return (
        <>
            <Paper sx={{
                padding:2,
                marginTop:2
            }}>
            <Stack>
            {
                provider.length > 0 &&
                <>
                    <Box mt={2} padding={1} display={'flex'}>
                        <GoogleLoginPage 
                            variant="outlined" 
                            title={`Google 로그인 연동`}
                            setProviderHandler={setProviderHandler}
                            disabled={googleProvider}
                        />
                        {googleProvider &&
                            <Chip sx={{'marginLeft':2}} label="연동완료" />
                        }
                    </Box>
                    <Box mt={2} padding={1} display={'flex'}>
                        <GithubLoginPage 
                            variant="outlined" 
                            title={`Github 로그인 연동`}
                            setProviderHandler={setProviderHandler}
                            disabled={githubProvider}
                        />
                        {githubProvider &&
                            <Chip sx={{'marginLeft':2}} label="연동완료" />
                        }
                    </Box>
                    <Box mt={2} padding={1} display={'flex'}>
                        <FacebookLoginPage 
                            variant="outlined"
                            title="Facebook 로그인 연동"
                            disabled={fbProvider}
                            setProviderHandler={setProviderHandler}
                        />
                        {fbProvider &&
                            <Chip sx={{'marginLeft':2}} label="연동완료" />
                        }
                    </Box>
                    <Box mt={2} padding={1} display={'flex'}>
                        <KakaoLoginPage 
                            variant="outlined"
                            title="Kakao 로그인 연동"
                            disabled={kakaoProvider}
                            setProviderHandler={setProviderHandler}
                        />
                        {kakaoProvider &&
                            <Chip sx={{'marginLeft':2}} label="연동완료" />
                        }
                    </Box>
                    <Box mt={2} padding={1} display={'flex'}>
                    <NaverLoginPage 
                            variant="outlined"
                            title="Naver 로그인 연동"
                            disabled={naverProvider}
                            setProviderHandler={setProviderHandler}
                        />
                        {naverProvider &&
                            <Chip sx={{'marginLeft':2}} label="연동완료" />
                        }
                    </Box>

                </>
            }
            </Stack>
            </Paper>
        </>
    )
}
export default connectProvider;

// export async function getServerSideProps(context) {
//     const session = await getServerSession(context.req, context.res, option)
//     const axios = await makeAxiosInstance(session);
    
//     const {data} = await axios.get(USER_PROVIDER_INFO);

//     return {
//       props: {
//         providerList:data,
//       },
//     }
//   }

