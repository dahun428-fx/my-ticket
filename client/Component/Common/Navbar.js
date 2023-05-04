import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import useAuth from '../../Hoc/useAuth';
import { signOut, useSession } from 'next-auth/react';
import { AppBar, Box, Button, Divider, Drawer, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Skeleton, Toolbar, Typography } from '@mui/material';
import { userSignOut } from '../../api/user';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SearchBox from './search/searchBox';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Navbar() {

  
  const [navbarItems, setNavbarItems] = useState([]);
  const [sessionState, setSessionState ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const isAuthenticated = useAuth(true);
  const { data: session } = useSession();

  const router = useRouter();

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    if(searchKeyword.length > 20) {
      return;
    }
    setSearchKeyword(value);
  }

  const onSearchKewordSubmit = (e) => {
    e.preventDefault();
    if(!searchKeyword || searchKeyword.length < 1) {
      return;
    }
    setDrawer(false);
    router.push({
      pathname :'/product/search',
      query : {
        keyword: encodeURIComponent(searchKeyword)
        // keyword: (searchKeyword)
      },
    }
    // ,`/product/search/keyword/${searchKeyword}`
    );
    console.log(searchKeyword);
  }

  const signOutHandler = async (e) => {
    // e.preventDefault();
    await userSignOut();
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
        title : "SignIn", link : "/signin", authType:'logout', icon:<LoginIcon />
      },
      {
        title : "Signup", link : "/signup", authType :'logout', icon:<PersonAddIcon/>
      },
      {
        title : "Movie", link : "/product/movie", authType:"permitAll", icon: <LocalMoviesIcon />
      },
      {
        title : "My", link : "/user/mypage", authType:'login', icon:<AccountCircleIcon />
      },
      // {
      //   title : "get User Test", link : "/test/getuserTest", authType:'login', 
      // },
      {
        title : "SignOut", authType:'login', link:"#", icon:<LogoutIcon />, event:{
          onClick:(e)=>signOutHandler(e),
        }
      },
    ]
    setNavbarItems(navbarList);

    return () => { setNavbarItems([]) }
  },[]);

  const toggleDrawer =
  (open) =>
  (event) => {
    if((event.target.id ==='search-box' || event.target.id === 'search-btn' || event.target.id === 'search-btn-icon')) {
      return;
    }
    if (
      event.type === 'keydown' &&
      ((event).key === 'Tab' ||
        (event).key === 'Shift')
    ) {
      return;
    }

    setDrawer(open);
  };

  const list = (navbarItems) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <ListItemText>
          <SearchBox 
          onChangeHandler={onChangeHandler}
          searchKeyword={searchKeyword}
          onSubmitHandler={onSearchKewordSubmit}
          sx={{ p: '2px 4px', display: { xs: 'flex', sm:'none', md: 'none'} , alignItems: 'center', width: 200 }}/>
          </ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={()=>router.push('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>
              HOME
            </ListItemText>
          </ListItemButton>
        </ListItem>
        {
          navbarItems &&
          <>
          {
            navbarItems.map((item, index) => {
              if(item.authType === "permitAll")
              return (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={()=>router.push(item.link)}
                {...item.event}
                >
                  <ListItemIcon>{item.icon && item.icon}</ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </ListItemButton>
              </ListItem>
              )
            })
          }
          </>
        }
        <Divider/>
        {
          navbarItems &&
          <>
            {
              navbarItems.map((item, index) => {
                if(!sessionState && item.authType === "logout") {
                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton onClick={()=>router.push(item.link)}
                      {...item.event}
                      >
                        <ListItemIcon>{item.icon && item.icon}</ListItemIcon>
                        <ListItemText>{item.title}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  )
                } else if (sessionState && item.authType === "login") {
                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton onClick={()=>router.push(item.link)}
                      {...item.event}
                      >
                        <ListItemIcon>{item.icon && item.icon}</ListItemIcon>
                        <ListItemText>{item.title}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  )
                }
              })
            }
          </>
        }
      </List>
    </Box>
  );

  const topExcuteHandler = () => {
    console.log('top')
    window.scrollTo({ top: 0, behavior: 'smooth'})
  }


  return (
    <>
      <Box>
      <Paper
      elevation={3}
      sx={{position:'fixed', right:'15px', bottom:'60px', backgroundColor:'#1976d2', borderRadius:'30px'}}>
          <IconButton sx={{color:'white'}} onClick={()=>{return window.scrollTo({top:0, behavior:'smooth'})}}>
              <ExpandLessIcon />
          </IconButton>
      </Paper>
      <Paper
      elevation={3}
      sx={{position:'fixed', right:'15px', bottom:'15px', backgroundColor:'#1976d2', borderRadius:'30px'}}>
          <IconButton sx={{color:'white'}} onClick={()=>{return window.scrollTo({top:window.document.body.clientHeight, behavior:'smooth'})}}>
              <ExpandMoreIcon />
          </IconButton>
      </Paper>
      </Box>
      <AppBar position='static'>
        <Toolbar>
          { !loading ? 
            <>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' }, cursor:'pointer' }}
                  onClick={()=>router.push('/')}
                >
                HOME
                </Typography>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, display: { xs: 'block', sm:'none', md:'none'} }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              
              { navbarItems &&
              <>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', sm:'flex', md: 'flex' } }}>
                  {
                    navbarItems.map((item, index) => {
                      if(item.authType === "permitAll")
                      return <Button 
                      key={index}
                      sx={{ my: 2, color: 'white' }}
                      {...item.event}
                      >
                        {item.link ?
                        <Link href={item.link}>{item.title}</Link>
                        :
                        <span>{item.title}</span>
                        }
                      </Button>
                    })
                  }
                </Box>
                <SearchBox
                onChangeHandler={onChangeHandler}
                searchKeyword={searchKeyword}
                onSubmitHandler={onSearchKewordSubmit}
                sx={{mr:1, p: '2px 4px', display: { xs: 'none', sm:'flex', md: 'flex'} , alignItems: 'center', width: 250 }}/>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', sm:'flex', md: 'flex'} }}>
                  {
                    navbarItems.map((item, index) => {
                      if(!sessionState && item.authType === "logout") {
                        return <Button 
                        key={index}
                        sx={{ my: 2, color: 'white' }}
                        {...item.event}
                        >
                          {item.link ?
                          <Link href={item.link}>{item.title}</Link>
                          :
                          <span>{item.title}</span>
                          }
                        </Button>
                      } else if (sessionState && item.authType === "login") {
                        return <Button 
                        key={index}
                        sx={{ my: 2, color: 'white' }}
                        {...item.event}
                        >
                          {item.link ?
                          <Link href={item.link}>{item.title}</Link>
                          :
                          <span>{item.title}</span>
                          }
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
        </Toolbar>
        <Drawer
            anchor={'right'}
            open={drawer}
            onClose={toggleDrawer(false)}
          >
            {list(navbarItems)}
          </Drawer>
      </AppBar>
    </>
  )
}
