import { useEffect, useState } from "react";
import { getUser, userProviderInfo } from "../../api/user";
import GoogleLoginPage from "./provider/google/googleLoginPage";

function connectProvider(props) {

    const [provider, setProvider] = useState([]);

    const [googleProvider, setGoogleProvider ] = useState(false);

    useEffect(()=>{
        (async () => {

            const user = await getUser();
            console.log('res ', user);
            // const providerInfo = await userProviderInfo();
            // console.log('info ', providerInfo);
            await userProviderInfo().then((res) => {
                const {data} = res;
                setProvider(data);
                console.log('rrrpp : ', data)
                if(data) {
                    data.forEach((item) => {
                        if(item?.name === 'GOOGLE') {
                            setGoogleProvider(true);
                        }
                    })
                }

            });
        })();

    },[]);

    return (
        <div>
            hello update 
            {
                provider &&

                <>
                    <div>
                        <GoogleLoginPage variant="outlined" title={`Google 로그인 연동`}
                            disabled={googleProvider}
                        />
                        {googleProvider &&
                            <span>연동 완료</span>
                        }
                    </div>
                </>
            }
        </div>
    )
}
export default connectProvider;
