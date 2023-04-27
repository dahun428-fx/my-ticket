import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import useAuth from '../../Hoc/useAuth';
import { signOut, useSession } from 'next-auth/react';
import { AppBar, Box, Button, Skeleton, Toolbar, Typography } from '@mui/material';
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
      // {
      //   title : "HOME", link : "/", authType:'permitAll'
      // },
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
      // {
      //   title : "get User Test", link : "/test/getuserTest", authType:'login', 
      // },
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
          { !loading ? 
            <>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
              >
                HOME
              </Typography>
              { navbarItems &&
              <>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                  {
                    navbarItems.map((item, index) => {
                      if(item.authType === "permitAll")
                      return <Button 
                      key={index}
                      sx={{ my: 2, color: 'white' }}
                      >
                        <Link href={item.link} {...item.event}>{item.title}</Link>
                      </Button>
                    })
                  }
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  {
                    navbarItems.map((item, index) => {
                      if(!sessionState && item.authType === "logout") {
                        return <Button 
                        key={index}
                        sx={{ my: 2, color: 'white' }}
                        >
                          <Link href={item.link} {...item.event}>{item.title}</Link>
                        </Button>
                      } else if (sessionState && item.authType === "login") {
                        return <Button 
                        key={index}
                        sx={{ my: 2, color: 'white' }}
                        >
                          <Link href={item.link} {...item.event}>{item.title}</Link>
                        </Button>
                      }
                    })
                  }
                </Box>
              </>
              }
            </>
          
            : <Skeleton width="100%" height="100%"/>
          
          }
          {/* {(navbarItems && !loading) ?

            navbarItems.map((item, index) => {

              if (item.authType == 'login' ) {
                
                  if (sessionState) {
                    return <Typography key={index}
                                  variant="h6"
                                  component="div"
                                  sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                    // color="inherit" component="div" padding={1}
                    >
                      <Link href={item.link} {...item.event}>{item.title}</Link>
                    </Typography>;
                  }

              } else if (item.authType === 'logout') {
                  if (!sessionState) {
                    return <Typography key={index} 
                                      variant="h6"
                                      component="div"
                                      sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                    // color="inherit" component="div" padding={1}
                    >
                      <Link href={item.link} {...item.event}>{item.title}</Link>
                    </Typography>;
                  }
                
              } else {

                  return <Typography key={index} 
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                        // color="inherit" component="div" padding={1}
                      
                      >
                    <Link href={item.link} {...item.event}>{item.title}</Link>
                  </Typography>;

              }
            })
            :
            <Skeleton width="100%" height="100%"/>
          } */}
        </Toolbar>
      </AppBar>
    </>
  )
}
