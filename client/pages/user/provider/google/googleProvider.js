import { GoogleOAuthProvider } from "@react-oauth/google";
import { GApiProvider } from "react-gapi-auth2";
import { useGoogleAuth, useGoogleUser } from "react-gapi-auth2";
import Button from "../../../../Component/Common/Button";
function GoogleProviderCustomize({children}){

    // console.log(children);
    const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
    const clientConfig = {
        client_id : "909485642273-34pi8738aq67shhh9jup52cqktl8iiu9.apps.googleusercontent.com",
        scope:"https://www.googleapis.com/auth/calendar.readonly"
    }
    
    // console.log(clientConfig)
    return (
        <GoogleOAuthProvider clientId={clientConfig.client_id}>
            {children}
        </GoogleOAuthProvider>
    )


}
export default GoogleProviderCustomize;

// export async function getServerSideProps(){
//     return {
//         props:{
//             clientConfig : {
//                 client_id : process.env.GOOGLE_CLIENT_ID,
//             }
//         }
//     }
// }