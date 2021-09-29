import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Auth } from 'aws-amplify'
import clsx from 'clsx';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material//Button';
import Container from '@mui/material/Container';

import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HelpIcon from '@mui/icons-material/Help';

import { DrawerHeader, AppBar, Drawer } from './styles/mainStyle'
import { LoginTyTheme } from './styles/common';
import { LayoutContext, ACTIONS } from '../contexts/layoutContext'
import { AUTH_ACTIONS, useAuth } from '../contexts/amplifyContext'
import { BasicDialogView } from './dialogs/BasicDialog'

const isLocalDev = false;

export const MainContainer = (props) => {
  const { state, dispatch } = useAuth()
  const navigate = useNavigate()
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const [layOutState, layOutDispatch] = useContext(LayoutContext);

  useEffect(() => {
    console.log(`MainContainer useAuth state ${JSON.stringify(state)}`)
    if (isLocalDev) {
      setIsAuth(true) // remove dev only
      navigate('/welcome')// remove dev only
    }  

    console.log(`MainContainer useEffect state navigate checkAuth `)
    if(!state.auth) {
      checkAuth()
    }

  }, [state, navigate])

  useEffect(() => {
    if (isLocalDev) { }
    else {
      if (state.auth) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
      }
    }
    console.log(`MainContainer useEffect state.auth`)

  }, [state.auth])

  const checkAuth = () => {

    Auth.currentAuthenticatedUser().then((creds) => {
      //console.log(`SocialLoginCallbacContainer federatedSignIn creds ${JSON.stringify(creds)}`)
      if (creds) {
        console.log(`MainContainer checkAuth session request dispatch email ${creds.signInUserSession.idToken.payload.email}`)
        dispatch({
            type: AUTH_ACTIONS.LOGIN,
            value: { auth: true, email: creds.signInUserSession.idToken.payload.email }
        })
        setIsAuth(true)
        navigate('/welcome')
      }
    }).catch((err) => {
      // this is for direct cognito login via ampify
      console.log(`MainContainer checkAuth session request err ${JSON.stringify(err)}`)
      let current = Auth.currentSession().then((ret) => {
        console.log(`MainContainer checkAuth currentSession ${current}`)
        setIsAuth(true)
        navigate('/welcome')
      }).catch((err) => {
        console.log(`MainContainer checkAuth request err  ${err}`)
        setIsAuth(false)
        navigate('/login')
      })

    })
  }
  const drawerOpen = () => {
    setOpenDrawer(true);
  };

  const drawerClose = () => {
    setOpenDrawer(false);
  };

  const runSocialLogout = () => {
    Auth.signOut()
  }

  const onOpenSideBarDialog = (type) => {
    console.log("MainContainer onOpenSideBarDialog send dispatch open = true")

    switch (type) {
      case ACTIONS.OPEN_HELP: {
        layOutDispatch({
          type: ACTIONS.OPEN_HELP,
          value: true,
        });
        break;
      }
      case ACTIONS.OPEN_INFO: {
        layOutDispatch({
          type: ACTIONS.OPEN_INFO,
          value: true,
        });
        break;
      }
      case ACTIONS.OPEN_EMAIL: {
        layOutDispatch({
          type: ACTIONS.OPEN_EMAIL,
          value: true,
        });
        break;
      }
    }



  }

  return (<MainView
    IsAuth={isAuth}
    onDrawOpen={drawerOpen}
    onDrawerClose={drawerClose}
    openDrawer={openDrawer}
    onOpenSideBarDialog={onOpenSideBarDialog}
    logout={runSocialLogout} />)
}

const MainView = (props) => {

  const theme = useTheme();
  const sxVal = { flexGrow: 1, minWidth: '14vw', }
  const sBttnCtnVal = { display: 'flex', justifyContent: 'flex-end' }


  const renderSocialSignOut = () => {
    return (
      props.IsAuth &&
      <Container style={sBttnCtnVal}  >
        <Button
          color="inherit"
          onClick={() => props.logout()}
        >
          <ThemeProvider theme={LoginTyTheme}>
            <Typography variant="h7" > Logout </Typography>
          </ThemeProvider>
        </Button>
      </Container>
    )
  }


  // see https://mui.com/components/drawers/  Mini variant drawer
  return (
    <>
      {/* <div id="123456" style={debugDialogStyle}><p>filler debug</p></div> */}
      <BasicDialogView />
      <Box sx={{ display: 'flex' }}>


        <CssBaseline />
        <AppBar
          position="fixed" open={props.openDrawer}
        >
          <Toolbar>
            {props.IsAuth &&
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.onDrawOpen}
                edge="start"
                sx={{
                  marginRight: '36px',
                  ...(props.openDrawer && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
            }
            <ThemeProvider theme={LoginTyTheme}>
              <Typography variant="h5" style={sxVal} > SO Pipe </Typography>
            </ThemeProvider>
            {props.IsAuth && renderSocialSignOut()}
          </Toolbar>
        </AppBar>

        {props.IsAuth &&
          <Drawer
            variant="permanent"
            open={props.openDrawer}
          >
            <DrawerHeader>
              <IconButton onClick={props.onDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Tooltip title="Log Out" placement="right-start">
              <IconButton
                onClick={() => props.logout()}><LogoutIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Help" placement="right-start">
              <IconButton
                onClick={() => props.onOpenSideBarDialog(ACTIONS.OPEN_HELP)}>
                <HelpIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Info" placement="right-start">
              <IconButton
                onClick={() => props.onOpenSideBarDialog(ACTIONS.OPEN_INFO)}>
                <InfoIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Email" placement="right-start">
              <IconButton
                onClick={() => props.onOpenSideBarDialog(ACTIONS.OPEN_EMAIL)} >
                <ContactMailIcon /></IconButton>
            </Tooltip>
          </Drawer>}
        <Outlet />
      </Box>
    </>
  )
}