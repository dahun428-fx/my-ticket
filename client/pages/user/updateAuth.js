import { useEffect } from "react";
import { getUser } from "../../api/user";
import GoogleLoginPage from "./provider/google/googleLoginPage";

function updateAuth(props) {

    useEffect(()=>{
        (async () => {

            const res = await getUser();
            console.log('res ', res);
        })();

    },[]);

    return (
        <div>
            hello update 

            <div>
                <GoogleLoginPage title={`Google 로그인 연동`} />
            </div>
        </div>
    )
}
export default updateAuth;
