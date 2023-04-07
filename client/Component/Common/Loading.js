import { CircularProgress, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import style from './Loading.module.css';

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
        <div className={style.overlay}>
            <div className={style.overlay__inner}>
                <div className={style.overlay__content}><span className={style.spinner}></span></div>
            </div>
        </div>
        </>
    )
}
export default Loading;