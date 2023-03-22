import React, { useEffect } from 'react';
import { getUser } from '../../api/user';

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
        }).catch(err => {
            console.log('getUser err : ', err);
        })
    }

    return (
        <div>
            getUser
            <button onClick={()=> onClickHandler()}>btn</button>
        </div>
    );
}

export default my;