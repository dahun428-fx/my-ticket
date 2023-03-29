import { GoogleOAuthProvider } from "@react-oauth/google";
import React from 'react';

import GoogleProvider from "next-auth/providers/google";
const CustomProvider = (req, res) =>{

    const provider = req.query.provider[0];
    if(provider === `google`) {
        console.log('google excute', process.env.GOOGLE_CLIENT_ID);
        GoogleOAuthProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            // children:<>hi</>
        });
        // GoogleProvider({
        //     clientId:process.env.GOOGLE_CLIENT_ID,
        //     clientSecret:process.env.GOOGLE_CLIENT_PW,
        // })
        // return <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}></GoogleOAuthProvider>
    }
    // console.log(req.query.provider[0]);
    return res.status(200).json({
        'ok':'ok'
    });
}
export default CustomProvider;