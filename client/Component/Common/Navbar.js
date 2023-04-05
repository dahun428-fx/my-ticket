import React from 'react'
import Link from 'next/link';
import useAuth from '../../Hoc/useAuth';
import { signOut, useSession } from 'next-auth/react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { userSignOut } from '../../api/user';

export default function Navbar() {

  const isAuthenticated = useAuth(true);
  const { data: session } = useSession();
  const signOutHandler = (e) => {
    e.preventDefault();
    userSignOut();
    signOut({
      callbackUrl:'/'
    });
  }

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
      title : "로그인 연동", link : "/user/connectProvider", authType:'login', 
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

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          {navbarList &&

          navbarList.map((item, index) => {

          if (item.authType == 'login' ) {
            
              if (session) {
                return <Typography key={index} color="inherit" component="div" padding={1}>
                  <Link href={item.link} {...item.event}>{item.title}</Link>
                </Typography>;
              }

          } else if (item.authType === 'logout') {
              if (!session) {
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
          }
        </Toolbar>
      </AppBar>
    </>
  )
}
