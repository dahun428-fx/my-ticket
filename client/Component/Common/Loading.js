import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const Loading = (props) => {
    
    // console.log('loading bar ... ',props.loading)
    // const [isLoading, setIsLoading] = useState(props.loading);
    // useEffect(()=>{
    //     return () => setIsLoading(false);
    // },[isLoading])
    // console.log('isLoading    ', isLoading)
    // const LoadingBar = (loading) => {
    //     if(loading) {
    //         setTimeout(() => {
    //             return (
    //                 <>
    //                 <CircularProgress />
    //                     <div>dklafsjklasdjfkl</div>
    //                 </>
    //             )
    //         }, 4000);
    //     }
    // }

    // return (
    //     <>
    //     {/* {
    //         props.loading &&
    //         <CircularProgress />
    //     } */}
    //     {LoadingBar(props.loading)}
    //     </>
    // )
    return (
        <>
        <div>....loading</div>
        {/* {props.loading ? <div>loading....</div> : 
            // <>{props.children}</>
            <>'''</>
        } */}
        </>
    )
}
export default Loading;