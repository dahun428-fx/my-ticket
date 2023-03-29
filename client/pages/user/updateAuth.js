import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getUser } from "../../api/user";
import Button from "../../Component/Common/Button";
import WithAuth from "../../Hoc/withAuth"
import GoogleProviderCustomize from "./provider/google/googleProvider";
import GoogleSignin from "./provider/google/googleSignin";
import {GoogleLogin, GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google';
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
                <GoogleLoginPage></GoogleLoginPage>
                {/* <GoogleProviderCustomize>
                    <GoogleSignin></GoogleSignin>
                </GoogleProviderCustomize> */}
            </div>
        </div>
    )
}
export default updateAuth;
// export async function getServerSideProps(context) {
//     const res = await getUser();
//     console.log(res);
//     return {
//         props:{

//         }
//     }
// }