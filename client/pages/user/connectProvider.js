import { useEffect, useState } from "react";
import { getUser, userProviderInfo } from "../../api/user";
import GoogleLoginPage from "./provider/google/googleLoginPage";
import GithubLoginPage from "./provider/github/githubLoginPage";
import FacebookLoginPage from "./provider/facebook/facebookLoginPage";

function connectProvider(props) {

    const [provider, setProvider] = useState([]);

    const [googleProvider, setGoogleProvider ] = useState(false);
    const [githubProvider, setGithubProvider ] = useState(false);
    const [fbProvider, setFbProvider ] = useState(false);

    useEffect(()=>{
        (async () => {

            // const user = await getUser();
            // console.log('res ', user);
            // const providerInfo = await userProviderInfo();
            // console.log('info ', providerInfo);
            await userProviderInfo().then((res) => {
                const {data} = res;
                setProvider(data);
                // console.log('rrrpp : ', data)
                if(data) {
                    data.forEach((item) => {
                        setProviderHandler(item?.name);
                        // if(item?.name === 'GOOGLE') {
                        //     setGoogleProvider(true);
                        // } else if (item?.name === 'GITHUB') {
                        //     setGithubProvider(true);
                        // } else if (item?.name === 'FACEBOOK') {
                        //     setFbProvider(true);
                        // }
                    })
                }

            });
        })();

    },[googleProvider, githubProvider, fbProvider]);

    const setProviderHandler = (provider) => {
        console.log(provider);
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
        
            default:
                break;
        }
    }

    return (
        <div>
            hello update 
            {
                provider &&

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
                </>
            }
        </div>
    )
}
export default connectProvider;
