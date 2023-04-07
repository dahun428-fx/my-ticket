import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import useAuth from '../../Hoc/useAuth';
import { signOut, useSession } from 'next-auth/react';
import { AppBar, Skeleton, Toolbar, Typography } from '@mui/material';
import { userSignOut } from '../../api/user';

export default function Navbar() {

  const [navbarItems, setNavbarItems] = useState([]);
  const [sessionState, setSessionState ] = useState(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = useAuth(true);
  const { data: session } = useSession();
  const signOutHandler = (e) => {
    e.preventDefault();
    userSignOut();
    signOut({
      callbackUrl:'/'
    });
  }
  useEffect(()=>{
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  },[])
  useEffect(()=>{
    setSessionState(session);

    return () => {setSessionState(null)}
  }, [session]);

  useEffect(()=>{
    const navbarList = [
      {
        title : "HOME", link : "/", authType:'permitAll'
      },
      {
        title : "SignIn", link : "/signin", authType:'logout'
      },
      {
        title : "Signup", link : "/signup", authType :'logout'
      },
      {
        title : "Movie", link : "/product/movie", authType:"permitAll"
      },
      {
        title : "My", link : "/user/mypage", authType:'login', 
      },
      {
        title : "get User Test", link : "/test/getuserTest", authType:'login', 
      },
      {
        title : "SignOut", link : "/signout", authType:'login', event:{
          onClick:(e)=>signOutHandler(e),
        }
      },
    ]
    setNavbarItems(navbarList);

    return () => { setNavbarItems([]) }
  },[]);


  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          {(navbarItems && !loading) ?

            navbarItems.map((item, index) => {

              if (item.authType == 'login' ) {
                
                  if (sessionState) {
                    return <Typography key={index} color="inherit" component="div" padding={1}>
                      <Link href={item.link} {...item.event}>{item.title}</Link>
                    </Typography>;
                  }

              } else if (item.authType === 'logout') {
                  if (!sessionState) {
                    return <Typography key={index} color="inherit" component="div" padding={1}>
                      <Link href={item.link} {...item.event}>{item.title}</Link>
                    </Typography>;
                  }
                
              } else {

                  return <Typography key={index} color="inherit" component="div" padding={1}>
                    <Link href={item.link} {...item.event}>{item.title}</Link>
                  </Typography>;

              }
            })
            :
            <Skeleton width="100%" height="100%"/>
          }
        </Toolbar>
      </AppBar>
    </>
  )
}
