import React, { useEffect } from 'react';
import { getUser } from '../../api/user';
import useAuth from '../../Hoc/useAuth';
import withAuth from '../../Hoc/withAuth';

function my(props) {
    
    // useEffect(()=>{
    //     getUser().then(res=>{
    //         console.log('getUser res : ', res);
    //     }).catch(err => {
    //         console.log('getUser err : ', err);
    //     });
    // },[]);
    const onClickHandler = () => {
        getUser().then(res => {
            console.log('getUser res : ', res);
        });
    }

    return (
        <>
            <div>
            getUser
            <button onClick={()=> onClickHandler()}>btn</button>
            </div>
        </>
    );
}

export default withAuth(my);